import React from 'react';
import Settings from './SignUp';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Settings />, div);
	ReactDOM.unmountComponentAtNode(div);
});
