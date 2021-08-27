const express = require('express');
const router = express.Router();

const Users = require('../models/users');

router.use( '/signup', (req, res, next) => {
    const user = new Users({
      ...req.body
    });
    user.save()
    .then(() => res.status(201).json({message : 'Utilisateur créé'}))
    .catch(error => res.status(400).json({error}));
  });
  
router.use( '/login', (req, res, next) => {
    
});

module.exports = router;