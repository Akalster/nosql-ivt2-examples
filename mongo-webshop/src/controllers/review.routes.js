const express = require('express')
const router = express.Router()

const User = require('../models/user.model')() // note we need to call the model caching function
const Product = require('../models/product.model')() // note we need to call the model caching function


// create a new review
router.post('/product/:id/review', async function(req, res) {
    const user = await User.findOne({name: req.body.user})

    if (!user) {
        res.status(400).end()
        return
    }

    const review = {
        rating: req.body.rating,
        text: req.body.text,
        user: user._id
    }

    try {
        await Product.updateOne({_id: req.params.id}, {
            $push: {
                reviews: review
            }
        }, {runValidators: true})

        res.status(201).end()
    } catch {
        res.status(400).end()
    }
})


module.exports = router