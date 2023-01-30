import React from "react";
import {MMKV} from "react-native-mmkv";
import {de, en, fr} from "../constants/Languages";

const storage = new MMKV();
const todosKey = '@todos';
const darkModeKey = '@darkMode';
const doneKey = '@done';
const amoledKey = '@amoled';
const languageKey = '@language';


export const saveData = (todos, done, darkMode, amoled, language) => {
    storage.set(todosKey, JSON.stringify(todos));
    storage.set(doneKey, JSON.stringify(done));
    storage.set(darkModeKey, JSON.stringify(darkMode));
    storage.set(amoledKey, JSON.stringify(amoled));
    storage.set(languageKey, JSON.stringify(language));
};

export const getData = (setTodos, setDone, setDarkMode, setAmoled, setLanguage) => {
    try {
        const todosValue = storage.getString(todosKey);
        const darkModeValue = storage.getString(darkModeKey);
        const doneValue = storage.getString(doneKey);
        const amoledValue = storage.getString(amoledKey)
        const languageValue = storage.getString(languageKey)
        if (todosValue !== null) {
            setTodos(JSON.parse(todosValue));
        }
        if(doneValue !== null){
            setDone(JSON.parse(doneValue));
        }
        if (darkModeValue !== null) {
            setDarkMode(JSON.parse(darkModeValue));
        }
        if(amoledValue !== null){
            setAmoled(JSON.parse(amoledValue));
        }
        if(languageValue !== null){
            setLanguage(JSON.parse(languageValue));
        }
    } catch(e){
        console.log('Data access error. Maybe it´s the first time the app is open on this device.');
    }
};


export const getWords = (language) => {
    if(language === 'de'){
        return de;
    } else if(language === 'en'){
        return en;
    } else if(language === 'fr'){
        return fr;
    }
}