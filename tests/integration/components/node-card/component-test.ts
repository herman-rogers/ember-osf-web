import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | node-card', hooks => {
    setupRenderingTest(hooks);

    test('it renders', async function(assert) {
        this.set('contributors', []);
        this.set('node', { queryHasMany: () => [], hasMany: () => ({ value: () => [] }), get: () => 'it\'s a date' });
        this.set('delete', () => []);
        await render(hbs`{{node-card contributors=contributors node=node delete=delete}}`);

        assert.ok((this.element.textContent as string).trim());
    });
});
