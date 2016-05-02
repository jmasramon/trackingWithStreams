var count = 0;

var openObserver = Rx.Observer.create(function(e) {
    console.info('socket 8081 open');

    // var messageGenerator$ = Rx.Observable.range(1, 5);

    // messageGenerator$.
    //     subscribe(function(index) {
    //         console.log('sending message num:', index);
    //         replayerSocketSubject.onNext(JSON.stringify({quakes: 'hola lola' }));
    //     });
});

// an observer for when the socket is about to close
var closingObserver = Rx.Observer.create(function() {
  console.log('socket is about to close');
});

var replayerSocketSubject = Rx.DOM.fromWebSocket('ws://127.0.0.1:8081',
                                        null, // no protocol
                                        openObserver,
                                        closingObserver);
replayerSocketSubject.
    subscribe(function(mesEvent) {
        console.log('received mes:', mesEvent);
        var data = JSON.parse(JSON.parse(mesEvent.data));
        console.log('received data object:', data);
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



