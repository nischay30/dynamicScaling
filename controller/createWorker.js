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
		callback(null);
	});
}

module.exports = {
	setWorkerForUI: function (workerCount, callback) {
		workers = workerCount;
		createWorker(workers, callback);
	},
	addWorker: function(workerInstancesToAdd, callback) {
		workers = workers + workerInstancesToAdd;
		createWorker(workers, callback);
	},
	deleteWorker: function(workerInstancesToDelete, callback) {
		workers = workers - workerInstancesToDelete;
		createWorker(workers, callback);
	}
}

