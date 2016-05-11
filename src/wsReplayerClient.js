var plus = document.getElementById('plusButton');
var counter = document.getElementById('counter');
var minus = document.getElementById('minusButton');
var count = 0;

var openObserver = Rx.Observer.create(function(e) {
    console.info('socket 8081 open');
});

// an observer for when the socket is about to close
var closingObserver = Rx.Observer.create(function() {
  console.log('socket is about to close');
});

var replayerSocketSubject = Rx.DOM.fromWebSocket('ws://127.0.0.1:8081',
                                        null, // no protocol
                                        openObserver,
                                        closingObserver);

replayerSocketSubject
    .tap(function(mesEvent) {
        console.log('received mes:', mesEvent);
    })
    .subscribe(function(mesEvent) {
        var data = JSON.parse(JSON.parse(mesEvent.data));
        // console.log('received data object:', data);
        if (data['clicks']){
            console.log('received a click');
            if (data.clicks.indexOf('plus')>-1){
                console.log('received click on +');
                count += 1;
            } else if (data.clicks.indexOf('minus')>-1){
                console.log('received click on -');
                count -= 1;
            }
            counter.innerHTML = count;
        }
        if(data['quakes']){
            console.log('received a quake');
        }
    });

var plusObserver = Rx.Observable.fromEvent(plus, 'click');
plusObserver.
    subscribe(function(event) {
        console.log('clicked on +');
        count += 1;
        counter.innerHTML = count;
        replayerSocketSubject.onNext(JSON.stringify({clicks: 'Clicked on minus button'}));
    });

var minusObserver = Rx.Observable.fromEvent(minus, 'click');
minusObserver.
    subscribe(function(event) {
        console.log('clicked on -');
        count -= 1;
        counter.innerHTML = count;
        replayerSocketSubject.onNext(JSON.stringify({clicks: 'Clicked on plus button'}));
    });


