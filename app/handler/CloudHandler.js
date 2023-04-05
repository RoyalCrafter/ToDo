import React from "react";
import {StyleSheet, ToastAndroid, View} from "react-native";
import { Client, Account, ID } from 'appwrite';
import {getWords} from "./DataHandler";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6420133f64d48d5a127b');

export const createAccount = async (email, password, name, language) => {
    const account = new Account(client);
    try {
        await account.create(ID.unique(), email, password, name);
        ToastAndroid.show(getWords(language).account_login_success, ToastAndroid.LONG);
    } catch (e) {
        ToastAndroid.show(getWords(language).account_creation_error, ToastAndroid.LONG);
    }
}

export const loginAccount = async (email, password, language, setLoggedIn) => {
    const account = new Account(client);
    try {
        await account.createEmailSession(email, password);
        setLoggedIn(true);
        ToastAndroid.show(getWords(language).account_login_success, ToastAndroid.LONG);
    } catch (e) {
        ToastAndroid.show(getWords(language).account_login_error, ToastAndroid.LONG);
    }
}

export const logoutAccount = async (language, setLoggedIn) => {
    const account = new Account(client);
    try {
        await account.deleteSessions();
        setLoggedIn(false);
        ToastAndroid.show(getWords(language).account_logout_success, ToastAndroid.LONG);
    } catch (e) {
        ToastAndroid.show(getWords(language).account_logout_error, ToastAndroid.LONG);
    }
}

export const isLoggedIn = async () => {
    const account = new Account(client);
    const promise = account.get();

    promise.then(function (response) {
        return true;
    }, function (error) {
        return false;
    });
}