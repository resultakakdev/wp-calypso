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
import adsController from './controller';
import { makeLayout, render as clientRender } from 'controller';

export default function() {
	page( '/ads', controller.siteSelection, controller.sites, makeLayout, clientRender );
	page( '/ads/:site_id', adsController.redirect, makeLayout, clientRender );
	page(
		'/ads/:section/:site_id',
		controller.siteSelection,
		controller.navigation,
		adsController.layout,
		makeLayout,
		clientRender
	);
}
