const redis = require("redis");
const client = redis.createClient(process.env.REDIS_PORT);

const cacheMiddleware = (req, res, next) => {
    const url = req.query.url;
    client.get(url, function (err, data) {
        if (err) throw err;

        if (data != null) {
            console.log("data found in cache")
            res.send(data);
        } else {
            next();
        }
    });
}

module.exports = { cacheMiddleware: cacheMiddleware }