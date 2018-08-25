import React from 'react';
import { shallow } from 'enzyme';
import { LogonPage } from './LogonPage';

describe('Страница logon page состоит из', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<LogonPage />);
    });

    it('поля ввода "Login"', () => {
        expect(wrapper.find('input[name="login"]')).toHaveLength(1);
    });
    it('поля ввода "Password"', () => {
        expect(wrapper.find('input[name="password"]')).toHaveLength(1);
    });
    
    it('кноки "Login"', () => {
        expect(wrapper.find('.button button').text()).toEqual('Login');
        expect(wrapper.find('.button button').prop('onClick')).toBeDefined();
    });
});