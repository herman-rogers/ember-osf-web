import EmberRouter from '@ember/routing/router';
import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import config from 'ember-get-config';

const Router = EmberRouter.extend({
    session: service('session'),
    metrics: service('metrics'),

    location: config.locationType,
    rootURL: config.rootURL,

    didTransition() {
        this._super(...arguments);
        this._trackPage();
    },

    _trackPage() {
        scheduleOnce('afterRender', this, () => {
            const page = this.get('url');
            const title = this.getWithDefault('currentRouteName', 'unknown');
            const authenticated = this.get('session.isAuthenticated') ? 'Logged in' : 'Logged out';
            const isPublic = 'true'; // This will have to be changed when we have private things
            const metrics = this.get('metrics');

            metrics.trackPage({
                page, title, dimension1: authenticated, dimension2: 'undefined', dimension3: isPublic,
            });
        });
    },
});

/* eslint-disable array-callback-return */

Router.map(function() {
    this.route('dashboard', { path: '/' });
    this.route('quickfiles', { path: '/quickfiles' });
    this.route('quickfiles', { path: '/me/quickfiles' });
    this.route('user-quickfiles', { path: '/:user_id/quickfiles' });
    this.route('file-detail', { path: '/:file_id' });
    this.route('support', { path: '/support' });
});

/* eslint-enable array-callback-return */

export default Router;
