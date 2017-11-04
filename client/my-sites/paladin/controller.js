/**
 * External Dependencies
 *
 * @format
 */

import React from 'react';
import PaladinComponent from './main';

export default {
	activate: function( context, next ) {
		context.primary = React.createElement( PaladinComponent );
		next();
	},
};
