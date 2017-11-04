/** @format */
/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import {
	blogListing,
	feedDiscovery,
	feedListing,
	following,
	incompleteUrlRedirects,
	initAbTests,
	legacyRedirects,
	preloadReaderBundle,
	prettyRedirects,
	readA8C,
	sidebar,
	updateLastRoute,
} from './controller';
import config from 'config';
import { makeLayout, render as clientRender } from 'controller';

function forceTeamA8C( context, next ) {
	context.params.team = 'a8c';
	next();
}

export default function() {
	if ( config.isEnabled( 'reader' ) ) {
		page(
			'/',
			preloadReaderBundle,
			initAbTests,
			updateLastRoute,
			sidebar,
			following,
			makeLayout,
			clientRender
		);

		// Old and incomplete paths that should be redirected to /
		page( '/read/following', '/', makeLayout, clientRender );
		page( '/read', '/', makeLayout, clientRender );
		page( '/read/blogs', '/', makeLayout, clientRender );
		page( '/read/feeds', '/', makeLayout, clientRender );
		page( '/read/blog', '/', makeLayout, clientRender );
		page( '/read/post', '/', makeLayout, clientRender );
		page( '/read/feed', '/', makeLayout, clientRender );

		// Feed stream
		page( '/read/*', preloadReaderBundle, initAbTests, makeLayout, clientRender );
		page( '/read/blog/feed/:feed_id', legacyRedirects, makeLayout, clientRender );
		page( '/read/feeds/:feed_id/posts', incompleteUrlRedirects, makeLayout, clientRender );
		page(
			'/read/feeds/:feed_id',
			updateLastRoute,
			prettyRedirects,
			sidebar,
			feedDiscovery,
			feedListing,
			makeLayout,
			clientRender
		);

		// Blog stream
		page( '/read/blog/id/:blog_id', legacyRedirects, makeLayout, clientRender );
		page( '/read/blogs/:blog_id/posts', incompleteUrlRedirects, makeLayout, clientRender );
		page(
			'/read/blogs/:blog_id',
			updateLastRoute,
			prettyRedirects,
			sidebar,
			blogListing,
			makeLayout,
			clientRender
		);

		// Old full post view
		page( '/read/post/feed/:feed_id/:post_id', legacyRedirects, makeLayout, clientRender );
		page( '/read/post/id/:blog_id/:post_id', legacyRedirects, makeLayout, clientRender );
	}

	// Automattic Employee Posts
	page( '/read/a8c', updateLastRoute, sidebar, forceTeamA8C, readA8C, makeLayout, clientRender );
}
