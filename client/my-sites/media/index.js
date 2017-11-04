/**
 * External dependencies
 *
 * @format
 */

import page from 'page';

/**
 * Internal dependencies
 */
import controller from 'my-sites/controller';
import mediaController from './controller';
import config from 'config';
import { makeLayout, render as clientRender } from 'controller';

export default function() {
	if ( config.isEnabled( 'manage/media' ) ) {
		page( '/media', controller.siteSelection, controller.sites, makeLayout, clientRender );
		page(
			'/media/:filter?/:domain',
			controller.siteSelection,
			controller.navigation,
			mediaController.media,
			makeLayout,
			clientRender
		);
	}
}
