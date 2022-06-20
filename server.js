const express = require('express')
const app = express()
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { sendFile } = require('express/lib/response');
require('dotenv').config()

const PORT = process.env.PORT || 8000

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'my-moods'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to database ${dbName}`)
        db = client.db(dbName)
        const moodCollection = db.collection('motd')

        app.set('view engine', 'ejs')
        app.use(express.static('public'))
        // app.use('/images', express.static('images'));
        app.use(express.urlencoded({ extended: true }))
        app.use(express.json())

        // render db results
        app.get('/', (req, res) => {
            moodCollection.find().toArray()
            .then(results => {
                console.log(results)
                res.render('index.ejs', { motd: results })
              })
              .catch(error => console.error(error))
        })

        app.get('/motd', (req, res) => {
            moodCollection.find().toArray()
            .then(results => {
                res.json(results)
              })
              .catch(error => console.error(error))
        })

        // post db results
        app.post('/motd', (req, res) => {
            moodCollection.insertOne(req.body)
              .then(result => {
                res.redirect('/')
                // console.log(result)
              })
              .catch(error => console.error(error))
        })

        // // FIX THIS
        // // update db results
        // app.put('/motd', (req, res) => {
        //     moodCollection.findOneAndUpdate(
        //         { },
        //         {
        //           $set: {
        //             overallMood: req.body.status,
        //           }
        //         },
        //         {
        //           upsert: true
        //         }
        //       )
        //         .then(result => {
        //             res.json('Success')
        //         })
        //         .catch(error => console.error(error))
        // })
        
        app.listen(PORT, (req, res) => {
            console.log(`Server running on ${PORT}. Betta go catch it!`)
        })

    })

    .catch(err => console.log(err))
