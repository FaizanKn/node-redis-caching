const env = require('dotenv').config();
const middlewraes = require('./Middlewares/cachingMiddleware.js');
const express = require('express');
const axios = require('axios');
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_PORT);
const app = express();
const port = process.env.PORT || 3000;

app.get('/redis', middlewraes.cacheMiddleware, (req, res) => {
    const url = req.query.url;
    axios.get(url)
        .then(response => {
            var data = JSON.stringify(response.data);
            console.log(`data fetched from url`);
            client.setex(url, 300, data);
            res.send(data);
        })
        .catch(e => console.log(e));
});

app.listen(port, () => console.log(`Server running on port ${port}!`))
