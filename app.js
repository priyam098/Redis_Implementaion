const express = require('express');
const responseTime = require('response-time');
const { response } = require('express');
const routerIndex = require('./route/index')

const app = express();
app.use(express.json());
app.use(responseTime());

app.use('/user',routerIndex.userRouterIndex.userRouter)

app.listen(8081,()=> console.log('server up and running'));