import React from "react";
import {ToastAndroid} from "react-native";
import {deleteItemData, getItemData, getWords, saveItemData} from "./DataHandler";
import {onDisplayNotification} from "./NotificationHandler";
import notifee from "@notifee/react-native";

export const changeItem = (todos, key, name, description, priority, date, duration, notificationTimestamp, setItemOverviewVisible, setValue, language) => {

    const close = async () => {
        setItemOverviewVisible(false);
    }
    close().finally(async () => {
        todos.forEach((item) => {
            if (item.key === key) {
                if(item.duration !== 0 && new Date(item.date).getTime() !== 0) {
                    notifee.cancelTriggerNotification(key + '-todo');
                }
                if(notificationTimestamp !== 0) {
                    onDisplayNotification(
                        {
                            key: new Date().getTime(),
                            name: name,
                            priority: priority,
                        },
                        notificationTimestamp,
                        language
                    ).then(r => (''))
                }
                item.name = removeEmojis(name);
                item.priority = priority;
                saveItemData({key: key, description: description, date: date, duration: duration, notificationTimestamp: notificationTimestamp});
            }
        });
    });
};


export const addNewTodo = (name, description, priority, date, duration, notificationTimestamp, setTodos, language, setText) => {
    name = removeEmojis(name).trim()
    if (name.length >= 3) {
        const key = new Date().getTime();
        saveItemData({key: key, description: description, date: date,/* duration: duration, */notificationTimestamp: notificationTimestamp});
        setTodos(prevTodos => {
            return [{key: key, name: name, priority: priority}, ...prevTodos];
        });
        changeText('', setText);

        if(notificationTimestamp !== 0) {
            onDisplayNotification(
                {
                    key: new Date().getTime(),
                    name: name,
                    priority: priority,
                },
                notificationTimestamp,
                language
            ).then(r => (''))
        }

    } else {
        ToastAndroid.show(getWords(language).alert_name_length, ToastAndroid.LONG);
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
    try {
        notifee.cancelTriggerNotification(item.key + '-todo').then(r => ({r}));
    } catch (e) {}
};

export const deleteTodo = (key, setTodos, setItemOverviewVisible) => {
    const close = async () => {
        setItemOverviewVisible(false);
    }
    close().finally(async () => {
        setTodos(prevTodos => {
            return prevTodos.filter(todos => todos.key !== key);
        })
        deleteItemData(key);
    })
    try {
        notifee.cancelTriggerNotification(key + '-todo').then(r => ({r}));
    } catch (e) {}
};


export const restoreToDo = (item, setTodos, setDone, setItemOverviewVisible, language) => {
    setItemOverviewVisible(false);
    addExistingTodo(item, setTodos);
    setDone(prevDone => {
        return prevDone.filter(done => done.key !== item.key);
    });
    if(getItemData(item.key).notificationTimestamp !== 0) {
        onDisplayNotification(
            {
                key: new Date().getTime(),
                name: item.name,
                priority: item.priority,
            },
            getItemData(item.key).notificationTimestamp,
            language
        ).then(r => (''))
    }
}

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