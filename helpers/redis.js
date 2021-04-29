const express = require('express');
const redis = require('redis');
const client = redis.createClient();
const {promisify} = require('util');

module.exports = {
 Get_async : promisify(client.get).bind(client),
 Set_async : promisify(client.set).bind(client),
 Hmset_async : promisify(client.hmset).bind(client),
 HgetAll_async : promisify(client.hgetall).bind(client),
 EX_async : promisify(client.expire).bind(client)
}