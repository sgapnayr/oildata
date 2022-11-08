require('dotenv').config()
const express = require('express')
const app = express()
const { PORT, MONGO_PASSWORD } = process.env
const debug = require('debug')('app:startup')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')

const OilSchema = require('./OilSchema/OilSchema')

app.use(express.json())
app.use(helmet())
app.use(cors())

app.use((req, res, next) => {
    debug(req.path, req.method)
    next()
})

mongoose.connect(`mongodb+srv://ryanpags:${MONGO_PASSWORD}@crud.h76aa1g.mongodb.net/test`, {
    useNewUrlParser: true
})

app.post('/post', async (req, res) => {
    const { oilBarrels, date } = req.body

    const oilData = new OilSchema({ oilBarrels, date })

    try {
        res.send(oilData)
        oilData.save()
    } catch (error) {
        console.log(error)
    }
})

app.get('/read', (req, res) => {
    OilSchema.find({}, (err, result) => {
        if (err) {
            res.send(err)
        }
        res.send(result)
    })
})

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params
    OilSchema.findByIdAndDelete(id).exec()
    res.send('Delete')
})

//const url =
// "https://api.eia.gov/v2/petroleum/stoc/wstk/data?api_key=" +
// process.env.EIA_API;

app.listen(PORT, debug(`Server on PORT: ${PORT}`))