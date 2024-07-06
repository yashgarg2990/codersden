const express = require("express")
const router = express.Router()

const {capturePayment , verifySignature} = require("../controllers/Payment")
const {auth , isStudent , isInstructor} = require("../middlewares/auth")

router.post("/capture-payment" , auth , isStudent , capturePayment)
router.post("/verify-Signature" , verifySignature)

module.exports = router