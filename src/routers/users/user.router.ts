// const express = require('express');
import express, { Router, Request, Response, NextFunction } from 'express';
import { Model } from 'sequelize';
const router: Router = express.Router();

// const UserService = require('../../services/user.services');
import UserService from '../../services/user.services';

const service:UserService = new UserService();

router.get('/', async (req:Request, res:Response, next: NextFunction) => {
    try {
        const users:Model[] = await service.find();
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
})

export default router;