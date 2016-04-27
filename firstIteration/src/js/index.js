/* global CLIENT */
/* jshint esversion:6 */
import { run } from '@cycle/core';
import { makeDOMDriver, makeHTMLDriver } from '@cycle/dom';
import { rerunner, restartable } from 'cycle-restart';

let main = require('./main').default;

export default () =>
	run(main, {
		DOM: makeHTMLDriver()
	});

if (CLIENT) {
	let drivers = {
		DOM: restartable(makeDOMDriver('#root'), { pauseSinksWhileReplaying: false })
	};

	let rerun = rerunner(run);
	rerun(main, drivers);

	if (module.hot) {
		require('webpack-hot-middleware/client');
		module.hot.accept(() => {
			main = require('./main').default;
			rerun(main, drivers);
		});
	}
}

// import {run} from '@cycle/core';
// import {h, makeDOMDriver} from '@cycle/dom';

// function main({DOM}) {
// 	const toggled$ = DOM.select('input').events('click')
// 		.map(event => event.target.checked)
// 		.startWith(false);

// 	return {
// 		DOM: toggled$.map(toggled => 
// 			h('div', [
// 				h('input', {type: 'checkbox'}),
// 				'Toggle me',
// 				h('p', `${toggled ? 'On': 'Off'}`)
// 				])
// 			)
// 	};
// }

// run(main, {
// 	DOM: makeDOMDriver('#app')
// });