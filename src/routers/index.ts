// const express = require('express');
import express, {Router, Express} from 'express';

// const postsRouter = require('./users/user.router');
import postsRouter from './users/user.router';

function routerApi(app: Express):void {
    const router:Router = express.Router();
    app.use('/api/v1', router);//ruta de api principal
    router.use('/users', postsRouter);
}

// module.exports = routerApi;
export default routerApi;