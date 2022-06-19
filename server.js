const express = require('express')
const app = express()
const cors = require('cors');
const { MongoClient } = require('mongodb');
const {sendFile} = require('express/lib/response');
require('dotenv').config()

const PORT = process.env.PORT || 8000

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'my-moods'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to database ${dbName}`)
        db = client.db(dbName)
        // const peopleCollection = db.collection('people')

        app.set('view engine', 'ejs')
        app.use(express.static('public'))
        // app.use('/images', express.static('images'));
        app.use(express.urlencoded({ extended: true }))
        app.use(express.json())

        app.get('/', (req, res) => {
            res.render('index.ejs')
        })
        
        app.listen(PORT, (req, res) => {
            console.log(`Server running on ${PORT}. Betta go catch it!`)
        })

    })

    .catch(err => console.log(err))