import { Selector } from 'testcafe';
import SPPage from '../helpers/sp/page/page';
import { background, configLayout } from '../helpers/sp/page/section/layouts';
import { msalAuth } from '../roles/auth/msal';
import Config from '../config';

const PAGE_URL = '/teams/canadiancloudsummit22';

fixture
    .disablePageReloads('SharePoint Page Management')
    .page(new URL(PAGE_URL, Config.get().var('sp_baseurl')).toString());

test('Should navigate to the SharePoint Site Collection', async t => {
    await t.navigateTo(new URL(PAGE_URL, Config.get().var('sp_baseurl')).toString());
}).before(async t => {
    await t.useRole(msalAuth)
});

test('Should add Web Part to the SharePoint page', async t => {
    await SPPage.edit();
    await SPPage.addSection(0, 'OneColumn');
    await SPPage.addWebPart(0, 'HelloWorld');
    await SPPage.saveAsDraft();

    const wpCounter = Selector('div[data-test-id=helloWorld-wp]').count;
    await t.expect(wpCounter).eql(1);
});

test('Should expand the description area', async t => {
    const wpDesc = Selector('div[data-test-id=helloWorld-wp-desc]');
    await t
        .click(
            Selector('button')
                .withAttribute('data-test-id', 'helloWorld-wp-button')
        )
        .wait(1000)
        .expect(wpDesc.getStyleProperty('height')).eql('150px');
});

test('Should collapse the description area', async t => {
    const wpDesc = Selector('div[data-test-id=helloWorld-wp-desc]');
    await t
        .click(
            Selector('button')
                .withAttribute('data-test-id', 'helloWorld-wp-button')
        )
        .expect(wpDesc.getStyleProperty('height')).eql('0px');
});

test('Should edit description content', async t => {
    const value: string = 'Welcome to the Canadian Cloud Summit 2022';
    const wpDesc = Selector('div[data-test-id=helloWorld-wp-desc]');

    await SPPage.edit();
    await SPPage.editWebPart(0);

    await t
        .click(
            Selector('button')
                .withAttribute('data-test-id', 'helloWorld-wp-button')
        );

    await t
        .typeText(
            Selector('div')
                .withAttribute('data-automation-id', 'propertyPanePageContent')
                .find('input').nth(0),
                value,
            { replace: true }
        )
        .expect(wpDesc.child('p').nth(0).textContent).eql(value);
    await SPPage.saveAsDraft();
});

test('Discard Page Changes', async t => {
    await SPPage.edit();
    await SPPage.removeSection(0);
    await SPPage.publish();
});
