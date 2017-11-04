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
import pagesController from './controller';
import config from 'config';
import { makeLayout, render as clientRender } from 'controller';

export default function() {
	if ( config.isEnabled( 'manage/pages' ) ) {
		page(
			'/pages/:status?/:domain?',
			controller.siteSelection,
			controller.navigation,
			pagesController.pages,
			makeLayout,
			clientRender
		);
	}
}
