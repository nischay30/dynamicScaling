var redis =require('redis');
const redisPort = process.env.REDIS_PORT || 6379;
const redisHost = process.env.REDIS_HOST || 'redis';
var client=redis.createClient(redisPort, redisHost);

// var msgsPerSecond=1000;
// var processingDelay=2;
// var interval = 1000/msgsPerSecond;
var obj={
	processingDelay:20
}

var interval;


var dynamicScaling = function(msgsPerSecond, processingDelay)
{
	obj.processingDelay=processingDelay;
	client.on('error',function(error){
		console.log("error in redis connection");
	})

	if(interval) { clearInterval(interval); }

	interval = setInterval(() => {
		client.lpush('ziggurate_abc',JSON.stringify({processDelay:obj.processingDelay}),function(err,reply){console.log(reply);});
		console.log('pushed');
	}, interval);
}

module.exports=dynamicScaling;