import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import Brain from './Brain';

const mockFn = jest.fn();

describe('Brain Component', () => {
  xit('tests something', () => {
    const wrapper = shallow(
      <Brain
        speed={'number'}
        thoughts={'object!'}
        createdAt={'date'}
        notsureofthetype={'undefined'}
      />,
    ); ///

    expect(true).toEqual(true);
    const element = wrapper.find('.a-class');
    expect(element.length).toEqual(0);
    wrapper.setState({ foo: 'bar' });
    expect(wrapper.state().foo).toEqual('bar');
    wrapper.setProps({ foo: 'bar' });
    expect(wrapper.prop('foo')).toEqual('bar');
  });
});

