/// <reference types="jest" />
import 'jsdom-global/register';
// npm install --save-dev --save-exact jsdom jsdom-global

import * as React from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { IHelloWorldProps } from './IHelloWorldProps';
import HelloWorld from './HelloWorld';

describe('Hello World', () => {
    let reactComponent: ReactWrapper<IHelloWorldProps, {}>;

    afterEach(() => {
        reactComponent.unmount();
    });

    it('should root web part element exists', () => {
        reactComponent = mount(React.createElement(
            HelloWorld,
            {
                description: 'Description property value'
            }
          ));
        let cssSelector: string = '.helloWorld';

        const element = reactComponent.find(cssSelector);
        expect(element.length).toBeGreaterThan(0);
    });


    it('should close the description div by default', () => {
        reactComponent = mount(React.createElement(
            HelloWorld,
            {
                description: 'Hello World'
            }
          ));
        let cssSelector: string = '.description';

        const element = reactComponent.find(cssSelector);
        expect(reactComponent.state('collapse')).toEqual(true);
        expect(element.parent().hasClass('close')).toEqual(true);
    });

    it('should open the description div when click on button', () => {
        reactComponent = mount(React.createElement(
            HelloWorld,
            {
                description: 'Hello World'
            }
          ));
        let cssBtnSelector: string = '.button';
        let cssDivSelector: string = '.description';

        const btn = reactComponent.find(cssBtnSelector);
        btn.simulate('click');
        const element = reactComponent.find(cssDivSelector);
        expect(reactComponent.state('collapse')).toEqual(false);
        expect(element.parent().hasClass('open')).toEqual(true);
    });

    it('should close/hide the description div when click twice on button', () => {
        reactComponent = mount(React.createElement(
            HelloWorld,
            {
                description: 'Hello World'
            }
          ));
        let cssBtnSelector: string = '.button';
        let cssDivSelector: string = '.description';

        const btn = reactComponent.find(cssBtnSelector);
        btn.simulate('click');
        let element = reactComponent.find(cssDivSelector);
        expect(reactComponent.state('collapse')).toEqual(false);
        expect(element.parent().hasClass('open')).toEqual(true);

        btn.simulate('click');
        element = reactComponent.find(cssDivSelector); // refresh
        expect(reactComponent.state('collapse')).toEqual(true);
        expect(element.parent().hasClass('close')).toEqual(true);
    });
});