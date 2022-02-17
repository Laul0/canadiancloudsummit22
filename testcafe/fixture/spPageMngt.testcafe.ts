import { Selector } from 'testcafe';
import SPPage from '../helpers/sp/page/page';
import { background, configLayout } from '../helpers/sp/page/section/layouts';
import { msalAuth } from '../roles/auth/msal';
import Config from '../config';

const PAGE_URL = '/teams/canadiancloudsummit22';

fixture
    .disablePageReloads('SharePoint Page Management')
    .page(new URL(PAGE_URL, Config.get().var('sp_baseurl')).toString());

test('Navigate to the SharePoint Site Collection', async t => {
    await t.navigateTo(new URL(PAGE_URL, Config.get().var('sp_baseurl')).toString());
}).before(async t => {
    await t.useRole(msalAuth)
});

test('Edit page', async t => {
    await SPPage.edit();
});

test('Add Section', async t => {
    await SPPage.addSection(0, 'OneColumn');
});

test('Add Web Part Text with \'Hello World\' content', async t => {
    await SPPage.addWebPart(0, 'Text');

    // Type text into text box web part
    const textboxWP = Selector('div').withAttribute('data-automation-id', 'textBox');
    await t.click(textboxWP);
    await t.typeText(textboxWP, 'Hello World ;-) !', { replace: true });
});

test('Add Web Part Divider and open properties panel of it', async t => {
    await SPPage.addWebPart(1, 'Divider');
    await SPPage.editWebPart(1);
});

test('Change Section Layout', async t => {
    await SPPage.editSection(0);
    await SPPage.setSectionLayout(configLayout.TwoColumns);
    await SPPage.setSectionLayout(configLayout.ThreeColumns);
    await SPPage.setSectionLayout(configLayout.OneThirdColumnLeft);
    await SPPage.setSectionLayout(configLayout.OneThirdColumnRight);
    await SPPage.setSectionLayout(configLayout.OneColumn);
});

test('Change Section Background', async t => {
    await SPPage.setSectionBackground(background.neutral);
    await t.wait(1000);
    await SPPage.setSectionBackground(background.soft);
    await t.wait(1000);
    await SPPage.setSectionBackground(background.strong);
    await t.wait(1000);
    await SPPage.setSectionBackground(background.none);
});

test('Remove Web Part \'Text\'', async t => {
    await SPPage.removeWebPart(0);
});

test('Remove Section', async t => {
    await SPPage.removeSection(0);
});

test('Save Page as draft', async t => {
    await SPPage.saveAsDraft();
});

test('Publish/Republish Page', async t => {
    await SPPage.edit();
    await SPPage.publish();
});

test('Discard Page Changes', async t => {
    await SPPage.edit();
    await SPPage.discardChanges();
    //await t.debug();
});
