import React from 'react';
import { shallow } from 'enzyme';
import { FormDevis } from './FormDevis';

describe('FormDevis', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<FormDevis />);
    expect(wrapper).toMatchSnapshot();
  });
});
