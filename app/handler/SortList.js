import React from "react";

export const sortAlphabetically = async (list, setList, setValue) => {
    await setList(list.sort((a, b) => a.name.localeCompare(b.name)));
    setValue(prevValue => prevValue + 1);
}

export const sortAlphabeticallyReversed = async (list, setList, setValue) => {
    await setList(list.sort((a, b) => b.name.localeCompare(a.name)));
    setValue(prevValue => prevValue + 1);
}

export const sortByDate = async (list, setList, setValue, getItemData) => {
    await setList(list.sort((a, b) => (new Date(getItemData(a.key).date).getTime()) - (new Date(getItemData(b.key).date).getTime())));
    setValue(prevValue => prevValue + 1);
}

export const sortByDateReversed = async (list, setList, setValue, getItemData) => {
    await setList(list.sort((a, b) => (new Date(getItemData(b.key).date).getTime()) - (new Date(getItemData(a.key).date).getTime())));
    setValue(prevValue => prevValue + 1);
}

export const sortByCreationDate = async (list, setList, setValue) => {
    await setList(list.sort((a, b) => a.key-b.key));
    setValue(prevValue => prevValue + 1);
}

export const sortByCreationDateReversed = async (list, setList, setValue) => {
    await setList(list.sort((a, b) => b.key-a.key));
    setValue(prevValue => prevValue + 1);
}

export const sortByPriority = async (list, setList, setValue) => {
    await setList(list.sort((a, b) => a.priority-b.priority));
    setValue(prevValue => prevValue + 1);
}

export const sortByPriorityReversed = async (list, setList, setValue) => {
    await setList(list.sort((a, b) => b.priority-a.priority));
    setValue(prevValue => prevValue + 1);
}