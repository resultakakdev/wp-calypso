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
import paladinController from './controller';
import config from 'config';
import { makeLayout, render as clientRender } from 'controller';

export default function() {
	if ( config.isEnabled( 'paladin' ) ) {
		page( '/paladin', controller.siteSelection, controller.sites, makeLayout, clientRender );
		page(
			'/paladin/:domain',
			controller.siteSelection,
			controller.navigation,
			paladinController.activate,
			makeLayout,
			clientRender
		);
	}
}
