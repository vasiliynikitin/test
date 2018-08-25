import React from 'react';
import { WelcomePage } from './WelcomePage';
import { shallow } from 'enzyme';

describe('Страница welcome page состоит из:', () => {
    const login = '<Login>';
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<WelcomePage login={login} />);
    });

    it(`приветсвия пользователя, "Welcome, ${login}!"`, () => {
        expect(wrapper.find('.welcome').text()).toEqual(`Welcome, ${login}!`);
    });
    it('кнопки "Logout"', () => {
        expect(wrapper.find('.button button').prop('disabled')).toEqual(false);
        expect(wrapper.find('.button button').text()).toEqual('Logout');
        expect(wrapper.find('.button button').prop('onClick')).toBeDefined();
    });
});