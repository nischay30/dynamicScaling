const redis = require('redis');

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;

const client = redis.createClient(redisPort, redisHost);

client.on('error', () => {
	console.log('Error in connecting the redis');
});

client.on('connect', () => {
	console.log('Client is connected to the redis Server');
});

module.exports = client;