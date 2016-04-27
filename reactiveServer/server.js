/* jshint esversion:6 */

const Rx = require('rx');
const requests$ = new Rx.Subject();

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
requests$
	.tap(e => console.log('request to', e.req.url)) // this should be actually storing to db
  	.subscribe(echo,
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
  requests$.onNext({ req: req, res: res });
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});