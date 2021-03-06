/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * Internal dependencies
 */
import QueryLabelSettings from 'woocommerce/woocommerce-services/components/query-label-settings';
import QueryPackages from 'woocommerce/woocommerce-services/components/query-packages';
import { fetchLabelsData } from 'woocommerce/woocommerce-services/state/shipping-label/actions';
import { isLoaded, isFetching, isError } from 'woocommerce/woocommerce-services/state/shipping-label/selectors';

class QueryLabels extends Component {
	fetch() {
		const { orderId, siteId } = this.props;
		this.props.fetchLabelsData( orderId, siteId );
	}

	componentWillMount() {
		const { loaded, fetching, error } = this.props;
		if ( ! loaded && ! fetching && ! error ) {
			this.fetch();
		}
	}

	componentWillReceiveProps( props ) {
		const { loaded, fetching, error } = props;
		if ( ! loaded && ! fetching && ! error ) {
			this.fetch();
		}
	}

	render() {
		const { siteId } = this.props;

		return (
			<div>
				<QueryLabelSettings siteId={ siteId } />
				<QueryPackages siteId={ siteId } />
			</div>
		);
	}
}

QueryLabels.propTypes = {
	siteId: PropTypes.number.isRequired,
	orderId: PropTypes.number.isRequired,
};

export default connect(
	( state, { orderId } ) => ( {
		loaded: isLoaded( state, orderId ),
		fetching: isFetching( state, orderId ),
		error: isError( state, orderId ),
	} ),
	( dispatch ) => bindActionCreators( {
		fetchLabelsData,
	}, dispatch )
)( QueryLabels );
