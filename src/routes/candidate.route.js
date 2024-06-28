const express = require('express');
const router=express.Router();
const candidateController=require('../controllers/candidate.controller');

router.post('/',candidateController.addCandidate)
router.post('/verify/:candidateId',candidateController.verifyCandidate)

module.exports = router