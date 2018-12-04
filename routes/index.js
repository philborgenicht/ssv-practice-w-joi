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
  const { first_name, last_name, email, password } = req.body

  if (first_name && last_name && email && password) {
    return knex('users')
    .where('email', req.body.email)
    .first()
    .then(exists => {
      if(exists) {
        res.status(400).send({error: 'That email is already registered.'})
      } else {
        return knex('users')
        .insert({first_name, last_name, email, password})
        .then(user => {
          res.status(200).send({first_name, last_name, email, password})
        })
      }
    })
  } else {
    res.status(400).send({error: 'Please include all fields.'})
  }
})


module.exports = router;
