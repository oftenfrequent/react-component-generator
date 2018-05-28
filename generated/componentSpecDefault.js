import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import { COMPONENT_NAME } from './COMPONENT_NAME';

const mockFn = jest.fn();

describe('COMPONENT_NAME Component', () => {
  xit('tests something', () => {
    const wrapper = shallow(
      <COMPONENT_NAME
PROP_SPEC_TYPES
      />,
    );

    expect(true).toEqual(true);
    // check for element by class
    const element = wrapper.find('.a-class');
    expect(element.length).toEqual(0);
    // get text
    const text = element.text();
    const secondElement = element.at(1).text();
    // check state
    wrapper.setState({ foo: 'bar' });
    expect(wrapper.state().foo).toEqual('bar');
    // check props
    wrapper.setProps({ foo: 'bar' });
    expect(wrapper.prop('foo')).toEqual('bar');
    // check / change state or props
    wrapper.setProps({ name: 'bar' });
    wrapper.setState({ name: 'bar' });
    // call internal component fn
    wrapper.instance()._method();
    // check if mock fn has been called
    expect(mockFn.mock.calls.length).toEqual(1);
    // check if first instance of mock fn call has the first argument of
    expect(mockFn.mock.calls[0][0]).toEqual(0.5);
  });
});

