const userRouter = require('express').Router();
const Controller = require('../controller/index');
const { userRouterIndex } = require('.');

userRouter.get('/rockets',Controller.userController.rockets);
userRouter.get('/rockets/:rocket_id',Controller.userController.oneRocket);
userRouter.get('/country',Controller.userController.country)

exports.userRouter = userRouter;