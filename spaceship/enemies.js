var ENEMY_FREQ = 1500;
var enemies$ = Rx.Observable
    .interval(ENEMY_FREQ)
    .scan(function(acc, cur) {
        var newEnemy = {
                x: parseInt(Math.random() * canvas.width),
                y: -30,
        };
        acc.push(newEnemy);
        return acc;
    }, []);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function paintEnemies(enemies) {
    enemies.forEach(function(enemy) {
        enemy.y += 5;
        enemy.x += getRandomInt(-15, 15);
        drawTriangle(enemy.x, enemy.y, 20, '#00ff00', 'down');
    });
}
