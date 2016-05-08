// var quakes = Rx.Observable
//     .create(function(observer) {
//         window.eqfeed_callback = function(response) {
//         //     var quakes = response.features;
//         //     quakes.forEach(function(quake) {
//         //         console.log('emitted:', quake);
//         //         observer.onNext(quake);
//         //     });
//         //      observer.onCompoleted();
//         // };
//             observer.onNext(response);
//             observer.onCompleted(); // we have sent all
//         };
//         loadJSONP(QUAKE_URL);
//     });

var quakes = Rx.Observable
            .interval(2000)
            .flatMap(function(i) {
                return Rx.DOM.jsonpRequest({
                url: QUAKE_URL,
                jsonpCallback: 'eqfeed_callback' })
            })
            .flatMap(function(response) {
                console.log('response:', response);
                return Rx.Observable.from(response.response.features);
            })
            .distinct(function(quake) {
                return quake.properties.code;
            })
            .startWith({
                geometry:{
                    coordinates:[0,0]
                },
                properties: {
                    mag: 0,
                    code: 0
                }
            });

quakes.map(function(quake) {
                console.log('Something new !!!:', quake);
                var coords = quake.geometry.coordinates;
                var size = quake.properties.mag * 10000;
                return L.circle([coords[1], coords[0]], size);
            })
    .subscribe(function(circle) {
                circle.addTo(map);
                incrementCounter();
            });

// var tipsData = quakes.map(function(quake) {
//         return {
//             geo: quake.geometry,
//             mag: quake.properties.mag
//         };
//     });

// var circles =
// var mouseOvers = Rx.Observable.fromEvent(map, 'mouseover')
//     .filter(function(event) {
//         return true;
//     }).
//     subscribe(function(event) {
//         console.log('mouseover event:', event);
//     });


var counter = 0;
function incrementCounter() {
    counter++;
    document.getElementById('counter').textContent = counter;
}


// quakes.subscribe(function(quake) {
//         console.log('processed:', quake);
//         var coords = quake.geometry.coordinates;
//         var size = quake.properties.mag * 10000;

//         console.log('adding circle to', map);
//         L.circle([coords[1], coords[0]], size).addTo(map);
//     });


// quakes
//     .flatMap(function(response) {
//         return Rx.Observable.from(response.features);
//     })
//     .subscribe(function(quake) {
//         var coords = quake.geometry.coordinates;
//         var size = quake.properties.mag * 10000;

//         L.circle([coords[1], coords[0]], size).addTo(map);
//     });
