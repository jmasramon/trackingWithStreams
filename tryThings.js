var Rx = require('rx');

function isEvenTicks(tick) {
    if (tick % 2 == 0){
        return true;
    }
    return false;
}

// var evenTicks = 0;

var ticks = Rx.Observable
                .interval(100)
                .scan(function(acc, tick) {
                    console.log('tick:', tick);
                    if (tick % 2 == 0){
                        acc++;
                        return acc;
                    }
                    return acc;
                }, 0)
                .distinct();

ticks.subscribe(function(evenTick) {
                         console.log('S1: new even tick', evenTick);
                });

ticks.subscribe(function(evenTick) {
                         console.log('S2: new even tick', evenTick);
                });

// ticks.subscribe(function(tick) {
//                     console.log('tick:', tick);
//                     if (isEvenTicks(tick))  {
//                         evenTicks++;
//                         console.log('S1: new even tick', evenTicks);
//                     }
//                 });

// ticks.subscribe(function(tick) {
//                     console.log('tick:', tick);
//                     if (isEvenTicks(tick))  {
//                         evenTicks++;
//                         console.log('S2: new even tick', evenTicks);
//                     }
//                 });

