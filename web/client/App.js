const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const dynamicScaling = require('./producer')
const pushReplicaNumber = require('./pushReplicaNumber');

// socket.on("Update Producer");

app.use(express.static(path.join(__dirname, 'build')));

//const server = http.createServer(app);
//io(server);
io.on('connection', function(socket){
	console.log("connected")
    let workers = 1;
    socket.on('replicas', (replicaNumber) => {
        workers = replicaNumber;
        socket.emit('workers', workers);
        pushReplicaNumber(replicaNumber);
    });
    socket.on('sending',function(data,callback)
      {
        // console.log(data.passFrequency);
        // console.log(data.processingDelay);
        // console.log(data.Max_Threshold);
        // console.log(data.Min_Threshold);
        // console.log(data.Min_Instances);
        dynamicScaling(data.passFrequency, data.processingDelay, (length) => {
            console.log('Length', length);
            socket.emit('workload', length);
        });
        console.log("recived frequency : "+data.passFrequency);
        
    });
});

http.listen(9000, () => {
	console.log('Express server started');
});
