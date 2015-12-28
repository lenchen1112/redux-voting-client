import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import {ConnectionState} from '../../src/components/ConnectionState';

const {renderIntoDocument, findRenderedDOMComponentWithTag} = TestUtils;

describe('ConnectionState', () => {

    it('is not visible when connected', () => {
        const component = renderIntoDocument(<ConnectionState connected={true} />);
        const targetDiv = findRenderedDOMComponentWithTag(component, 'div');

        expect(targetDiv.style.display).to.equal('none');
    });

    it('is visible when not connected', () => {
        const component = renderIntoDocument(<ConnectionState connected={false} />);
        const targetDiv = findRenderedDOMComponentWithTag(component, 'div');

        expect(targetDiv.style.display).to.equal('block');
    });

    it('contains connection state message', () => {
        const component = renderIntoDocument(<ConnectionState connected={false} state="Fail" />);
        const targetDiv = findRenderedDOMComponentWithTag(component, 'div');

        expect(targetDiv.textContent).to.contain('Fail');
    });

});
