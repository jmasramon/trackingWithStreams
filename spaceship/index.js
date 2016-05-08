var Game$ = Rx.Observable.combineLatest(stars$, heroMovs$, enemies$, heroShots$, function(stars, heroMovs, enemies, heroShots) {
        return {
            stars: stars,
            heroMovs: heroMovs,
            enemies: enemies,
            heroShots: heroShots
        };
    });

function renderScene(actors) {
    paintStars(actors.stars);
    paintSpaceShip(actors.heroMovs.x, actors.heroMovs.y);
    paintEnemies(actors.enemies);
    paintHeroShots(actors.heroShots);
}


Game$.sample(SPEED).subscribe(renderScene);
