const client = require('./redisClient');

function pushReplicaNumber(replicaNumber) {
	client.lpush('replicaList', replicaNumber, (err, res) => {
		if(err) {process.exit(0);}
		console.log('Res', res);
	})
}

module.exports = pushReplicaNumber;