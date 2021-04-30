import React from 'react';
import { shallow } from 'enzyme';
import Router from './Router';

describe('Router', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Router />);
    expect(wrapper).toMatchSnapshot();
  });
});
