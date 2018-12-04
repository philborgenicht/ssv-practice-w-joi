const express = require('express');
const router = express.Router();
const knex = require('../knex')

//Get all user data
router.get('/users', (req, res, next) => {
  return knex('users')
    .then(result => {
      res.status(200).send(result)
    })
})

//New user signup
router.post('/signup', function(req, res, next) {
  // Destructure request body into variables
  const { first_name, last_name, email, password } = req.body
  // If all fields are included, check to see if a user with that email already exists
  if (first_name && last_name && email && password) {
    return knex('users')
    .where('email', req.body.email)
    .first()
    .then(exists => {
      if(exists) {
        res.status(400).send({error: 'That email is already registered.'})
      } else {
        // If user with that email does not already exist, insert new user into database
        return knex('users')
        .insert({first_name, last_name, email, password})
        .then(user => {
          // Send success message with an object representing the new user to be appended to the page (object short-hand)
          res.status(200).send({first_name, last_name, email, password})
        })
      }
    })
  } else {
    // If user did not include all fields, send an error message
    res.status(400).send({error: 'Please include all fields.'})
  }
})


module.exports = router;
