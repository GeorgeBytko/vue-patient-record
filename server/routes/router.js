const { Router } = require('express')
const router = Router();
const Patient = require('../models/Patient')

router
    .get('/api/patients', async (req, res) => {
        try {
            const patients = await Patient.find().sort({recording_date: -1}).lean()
            await res
                .json({
                    patients
                })
        }
        catch (e) {
            await res.status(500)
        }
    })
    .post('/api/patients', async (req, res) => {
        if (!req.body) return await res.sendStatus(400)
        try {
            const patient = new Patient({
                name: req.body.name,
                surname: req.body.surname,
                second_name: req.body.second_name,
                recording_date: req.body.recording_date,
                passport: req.body.passport,
                age: req.body.age

            })
            await patient.save()
            await res
                .json({
                    message: 'Patient created',
                    patient
                })
        }
        catch (e) {
            await res.sendStatus(500)
        }
    })
    .delete('/api/patients/:id', async (req,res) => {
        if (!req.params.id) return res.status(400)
        try {
            await Patient.deleteOne({_id: req.params.id})
            res.sendStatus(204)
        }
        catch (e) {
            await res.sendStatus(500)
        }

    })

module.exports = router