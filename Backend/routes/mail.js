const express = require("express");
const { check, validationResult } = require("express-validator");
const mailService = require("../services/mailService");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

//@route   POST api/mail
//@desc    Send Email
//@access  Public
router.post(
    "/",
    [
        check("message", "Please write a message before submit")
            .not()
            .isEmpty(),
        // check("email", "please include a valid email").isEmail(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, subject, message } = req.body;

        try {
          
            
                await mailService.sendEmail(
                    {
                        to: process.env.USER,
                        from: process.env.USER,
                        subject: "Feedback",
                        replyTo: email
                    },
                    {
                        name: name,
                        email: email,
                        subject: subject,
                        message: message,
                    },
                    "feedback"
                );

            res.send({ success: true });

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }

);

module.exports = router;
