const express = require('express');
const router = express.Router();

const UserService = require('../../services/user.services')
const service = new UserService();

router.get('/', async (req,res, next) => {
    try {
        const users = await service.find();
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
})

module.exports = router;