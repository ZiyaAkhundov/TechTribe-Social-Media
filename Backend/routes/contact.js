const router = require('express').Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
    try {
        const {name,email,message} = req.body
        const data = new Contact({name,email,message})
        await data.save()
        res.status(200).json({message:'Submit Successful',status:'success'})
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})

module.exports =router;