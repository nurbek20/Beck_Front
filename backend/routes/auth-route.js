const { Router } = require('express');
const router = Router()
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/registration',
    [
        check('email', 'Некорректный Email').isEmail(),
        check('paasword', 'Некорректный Пароль').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некоррекные данные при регистрации"
                })
            }
            const { email, password } = req.body
            const isUsed = await User.findOne({ email })
            if (isUsed) {
                return res.status(300).json({
                    message: "Данный Email уже занять, попробуйте другой."
                })
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = new User({
                email, password: hashedPassword
            })
            await user.save()

            res.status(201).json({
                message: "Пользователь создан"
            })

        } catch (err) { console.log(err) }
    })


router.post('/login',
    [
        check('email', 'Некорректный Email').isEmail(),
        check('paasword', 'Некорректный Пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некоррекные данные при регистрации"
                })
            }
            const { email, password } = req.body
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({
                    message: 'Такого Email нет в базе'
                })
            }

            const isMatch = bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({
                    message: 'Не верный Пароль или Email'
                })
            }

            const jwtSecret = 'lskdjhgsliudh2345346kjdnhgiksjdgn345ihnskdv'
            const token = jwt.sign(
                { userId: user.id },
                jwtSecret,
                { expiresIn: '4h' }
            )
            res.json({ token, userId: user.id })

        } catch (err) { console.log(err) }
    })

module.exports = router