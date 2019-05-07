const express = require('express')

const router = express.Router()


const Ninja = require('../models/ninja')




router.get('/ninjas', (req,res, next)=>{

    Ninja.aggregate([{
        $geoNear: { near: {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        spherical: true,
        maxDistance: 500000,
        distanceField: 'dist.calculated'}
    }]).then(ninjas=>{
        res.send(ninjas);
    })
})

router.post('/ninjas', (req,res, next)=>{
    /* let ninja = new Ninja(req.body)

    ninja.save() */
    Ninja.create(req.body).then(completed=>{
        res.send(completed)
    }).catch(next)

    
})

router.put('/ninjas/:id', (req,res,next)=>{
    
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(()=>{
        Ninja.findById(req.params.id).then(ninja=>{
            res.send({ninja})
        })
    })
})

router.delete('/ninjas/:id', (req,res,next)=>{
    Ninja.findByIdAndRemove({_id: req.params.id}).then(ninja=>{
        res.send(ninja)
    })    
})

module.exports = router;