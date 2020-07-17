// Import express module into server
const express = require('express'); // require only works with Node.js
const router = express.Router();

// Import database models
const NewsletterModel = require('../models/NewsletterModel');

// A POST route for saving data into the 'newsletter'collection
router.post(
    '/register',
    (req, res) => {
        const formData = {
            email: req.body.email,
            marketing: req.body.marketing,
            sharing: req.body.sharing
        };

        // Save the data to database (products collection)
        const newNewsletterModel = new NewsletterModel(formData);
        newNewsletterModel.save()

        // if successful then display success messages
        .then (
            () => {
            res.json({message: 'Email registered'});
            }
        )

        // if error then display it
        .catch(
            (e) => {
                res.json({message: 'Email registration failed'});
            }
        )
    }
);

// POST route to update newsletter preferences 
router.post(
    '/update',
    (req, res) => {
        const formData = {
            _id: req.body._id,
            email: req.body.email,
            marketing: req.body.marketing,
            sharing: req.body.sharing
        };

        // 1) In database, find the email address and preferences that match the email id provided
        NewsletterModel.findOneAndUpdate(
            {_id: formData._id },  // search criteria
            {                           // criteria (keys and values) to update
                email: formData.email,
                marketing: formData.marketing,
                sharing: formData.sharing 
            },
            {}, // options, if any
            (err, document) => {

                if(err) {
                    console.log(err);
                } else {
                    // 2) If no document is found for the email id, say can't find email
                     if(!document) {
                        res.json({message: 'Email not found'});
                    }
                
                    else {      // 3) Otherwise, if email is found, return success
                        res.json(
                            {
                                message: 'Newsletter preferences updated',
                                document: document
                            }
                        )
                    }
                }
            }
        );
    }
);


// Export the router
module.exports = router;