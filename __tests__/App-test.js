/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const setDarkMode = jest.fn();

describe('App', () => {
    const instance = new App();
    it('change dark mode', () => {
        instance.changeMode(setDarkMode())
        expect(setDarkMode()).toBeCalledTimes(1)
        expect(setDarkMode()).toBeCalledWith(prevDarkMode => !prevDarkMode)
    });
});


