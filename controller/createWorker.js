const spawn = require('child_process').spawn;

var workers = 1;
function createWorker(workerInstances, callback) {
	const worker = spawn('docker-compose', ['scale', 'worker=' + workerInstances], {cwd: '.'});

	worker.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});

	worker.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
	});

	worker.on('close', (data) => {
		callback(null, workers);
	});
}

module.exports = {
	setWorkerForUI: function (workerCount, callback) {
		workers = workerCount;
		console.log('Worker Count', workerCount);
		createWorker(workers, callback);
	},
	addWorker: function(workerInstancesToAdd, callback) {
		workers = workers + workerInstancesToAdd;
		createWorker(workers, callback);
	},
	deleteWorker: function(workerInstancesToDelete, callback) {
		workers = workers - workerInstancesToDelete;
		if(workers != 0) {
			createWorker(workers, callback);			
		}
		else {
			workers = workers + workerInstancesToDelete;
			callback(null, workers);
		}
	}
}

