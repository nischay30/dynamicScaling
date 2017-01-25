const client = require('./redisClient').duplicate();
const createWorker = require('./createWorker');

function getMessage() {
	getReplicaNumberFromRedis();
}

function getReplicaNumberFromRedis() {
	client.brpop('replicaList', 0, (err, reply) => {
		console.log(reply);
		let replicaCount = reply[1];
		createWorker.setWorkerForUI(replicaCount, (err, res) => {
			if(err) {process.exit(0); return; }
			setTimeout(getMessage);
		});
	});
}

module.exports = getMessage;