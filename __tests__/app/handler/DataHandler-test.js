
import 'react-native';
import React from 'react';
import {saveData, getWords, getData, saveItemData, deleteItemData, clear, getItemData} from '../../../app/handler/DataHandler';
import {de, en, fr} from '../../../app/constants/Languages';



//Write test for components in DataHandler
describe('DataHandler', () => {
  it('should save data', () => {
    saveData('test', 'test');
    expect(getData('test')).toEqual('test');
  });

  it('should save item data', () => {
    saveItemData({key: 1234, name: 'Test', priority: 1});
    expect(getItemData(1234)).toEqual({});
  });

  it('should delete item data', () => {
    deleteItemData('test', 'test');
    expect(getItemData('test', 'test')).toEqual(null);
  });

  it('should clear data', () => {
    clear();
    expect(getData('test')).toEqual(null);
  });
  it('should get words', () => {
    expect(getWords('de')).toEqual(de);
    expect(getWords('en')).toEqual(en);
    expect(getWords('fr')).toEqual(fr);
  });
});