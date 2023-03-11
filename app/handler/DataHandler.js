import React, {useState} from "react";
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
        const doneValue = storage.getString(doneKey);
        const darkModeValue = storage.getString(darkModeKey);
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

export const getItemData = (key) => {
    if(storage.contains(key + '')) {
        console.log(JSON.parse(storage.getString(key + '')))
        return JSON.parse(storage.getString(key + ''));
    }
}

export const saveItemData = (item) => {
    storage.set(item.key + '', JSON.stringify(item))
}

export const clear = () => {
    storage.clearAll();
}

export const deleteItemData = (key) => {
    storage.delete(key + '');
}


export const convertDataFormat = async (setTodos, setDone, setDarkMode, setAmoled, setLanguage) => {
    const todosValue = JSON.parse(storage.getString(todosKey));
    const doneValue = JSON.parse(storage.getString(doneKey));
    const darkModeValue = JSON.parse(storage.getString(darkModeKey));
    const amoledValue = JSON.parse(storage.getString(amoledKey));
    const languageValue = JSON.parse(storage.getString(languageKey));

    const [tempTodos, setTempTodos] = useState([]);
    const [tempDone, setTempDone] = useState([]);

    await todosValue.forEach((item) => {
        saveItemData({key: item.key, description: item.description, date: item.date, duration: item.duration})
        setTempTodos(prevTodos => {
            return [{key: item.key, name: item.text, priority: item.priority}, ...prevTodos]
        })
    })

    await doneValue.forEach((item) => {
        saveItemData({key: item.key, description: item.description, date: item.date, duration: item.duration})
        setTempDone(prevDone => {
            return [{key: item.key, name: item.text, priority: item.priority}, ...prevDone]
        })
    })

    await saveData(tempTodos, tempDone, darkModeValue, amoledValue, languageValue)
    await getData(setTodos, setDone, setDarkMode, setAmoled, setLanguage)
}

export const getWords = (language) => {
    if(language === 'de'){
        return de;
    } else if(language === 'en'){
        return en;
    } else if(language === 'fr'){
        return fr;
    }
}