var openObserver = Rx.Observer.create(function(e) {
    console.info('socket 8080 open');

    var messageGenerator$ = Rx.Observable.interval(1500 /* ms */);

    messageGenerator$
        .take(5)
        .delay(300)
        .subscribe(function(index) {
            console.log('sending message num:', index);
            oringinalSocketSubject.onNext(JSON.stringify({quakes: 'hola lola' + index }));
        });
});

// an observer for when the socket is about to close
var closingObserver = Rx.Observer.create(function() {
  console.log('socket is about to close');
});

var oringinalSocketSubject = Rx.DOM.fromWebSocket('ws://127.0.0.1:8080',
                                        null, // no protocol
                                        openObserver,
                                        closingObserver);
oringinalSocketSubject.
    subscribe(function(data) {
        console.log('received ack:', data);
    });


var plus = document.getElementById('plusButton');
var counter = document.getElementById('counter');
var minus = document.getElementById('minusButton');
var count = 0;

var plusObserver = Rx.Observable.fromEvent(plus, 'click');
plusObserver.
    subscribe(function(event) {
        console.log('clicked on +');
        count += 1;
        counter.innerHTML = count;
        oringinalSocketSubject.onNext(JSON.stringify({clicks: 'Clicked on plus button'}));
    });

var minusObserver = Rx.Observable.fromEvent(minus, 'click');
minusObserver.
    subscribe(function(event) {
        console.log('clicked on -');
        count -= 1;
        counter.innerHTML = count;
        oringinalSocketSubject.onNext(JSON.stringify({clicks: 'Clicked on minus button'}));
    });

