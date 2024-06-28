const express = require('express');
const router=express.Router();
const electionContoller=require('../controllers/election.controller');

router.post('/',electionContoller.addElections)

module.exports = router