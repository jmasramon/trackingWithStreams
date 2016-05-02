/* jshint esversion:6 */

const Rx = require('rx');
const requests$ = new Rx.Subject(); // Both an ovservable and an observer.
                                    // not really needed here

function sendHello(e) {
  console.log('sending hello');
  e.res.writeHead(200, { 'Content-Type': 'text/plain' });
  e.res.end('Hello World\n');
}

function echo(e) {
	console.log('echoing back');
  	e.res.writeHead(200, { 'Content-Type': 'text/plain' });
  	e.req.pipe(e.res);
}

requests$ // process each request throught the observable
	.tap(e => console.log('request to', e.req.url)) // this should be actually storing to db
  	.subscribe(echo, // this is the observer that subscribes to the observable
	    console.error,
	    () => {
	        console.log('stream is done')
	        // nicely frees the stream
	        subscription.dispose()
	    });

process.on('exit', () => subscription.dispose());

const http = require('http');
const hostname = '127.0.0.1';
const port = 1337;
http.createServer((req, res) => {
    // it's like request$ has subscribed to a (fictional) http server stream of requests
  requests$.onNext({ req: req, res: res }); // inject every request into the stream through the observer
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
