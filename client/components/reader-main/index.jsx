/**
 * External Dependencies
 *
 * @format
 */

import React from 'react';

/**
 * Internal Dependencies
 */
import Main from 'components/main';
import SyncReaderFollows from 'components/data/sync-reader-follows';

// this exists debounced to avoid a race conditions where a ReaderMain
// during a page transition the new ReaderMain gets mounted before the old one is dismounted.
// and the sequence of events is: add -> add --> remove
let numReaderMains = 0;
const setIsReaderPage = add => {
	if ( add ) {
		document.querySelector( 'body' ).classList.add( 'is-reader-page' );
	} else if ( numReaderMains === 0 ) {
		document.querySelector( 'body' ).classList.remove( 'is-reader-page' );
	}
};

/**
 * A specialization of `Main` that adds a class to the body of the document
 *
 * This class is used by pieces of the Reader Refresh (circa Sept 2016) to indicate they want "editorial" styles.
 * Notably, this overrides the background color of the document and is used as a hook by other parts to override styles.
 */
export default class ReaderMain extends React.Component {
	componentWillMount() {
		numReaderMains++;
		setIsReaderPage( true );
	}

	componentWillUnmount() {
		numReaderMains--;
		setIsReaderPage( false );
	}

	render() {
		const { children, ...props } = this.props;
		return (
			<Main { ...props }>
				<SyncReaderFollows key="syncReaderFollows" />
				{ children }
			</Main>
		);
	}
}
