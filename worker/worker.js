var redis =require('redis');
const redisPort = process.env.REDIS_PORT || 6379;
const redisHost = process.env.REDIS_HOST || 'redis';
var client=redis.createClient(redisPort, redisHost);


function processMsg() {
  client.on('error',function(error) {
  	console.log("Error in Connection");
  });

  client.brpop('ziggurate_abc',0,function(err, reply) {
  	let timeOutDelay = JSON.parse(reply[1]).processDelay;

  	console.log('processDelay :'+timeOutDelay)
  	setTimeout(processMsg,timeOutDelay)
  });
}
processMsg();