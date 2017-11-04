/**
 * External dependencies
 *
 * @format
 */

import React from 'react';
import TrafficMain from 'my-sites/site-settings/settings-traffic/main';

export default {
	traffic( context, next ) {
		context.primary = React.createElement( TrafficMain );
		next();
	},
};
