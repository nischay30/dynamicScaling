const client = require('./redisClient');
const createWorker = require('./createWorker');

function getMessage() {
	getReplicaNumberFromRedis();
}

function getReplicaNumberFromRedis() {
	client.brpop('replicaList', 0, (err, reply) => {
		console.log(reply);
		let replicaCount = reply[1];
		createWorker.setWorkerForUI(replicaCount, (err) => {
			if(err) {process.exit(0); return; }
			setTimeout(getMessage);
		});
	});
}

getMessage();