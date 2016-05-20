var openObserver = Rx.Observer.create(function(e) {
    console.info('socket 8080 open');

    // var messageGenerator$ = Rx.Observable.interval(1500 /* ms */);

    // messageGenerator$
    //     .take(5)
    //     .delay(300)
    //     .subscribe(function(index) {
    //         console.log('sending message num:', index);
    //         oringinalSocketSubject.onNext(JSON.stringify({quakes: 'hola lola' + index }));
    //     });
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

var Game$ = Rx.Observable
    .combineLatest(stars$, heroMovs$, enemies$, heroShots$, function(stars, heroMovs, enemies, heroShots) {
        var res = {
            stars: stars,
            heroMovs: heroMovs,
            enemies: enemies,
            heroShots: heroShots
        };

        return res;
    })
    .tap(function(res) {
        oringinalSocketSubject.onNext(JSON.stringify(res));    
    });

function renderScene(actors) {
    paintStars(actors.stars);
    paintSpaceShip(actors.heroMovs.x, actors.heroMovs.y);
    paintEnemies(actors.enemies);
    paintHeroShots(actors.heroShots);
}


Game$.sample(SPEED).subscribe(renderScene);

