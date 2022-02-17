import { msalAuth } from '../roles/auth/msal';
import Config from '../config';

const PAGE_URL = '/teams/canadiancloudsummit22';

fixture
    .disablePageReloads('SharePoint MSAL connexion')
    .page(new URL(PAGE_URL, Config.get().var('sp_baseurl')).toString());

test('Navigate to the SharePoint Site Collection', async t => {
    await t.navigateTo(new URL(PAGE_URL, Config.get().var('sp_baseurl')).toString());
}).before(async t => {
    await t.useRole(msalAuth)
});
