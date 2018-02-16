import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import COMPONENT_NAME from './COMPONENT_NAME';

const mockFn = jest.fn();

describe('COMPONENT_NAME Component', () => {
  xit('tests something', () => {
    const wrapper = shallow(
      <COMPONENT_NAME
PROP_SPEC_TYPES
      />,
    ); ///

    expect(true).toEqual(true);
    const element = wrapper.find('.a-class');
  });
});

