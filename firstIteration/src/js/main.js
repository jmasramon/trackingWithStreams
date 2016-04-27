/* jshint esversion:6 */

import { Observable as $ } from 'rx';
import { div, br, label, input, h } from '@cycle/dom'; // h to generate html
import { Input } from './helpers';

const STREAM_SERVER_URL = 'http://localhost:1337/toggle'

export default ({ DOM }) => {
	// let height$ = Input(DOM.select('#Height'))
	// 	.startWith('177'),
	// 	weight$ = Input(DOM.select('#Weight'))
	// 	.startWith('62');

	// let bmi$ = $.combineLatest(
	// 	height$, weight$,
	// 	(h, w) => (w / (h / 100) ** 2).toFixed(1)
	// );

	// return {
	// 	DOM: $.combineLatest(height$, weight$, bmi$, (h, w, bmi) =>
	// 		div('.p2.measure', [
	// 			label({ htmlFor: 'Height' }, 'Height: '),
	// 			input('#Height', { value: h }),
	// 			br(),
	// 			label({ htmlFor: 'Weight' }, 'Weight: '),
	// 			input('#Weight', { value: w }),
	// 			br(),
	// 			'BMI: ' + bmi
	// 		])
	// 	)
	// };
	
	const toggled$ = DOM.select('input').events('click')
		.map(event => event.target.checked)
		.startWith(false);

	const searchRequest$ = DOM.select('.input').events('click')
		.map(event => STREAM_SERVER_URL + encodeURI(q))
		.startWith(false);

	return {
		DOM: toggled$.map(toggled => 
			h('div', [
				h('input', {type: 'checkbox'}),
				'Toggle me',
				h('p', `${toggled ? 'On': 'Off'}`)
				])
			),
		push: toggled$
	};

};



