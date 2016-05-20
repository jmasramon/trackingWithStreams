/* jshint esversion:6 */

const Rx = require('rx');
const requests$ = new Rx.Subject();
const WebSocketServer = require('ws').Server;

var onMessageFromOrigin,
    onMessageFromDestination;

var originWs,
    destinationWs;

function onConnectToSerializer(ws) {
  console.log('Client connected on localhost:8080');

  originWs = ws;

  onMessageFromOrigin = Rx.Observable
    .fromEvent(ws, 'message')
    .share()    
    .subscribe(function(message) {
      console.log('received from origin:', message);
      destinationWs.send(JSON.stringify(message),
        function(err) {
          if (err) {
            console.log('There was an error sending the message to destination:', err.message);
        } 
      });
    });
}

function onConnectToReplayer(ws) {
  console.log('Client connected on localhost:8081');

  destinationWs = ws;

  onMessageFromDestination = Rx.Observable
    .fromEvent(ws, 'message')
    .share()
    .subscribe(function(message) {
      console.log('received from destination:', message);
      originWs.send(message,
        function(err) {
          if (err) {
            console.log('There was an error sending the message to origin:', err.message);
        } 
      });
    });
}

const SerializerServer = new WebSocketServer({ port: 8080});
Rx.Observable
  .fromEvent(SerializerServer, 'connection')
  .subscribe(onConnectToSerializer);
console.log('listening on port 8080')

const ReplayerServer = new WebSocketServer({ port: 8081});
Rx.Observable
  .fromEvent(ReplayerServer, 'connection')
  .subscribe(onConnectToReplayer);
console.log('listening on port 8081')
