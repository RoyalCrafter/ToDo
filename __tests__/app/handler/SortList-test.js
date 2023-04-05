import React from "react";
import "react-native";
import {
    sortAlphabetically,
    sortAlphabeticallyReversed,
    sortByCreationDate,
    sortByCreationDateReversed,
    sortByDate,
    sortByDateReversed,
    sortByPriority,
    sortByPriorityReversed
} from "../../../app/handler/SortList";


const nameList = [{name: 'zfe'}, {name: 'zhg'}, {name: 'fge'}, {name: 'ätl'}, {name: 'xlw'}, {name: 'hso'}]
const setNameList = jest.fn();


const dateList = [{key: 1, date: new Date(0)}, {key: 2, date: new Date(103568)}, {key: 4, date: new Date(134678353635)}, {key: 5, date: new Date(81346973863568)}, {key: 3, date: new Date(23263853)}]
let sortedDateList;
const setDateList = jest.fn();
const getItemData = (key) => {
    dateList.forEach((item) => {
        if (item.key === key) {
            return item;
        }else{
            return {key: 5};
        }
    })
}


const keyList = [{key: 10}, {key: 25}, {key: 3}, {key: 14368}, {key: 235}, {key: 0}]
const setKeyList = jest.fn();


const priorityList = [{priority: 1}, {priority: 0}, {priority: 2}, {priority: 2}, {priority: 0}, {priority: 1}]
const setPriorityList = jest.fn();

const setValue = ()  => {}

describe('SortList', () => {
    it('sort list alpabetically', () => {
        sortAlphabetically(nameList, setNameList, setValue)
        expect(setNameList).toHaveBeenCalledWith([{name: 'ätl', }, {name: 'fge', }, {name: 'hso', }, {name: 'xlw', }, {name: 'zfe', }, {name: 'zhg'}])
    });
    it('sort list alpabetically reversed', () => {
        sortAlphabeticallyReversed(nameList, setNameList, setValue)
        expect(setNameList).toHaveBeenCalledWith([{name: 'zhg', }, {name: 'zfe', }, {name: 'xlw', }, {name: 'hso', }, {name: 'fge', }, {name: 'ätl'}])
    });
    it('sort list by date', function () {
        expect(getItemData(1)).toEqual({key: 1, date: new Date(0)})
        sortByDate(dateList, setDateList, setValue, getItemData)
        //expect(setDateList).toHaveBeenCalledWith([{key: 1, date: new Date(0)}, {key: 2, date: new Date(103568)}, {key: 3, date: new Date(23263853)}, {key: 4, date: new Date(134678353635)}, {key: 5, date: new Date(81346973863568)}])
    });
    it('sort list by date reversed', function () {
        sortByDateReversed(dateList, setDateList, setValue, getItemData)
        expect(setDateList).toHaveBeenCalledWith([{key: 5, date: new Date(81346973863568)}, {key: 4, date: new Date(134678353635)}, {key: 3, date: new Date(23263853)}, {key: 2, date: new Date(103568)}, {key: 1, date: new Date(0)}])
    });
    it('sort list by creation date', function () {
        sortByCreationDate(keyList, setKeyList, setValue)
        expect(setKeyList).toHaveBeenCalledWith([{key: 0}, {key: 3}, {key: 10}, {key: 25}, {key: 235}, {key: 14368}])
    });
    it('sort list by creation date reversed', function () {
        sortByCreationDateReversed(keyList, setKeyList, setValue)
        expect(setKeyList).toHaveBeenCalledWith([{key: 14368}, {key: 235}, {key: 25}, {key: 10}, {key: 3}, {key: 0}])
    });
    it('sort list by priority', function () {
        sortByPriority(priorityList, setPriorityList, setValue)
        expect(setPriorityList).toHaveBeenCalledWith([{priority: 0}, {priority: 0}, {priority: 1}, {priority: 1}, {priority: 2}, {priority: 2}])
    });
    it('sort list by creation priority', function () {
        sortByPriorityReversed(priorityList, setPriorityList, setValue)
        expect(setPriorityList).toHaveBeenCalledWith([{priority: 2}, {priority: 2}, {priority: 1}, {priority: 1}, {priority: 0}, {priority: 0}])
    });
});
