import React from 'react';
import { shallow } from 'enzyme';
import { Auth } from './Auth';

describe('Auth', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Auth />);
    expect(wrapper).toMatchSnapshot();
  });
});
