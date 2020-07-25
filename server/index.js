const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const router = require('./routes/router')
const history = require('connect-history-api-fallback');
const PORT = process.env.PORT || 3000
const app = express()

const UPDATE_FEEDS_TIMEOUT = 60*60*1000

app.use(express.urlencoded({extended: true}))
app.use(express.json())
console.log(path.join(__dirname, '../dist'))
app.use( express.static(path.join(__dirname, '../dist')))
app.use(router)
app.use(history())
app.use( express.static(path.join(__dirname, '../dist')))
/*app.get('/lol', async (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'))

})*/

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://george:qwertyfuck15@cluster0-bi0ip.mongodb.net/patient-record',
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }
    )
    app.listen(PORT, () => {
      console.log('Server has been started on port ', PORT)
    });
  } catch (e) {
    console.log(e)
  }


}
start()
