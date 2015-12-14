/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import omit from 'lodash/object/omit';

/**
 * Internal dependencies
 */
import { isActivating, hasActivated, getCurrentTheme } from 'lib/themes/selectors';

/**
 * Passes the activating state of themes to the supplied child component.
 */
const ActivatingThemeData = React.createClass( {

	propTypes: {
		isActivating: React.PropTypes.bool.isRequired,
		hasActivated: React.PropTypes.bool.isRequired,
		currentTheme: React.PropTypes.shape( {
			name: React.PropTypes.string,
			id: React.PropTypes.string
		} ),
		children: React.PropTypes.element.isRequired
	},

	render() {
		return React.cloneElement( this.props.children, omit( this.props, 'children' ) );
	}
} );

export default connect(
	( state, props ) => Object.assign( {},
		props,
		{
			isActivating: isActivating( state ),
			hasActivated: hasActivated( state ),
			currentTheme: getCurrentTheme( state, props.siteId )
		}
	)
)( ActivatingThemeData );
