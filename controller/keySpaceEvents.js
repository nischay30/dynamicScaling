const client = require('./redisClient').duplicate();
const getReplicaNumberFromRedis = require('./getReplicaNumberFromRedis')();
const lengthClient = client.duplicate();
const publishClient = client.duplicate();

const createWorker = require('./createWorker');

let arr = [];
let scaledTime = new Date();
let scaledAverage = 60;
const min_threshold = 20;
const max_threshold = 90;

client.subscribe('__keyspace@0__:ziggurate_abc');

client.on('message', (channel, message) => {
	// Check particular lpush of particular queue
	if(channel === '__keyspace@0__:ziggurate_abc' && message === 'lpush')
		getLengthOfQueueFromRedis();
});

function getLengthOfQueueFromRedis() {
	lengthClient.llen('ziggurate_abc', (err, length) => {
		maintainLocalArray(length);
	});
}

function maintainLocalArray(length) {
	const obj = {
		time: new Date(),
		length: length
	}
	arr.push(obj);
	arr = arr.filter((value) => {
		let presentTime = new Date();
		return ((presentTime.getMinutes() * 60 + presentTime.getSeconds()) - (value.time.getMinutes() * 60 + value.time.getSeconds())) < 61;
	});
	average = calculateAverage(arr, checkCondition);
}

// Check whether the average is above or below Max_Threshold
function checkCondition(currentAvg) {
	let presentTime = new Date();
	let seconds = (presentTime.getMinutes() * 60 + presentTime.getSeconds()) - (scaledTime.getMinutes() * 60 + scaledTime.getSeconds());
	if(seconds > 10 ) {
		console.log('Current Avg', currentAvg);
		console.log('Scaled Avg', scaledAverage);

		if(currentAvg <= scaledAverage) {
			console.log('Scaled Average', scaledAverage);
			console.log('Current Average', currentAvg);
			scaledTime = new Date();
			createWorker.deleteWorker(1, (err, res)=> {
				scaledAverage = currentAvg;
				publishToChannel(res);
				console.log('worker Delted');
			});
		}
		else if(currentAvg > scaledAverage  && currentAvg > max_threshold) {
		scaledTime = new Date();
			createWorker.addWorker(1, (err, res)=> {
				scaledAverage = currentAvg;
				publishToChannel(res);
				console.log('worker added');
			});
		}
	}
}

function publishToChannel(workerNumber) {
	console.log(workerNumber);
	publishClient.publish('currentWorkers', workerNumber);
}

// Calculate the average
function calculateAverage(array, callback) {
	let sum = array.map(value => value.length).reduce((a, b) => {
		return a + b;
	});
	callback(Math.floor(sum / array.length));
}
