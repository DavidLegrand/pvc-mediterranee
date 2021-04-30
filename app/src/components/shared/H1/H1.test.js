import React from 'react';
import { shallow } from 'enzyme';
import H1 from './H1';

describe('H1', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<H1 />);
    expect(wrapper).toMatchSnapshot();
  });
});
