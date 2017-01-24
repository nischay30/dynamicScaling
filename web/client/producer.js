var redis =require('redis');
const redisPort = process.env.REDIS_PORT || 6379;
const redisHost = process.env.REDIS_HOST || 'redis';
var client=redis.createClient(redisPort, redisHost);

var interval;

var dynamicScaling = function(msgsPerSecond, processingDelay, lengthChanged)
{
	let timeInterval = 1000/msgsPerSecond;
	let obj = {
		processingDelay: processingDelay
	}

	obj.processingDelay = processingDelay;
	client.on('error',function(error){
		console.log("error in redis connection");
	})

	if(interval) { clearInterval(interval); }

	interval = setInterval(() => {
		client.lpush('ziggurate_abc',JSON.stringify({processDelay:obj.processingDelay}),function(err, reply) {
			// console.log(reply);
			lengthChanged(reply);
		});
		console.log('pushed');
	}, timeInterval);
}

module.exports = dynamicScaling;