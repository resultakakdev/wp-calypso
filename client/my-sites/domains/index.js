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
import domainsController from './controller';
import domainManagementController from './domain-management/controller';
import SiftScience from 'lib/siftscience';
import config from 'config';
import paths from './paths';
import { makeLayout, render as clientRender } from 'controller';

function registerMultiPage( { paths, handlers } ) {
	paths.forEach( path => page( path, ...handlers, makeLayout, clientRender ) );
}

function getCommonHandlers(
	{ noSitePath = paths.domainManagementRoot(), warnIfJetpack = true } = {}
) {
	const handlers = [ controller.siteSelection, controller.navigation ];

	if ( noSitePath ) {
		handlers.push( domainsController.redirectIfNoSite( noSitePath ) );
	}

	if ( warnIfJetpack ) {
		handlers.push( controller.jetPackWarning );
	}

	return handlers;
}

export default function() {
	SiftScience.recordUser();

	page(
		paths.domainManagementEmail(),
		controller.siteSelection,
		controller.sites,
		makeLayout,
		clientRender
	);

	registerMultiPage( {
		paths: [
			paths.domainManagementEmail( ':site', ':domain' ),
			paths.domainManagementEmail( ':site' ),
		],
		handlers: [
			...getCommonHandlers( { noSitePath: paths.domainManagementEmail() } ),
			domainManagementController.domainManagementEmail,
		],
	} );

	registerMultiPage( {
		paths: [
			paths.domainManagementAddGoogleApps( ':site', ':domain' ),
			paths.domainManagementAddGoogleApps( ':site' ),
		],
		handlers: [ ...getCommonHandlers(), domainManagementController.domainManagementAddGoogleApps ],
	} );

	page(
		paths.domainManagementEmailForwarding( ':site', ':domain' ),
		...getCommonHandlers(),
		domainManagementController.domainManagementEmailForwarding,
		makeLayout,
		clientRender
	);

	page(
		paths.domainManagementRedirectSettings( ':site', ':domain' ),
		...getCommonHandlers(),
		domainManagementController.domainManagementRedirectSettings,
		makeLayout,
		clientRender
	);

	page(
		paths.domainManagementContactsPrivacy( ':site', ':domain' ),
		...getCommonHandlers(),
		domainManagementController.domainManagementContactsPrivacy,
		makeLayout,
		clientRender
	);

	page(
		paths.domainManagementEditContactInfo( ':site', ':domain' ),
		...getCommonHandlers(),
		domainManagementController.domainManagementEditContactInfo,
		makeLayout,
		clientRender
	);

	page(
		paths.domainManagementDns( ':site', ':domain' ),
		...getCommonHandlers(),
		domainManagementController.domainManagementDns,
		makeLayout,
		clientRender
	);

	page(
		paths.domainManagementNameServers( ':site', ':domain' ),
		...getCommonHandlers(),
		domainManagementController.domainManagementNameServers,
		makeLayout,
		clientRender
	);

	page(
		paths.domainManagementTransfer( ':site', ':domain' ),
		...getCommonHandlers(),
		domainManagementController.domainManagementTransfer,
		makeLayout,
		clientRender
	);

	page(
		paths.domainManagementTransferOut( ':site', ':domain' ),
		...getCommonHandlers(),
		domainManagementController.domainManagementTransferOut,
		makeLayout,
		clientRender
	);

	page(
		paths.domainManagementTransferToAnotherUser( ':site', ':domain' ),
		...getCommonHandlers(),
		domainManagementController.domainManagementTransferToOtherUser,
		makeLayout,
		clientRender
	);

	page(
		paths.domainManagementTransferToOtherSite( ':site', ':domain' ),
		...getCommonHandlers(),
		domainManagementController.domainManagementTransferToOtherSite,
		makeLayout,
		clientRender
	);

	page(
		paths.domainManagementRoot(),
		controller.siteSelection,
		controller.sites,
		makeLayout,
		clientRender
	);

	page(
		paths.domainManagementList( ':site' ),
		...getCommonHandlers(),
		domainManagementController.domainManagementList,
		makeLayout,
		clientRender
	);

	page(
		paths.domainManagementEdit( ':site', ':domain' ),
		...getCommonHandlers(),
		domainManagementController.domainManagementEdit,
		makeLayout,
		clientRender
	);

	page(
		paths.domainManagementPrivacyProtection( ':site', ':domain' ),
		...getCommonHandlers( { warnIfJetpack: false } ),
		domainManagementController.domainManagementPrivacyProtection,
		makeLayout,
		clientRender
	);

	page(
		paths.domainManagementPrimaryDomain( ':site', ':domain' ),
		...getCommonHandlers(),
		domainManagementController.domainManagementPrimaryDomain,
		makeLayout,
		clientRender
	);

	if ( config.isEnabled( 'upgrades/domain-search' ) ) {
		page(
			'/domains/add',
			controller.siteSelection,
			domainsController.domainsAddHeader,
			domainsController.redirectToAddMappingIfVipSite(),
			controller.jetPackWarning,
			controller.sites,
			makeLayout,
			clientRender
		);

		page(
			'/domains/add/mapping',
			controller.siteSelection,
			domainsController.domainsAddHeader,
			controller.jetPackWarning,
			controller.sites,
			makeLayout,
			clientRender
		);

		page(
			'/domains/add/transfer',
			controller.siteSelection,
			domainsController.domainsAddHeader,
			controller.jetPackWarning,
			controller.sites,
			makeLayout,
			clientRender
		);

		page(
			'/domains/add/site-redirect',
			controller.siteSelection,
			domainsController.domainsAddRedirectHeader,
			controller.jetPackWarning,
			controller.sites,
			makeLayout,
			clientRender
		);

		page(
			'/domains/add/:domain',
			controller.siteSelection,
			controller.navigation,
			domainsController.redirectIfNoSite( '/domains/add' ),
			domainsController.redirectToAddMappingIfVipSite(),
			controller.jetPackWarning,
			domainsController.domainSearch,
			makeLayout,
			clientRender
		);

		page(
			'/domains/add/suggestion/:suggestion/:domain',
			controller.siteSelection,
			controller.navigation,
			domainsController.redirectIfNoSite( '/domains/add' ),
			domainsController.redirectToAddMappingIfVipSite(),
			controller.jetPackWarning,
			domainsController.domainSearch,
			makeLayout,
			clientRender
		);

		page(
			'/domains/add/:registerDomain/google-apps/:domain',
			controller.siteSelection,
			controller.navigation,
			domainsController.redirectIfNoSite( '/domains/add' ),
			controller.jetPackWarning,
			domainsController.googleAppsWithRegistration,
			makeLayout,
			clientRender
		);

		page(
			'/domains/add/mapping/:domain',
			controller.siteSelection,
			controller.navigation,
			domainsController.redirectIfNoSite( '/domains/add/mapping' ),
			controller.jetPackWarning,
			domainsController.mapDomain,
			makeLayout,
			clientRender
		);

		page(
			'/domains/add/site-redirect/:domain',
			controller.siteSelection,
			controller.navigation,
			domainsController.redirectIfNoSite( '/domains/add/site-redirect' ),
			controller.jetPackWarning,
			domainsController.siteRedirect,
			makeLayout,
			clientRender
		);

		page(
			'/domains/add/transfer/:domain',
			controller.siteSelection,
			controller.navigation,
			domainsController.redirectIfNoSite( '/domains/add/transfer' ),
			controller.jetPackWarning,
			domainsController.transferDomain,
			makeLayout,
			clientRender
		);
	}

	page( '/domains', controller.siteSelection, controller.sites, makeLayout, clientRender );

	page(
		'/domains/:site',
		controller.siteSelection,
		controller.navigation,
		controller.jetPackWarning,
		domainManagementController.domainManagementIndex,
		makeLayout,
		clientRender
	);
}
