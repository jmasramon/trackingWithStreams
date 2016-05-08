var HERO_Y = canvas.height - 30;

var heroMovs$ = Rx.Observable
    .fromEvent(document, 'mousemove')
    .map(function(event) {
        return {
            x: event.clientX,
            y: HERO_Y
        };
    })
    .startWith({
        x: canvas.width / 2,
        y: HERO_Y
    })
    ;

var clicks$ = Rx.Observable
    .fromEvent(document, 'click');

var spaces$ = Rx.Observable
    .fromEvent(document, 'keypress')
    .filter(function(event) {
        return event.keycode == 32;
    });


var heroShots$ = Rx.Observable
        .combineLatest(Rx.Observable
            .merge(clicks$, spaces$)
            .sample(200)
            .timestamp(), heroMovs$, function(shots, moves) {
                return {
                    timestamp: shots.timestamp,
                    x: moves.x
                };
            })
        .distinctUntilChanged(function(shot) {
            return shot.timestamp;
        })
        .scan(function(acc, cur) {
            acc.push({x: cur.x, y: HERO_Y});
            return acc;
        }, []);

function drawTriangle(x, y, width, color, direction) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x - width, y);
    ctx.lineTo(x, direction === 'up' ? y - width : y + width); ctx.lineTo(x + width, y);
    ctx.lineTo(x - width,y);
    ctx.fill();
}

function paintSpaceShip(x, y) {
    drawTriangle(x, y, 20, '#ff0000', 'up');
}

var SHOOTING_SPEED = 15;

function paintHeroShots(heroShots) {
    heroShots.forEach(function(shot) {
        shot.y -= SHOOTING_SPEED;
        drawTriangle(shot.x, shot.y, 5, '#ffff00', 'up');
    });
}


