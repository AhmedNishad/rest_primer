const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes/api')
const cors = require('cors')

mongoose.connect('mongodb://localhost/ninjago', { useNewUrlParser: true })
// Set Promise to non deprecated
mongoose.Promise = global.Promise

const app = express()
app.use(cors())

app.use(express.static('public'))

app.use(bodyParser.json())


app.use('/api',routes)

// Error Handling MiddleWare
app.use((err,req,res,next)=>{

    res.status(422).send({error: err.message})
})

app.get('/', (req,res)=>{
    res.redirect('index.html')
})


app.listen(3000, () => {
    console.log(`Server started on port`);
});

