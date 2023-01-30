import React from "react";
import {ToastAndroid} from "react-native";
import {getWords} from "./DataHandler";

export const changeItem = (key, text, description, priority, date, duration, todos, setItemOverviewVisible, setValue) => {
    const close = async () => {
        setItemOverviewVisible(false);
    }
    close().finally(async () => {
        const change = async () => {
            todos.forEach((item) => {
                if (item.key === key) {
                    item.text = removeEmojis(text);
                    item.description = description;
                    item.priority = priority;
                    item.date = date;
                    item.duration = duration;
                }
            });
        }
        change().finally(async () => {
            setValue(new Date().getTime());
        });
    });
};


export const addNewTodo = (text, description, priority, date, duration, setTodos, language, setText) => {
    text = removeEmojis(text).trim()
    if (text.length >= 3) {

        setTodos(prevTodos => {
            return [{key: new Date().getTime(), text: text, description: description, priority: priority, date: date, duration: duration}, ...prevTodos];
        });
        changeText('', setText);
    } else {
        ToastAndroid.show(getWords(language).alert, ToastAndroid.LONG);
    }
};

//Used for import
export const addExistingTodo = (item, setTodos) => {
    setTodos(prevTodos => {
        return [item, ...prevTodos];
    });
};

export const finishTodo = (item, setTodos, setDone, setItemOverviewVisible) => {
    setItemOverviewVisible(false);
    addDone(item, setDone);
    setTodos(prevTodos => {
        return prevTodos.filter(todos => todos.key !== item.key);
    });
};

export const deleteTodo = (key, setTodos, setItemOverviewVisible) => {
    const close = async () => {
        setItemOverviewVisible(false);
    }
    close().finally(async () => {
        setTodos(prevTodos => {
            return prevTodos.filter(todos => todos.key !== key);
        })
    })
};


export const addDone = (item, setDone) => {
    setDone((prevDone) => {
        return [item, ...prevDone];
    });
};

export const deleteDone = (key, setDone, setItemOverviewVisible) => {
    const close = async () => {
        setItemOverviewVisible(false);
    }
    close().finally(async () => {
        setDone(prevDone => {
            return prevDone.filter(done => done.key !== key);
        });
    })
};


export const isToDo = (item, todos) => {
    return todos.includes(item);
}


export const changeText = (text, setText) => {
    setText(removeEmojis(text));
};


export const removeEmojis = (text) => {
    const regex = /[^\p{L}\p{N}\p{P}\p{Z}{\^\$/€∆@#€_&-+()/*"':;!?,.~`|•√π÷×¶∆£¥$¢^°={}%©®™✓<>}\n]/gu
    return text.replace(regex, '')
}

export const getPriorityColor = (item) => {
    if (item.priority === 1) {
        return 'rgba(255, 255, 15, 0.737)';
    } else if (item.priority === 2) {
        return 'rgba(255, 43, 43, 0.737)';
    } else {
        return 'rgba(77, 255, 43, 0.737)';
    }
}

export const getNonTransparentPriorityColor = (item) => {
    if (item.priority === 1) {
        return '#FFFF0F';
    } else if (item.priority === 2) {
        return '#FF2B2B';
    } else {
        return '#4DFF2B';
    }
}