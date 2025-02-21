import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'

import videoRoutes from './routes/videos.js'

const app = express()

app.use(cors())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/videos', videoRoutes)

mongoose.connect('mongodb+srv://daniel:daniel123@cluster0.d6afn4s.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const PORT = process.env.PORT || 5000
        app.listen((PORT), () => {
            console.log(`CONNECTED ON ${PORT}`)
        })
    })
    .catch((error) =>
        console.log(error.message)
    )

