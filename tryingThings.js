'use strict';

const Rx = require('rx');
const fs = require('fs');

let observable = Rx.Observable.create(function(observer) { // the observer wants to be notified
	observer.onNext('Simon');	// it is notified by the observable by calling its onNext with data as param
	observer.onNext('Jordi');
	// observer.onError('Fake error');
	observer.onCompleted();
});

observable
	.map(function(name) {
		return name.toUpperCase();
	})
	.subscribe(function(name) {
		console.log('received:', name);
	});

observable
	.map(function(name) {
		return 'Hello' + name;
	})
	.subscribe(function(name) {
	console.log('Greeting:', name);
});

let observer = Rx.Observer.create(
	function onNext(x) {
		console.log('Next: ' + x);
	},
	function onError(err) {
		console.log('Error: ' + err);
	},
	function onCompleted() {
		console.log('Completed');
	});

observable.subscribe(observer);

Rx.Observable.from([1,2,3,4,5,6])
	.reduce(function(acc, elem) {
		if (elem % 2 ==0){
			acc.push(elem);
		}
		return acc;
	},[])
	.subscribe(function(elem) {
		console.log('elem:', elem);
	});

Rx.Observable.from([1,2,3,4,5,6])
	.scan(function(acc, elem) {
		if (elem % 2 ==0){
			acc.push(elem);
		}
		return acc;
	},[])
	.subscribe(function(elem) {
		console.log('intermediate elem:', elem);
	});

// let readdir = Rx.Observable.fromNodeCallback(fs.readdir);

// var source = readdir('.');

// source.subscribe(function(dirLs) {
// 	console.log('dir contains', dirLs);
// 	Rx.Observable.from(dirLs).subscribe(function(file) {
// 		console.log('dir contains:', file);
// 	})
// });

console.log ('--------------------------------------');
Rx.Observable.range(0,10).subscribe(function(i) {
			console.log('range elem', i);
		});
console.log ('--------------------------------------');
Rx.Observable.range(1,2).subscribe(function(i) {
			console.log('range elem', i);
		});
console.log ('--------------------------------------');
Rx.Observable.range(2,2).subscribe(function(i) {
			console.log('range elem', i);
		});
console.log ('--------------------------------------');

var source = Rx.Observable
    .range(1, 2)
    .tap(function(e) {
    	console.log('range(1,2) elem:', e);
    })
    .selectMany(function (x) {
        return Rx.Observable.range(x, 2);
    });
source
	.reduce(function(acc,e) {
		 acc.push(e);
		 return acc;
	}, [])
	.subscribe(function (e) {
		console.log('flatmaped ranges elem', e);
	});

console.log ('--------------------------------------');

Rx.Observable.from([1,2,3,4,5,6])
	.concatMap(function(elem) {
		console.log ('--------------------------------------');
		console.log('creating a range from 0 to', elem);
		Rx.Observable.range(0,elem).subscribe(function(i) {
			console.log('range elem', i);
		});
		return Rx.Observable.range(0,elem);
	})
	.reduce(function(acc, elem) {
		acc.push(elem);
		return acc;
	},[])
	.subscribe(function(elem) {
		console.log('intermediate elem:', elem);
	});


function getJSON(arr) {
	return Rx.Observable.from(arr).map(function(str) {
		var parsedJSON = JSON.parse(str);
		return parsedJSON; 
	});
}

getJSON(['{"1": 1, "2":2, "3":3}','{"success": kk}','{"enabled": true}'])
	.catch(
		Rx.Observable.just({
			error: 'There was an error parsing JSON' }))
	.subscribe(function(json) {
		console.log('json', json);
	},
	function(err) {
		console.log('err', err);
	});

getJSON(['{"1": 1, "2":2, "3":3}','{"success": kk}','{"enabled": true}'])
	.retry(3)
	.subscribe(function(json) {
		console.log('json', json);
	},
	function(err) {
		console.log('err', err);
	});


function eqfee_callback(allDayJson) {
	let quakes$ = Rx.Observable.from(AllDayJson.features).pluck('properties');
}






