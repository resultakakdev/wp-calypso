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
import config from 'config';
import pluginsController from './controller';
import { recordTracksEvent } from 'state/analytics/actions';
import { getSelectedSite } from 'state/ui/selectors';
import { makeLayout, render as clientRender } from 'controller';

const ifSimpleSiteThenRedirectTo = path => ( context, next ) => {
	const site = getSelectedSite( context.store.getState() );

	if ( site && ! site.jetpack ) {
		page.redirect( `${ path }/${ site.slug }` );
	}

	next();
};

export default function() {
	if ( config.isEnabled( 'manage/plugins/setup' ) ) {
		page(
			'/plugins/setup',
			controller.siteSelection,
			pluginsController.setupPlugins,
			makeLayout,
			clientRender
		);

		page(
			'/plugins/setup/:site',
			controller.siteSelection,
			pluginsController.setupPlugins,
			makeLayout,
			clientRender
		);
	}

	if ( config.isEnabled( 'manage/plugins' ) ) {
		page(
			'/plugins/wpcom-masterbar-redirect/:site',
			context => {
				context.store.dispatch( recordTracksEvent( 'calypso_wpcom_masterbar_plugins_view_click' ) );
				page.redirect( `/plugins/${ context.params.site }` );
			},
			makeLayout,
			clientRender
		);

		page(
			'/plugins/browse/wpcom-masterbar-redirect/:site',
			context => {
				context.store.dispatch( recordTracksEvent( 'calypso_wpcom_masterbar_plugins_add_click' ) );
				page.redirect( `/plugins/browse/${ context.params.site }` );
			},
			makeLayout,
			clientRender
		);

		page(
			'/plugins/manage/wpcom-masterbar-redirect/:site',
			context => {
				context.store.dispatch(
					recordTracksEvent( 'calypso_wpcom_masterbar_plugins_manage_click' )
				);
				page.redirect( `/plugins/manage/${ context.params.site }` );
			},
			makeLayout,
			clientRender
		);

		page(
			'/plugins/browse/:category/:site',
			context => {
				const { category, site } = context.params;
				page.redirect( `/plugins/${ category }/${ site }` );
			},
			makeLayout,
			clientRender
		);

		page(
			'/plugins/browse/:siteOrCategory?',
			context => {
				const { siteOrCategory } = context.params;
				page.redirect( '/plugins' + ( siteOrCategory ? '/' + siteOrCategory : '' ) );
			},
			makeLayout,
			clientRender
		);

		if ( config.isEnabled( 'manage/plugins/upload' ) ) {
			page( '/plugins/upload', controller.sites, makeLayout, clientRender );
			page(
				'/plugins/upload/:site_id',
				controller.siteSelection,
				controller.navigation,
				pluginsController.upload,
				makeLayout,
				clientRender
			);
		}

		page(
			'/plugins',
			controller.siteSelection,
			controller.navigation,
			pluginsController.browsePlugins,
			makeLayout,
			clientRender
		);

		page(
			'/plugins/manage/:site?',
			controller.siteSelection,
			controller.navigation,
			ifSimpleSiteThenRedirectTo( '/plugins' ),
			pluginsController.plugins.bind( null, 'all' ),
			controller.sites,
			makeLayout,
			clientRender
		);

		[ 'active', 'inactive', 'updates' ].forEach( filter =>
			page(
				`/plugins/${ filter }/:site_id?`,
				controller.siteSelection,
				controller.navigation,
				pluginsController.jetpackCanUpdate.bind( null, filter ),
				pluginsController.plugins.bind( null, filter ),
				controller.sites,
				makeLayout,
				clientRender
			)
		);

		page(
			'/plugins/:plugin/:site_id?',
			controller.siteSelection,
			controller.navigation,
			pluginsController.maybeBrowsePlugins,
			pluginsController.plugin,
			makeLayout,
			clientRender
		);

		page(
			'/plugins/:plugin/eligibility/:site_id',
			controller.siteSelection,
			controller.navigation,
			pluginsController.eligibility,
			makeLayout,
			clientRender
		);

		page.exit( '/plugins/*', ( context, next ) => {
			if ( 0 !== page.current.indexOf( '/plugins/' ) ) {
				pluginsController.resetHistory();
			}

			next();
		} );
	}
}
