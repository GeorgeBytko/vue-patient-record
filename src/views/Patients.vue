<template>
    <div class="patients-container">
        <div class="patients-container-title">
            СПИСОК ПАЦИЕНТОВ
        </div>
        <div class="patients-container__patients-list">
            <Loader v-if="loading" />
            <Patient
                    v-else-if="patients.length"
                    v-for="patient of patients"
                    v-bind:patientData="patient"
                    :key="patient._id"
                    @deletePatient="deletePatient"
            />
            <div class="patients-container__patients-list-empty" v-else>Список пуст</div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Patient from "../components/Patient";
    import Loader from "../components/Loader";
    export default {
        metaInfo: {
            title: 'Список пациентов'
        },
        mounted() {
            this.fetchPatients()
        },
        name: "Patients",
        data() {
            return {
                loading: true,
                patients: []
            }
        },
        components: {
            Loader,
            Patient
        },
        methods: {
            deletePatient(_id) {
                axios.delete('/api/patients/' + _id)
                    .then(response => {
                        this.patients = this.patients.filter( item => item._id !== _id)
                    })
                    .catch(err => console.log(err))
            },
            fetchPatients() {
                this.loading = true
                axios.get('/api/patients')
                    .then(response => {
                        this.loading = false
                        this.patients = response.data.patients
                    })
                    .catch(err => console.log(err))
            }
        }
    }
</script>

<style scoped>
    .patients-container {
        width: 70%;
        margin: 20px auto;
    }
    .patients-container__patients-list-empty {
        font-size: 25px;
        margin-top: 20px;
        color: #e64848;
    }
</style>