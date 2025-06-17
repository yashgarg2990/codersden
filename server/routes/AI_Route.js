const express = require("express");
const {getAITutorResponse }  = require("../controllers/AI.controllers") ;

const router = express.Router();

router.post("/ai-tutor", getAITutorResponse);

module.exports = router;