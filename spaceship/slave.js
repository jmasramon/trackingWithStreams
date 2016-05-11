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
function renderScene(actorsMes) {
    console.log('received mes:', actorsMes);
    var actors = JSON.parse(JSON.parse(actorsMes.data));
    paintStars(actors.stars);
    paintSpaceShip(actors.heroMovs.x, actors.heroMovs.y);
    paintEnemies(actors.enemies);
    paintHeroShots(actors.heroShots);
}

replayerSocketSubject.sample(SPEED).subscribe(renderScene);

