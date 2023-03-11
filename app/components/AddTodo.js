import React, {useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {darkColors, lightColors} from "../constants/ColorThemes";
import {getWords} from "../handler/DataHandler";
import {addNewTodo, changeText} from "../handler/ItemHandler";
import {onDisplayNotification} from "../handler/NotificationHandler";

export default function AddTodo({darkMode, language, setTodos, setIsEditing, name, setName}) {

        return (
            <View >
                <TextInput
                    style={darkMode ? darkStyles.input : lightStyles.input}
                    placeholder={getWords(language).newTodo}
                    placeholderTextColor={darkMode ? darkColors.placeHolderText : lightColors.placeHolderText}
                    value={name}
                    onChangeText={(name) => changeText(name, setName)}
                />
                    <TouchableOpacity
                        onPress={() => addNewTodo(name, '', 0, new Date(0), 0, setTodos, language, setName)}
                        onLongPress={() => setIsEditing(true)}
                        style={styles.button}
                    >
                        <View>
                            <Text style={darkMode ? darkStyles.buttonText : lightStyles.buttonText}>{getWords(language).addTodo}</Text>
                        </View>
                    </TouchableOpacity>
            </View>
        );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: lightColors.button,
        padding: 8,
        alignItems: 'center',
        borderRadius: 6,
    },
});

const darkStyles = StyleSheet.create({
    buttonText:{
        fontSize: 16,
        color: darkColors.text,
    },
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: darkColors.inputFieldBorder,
        color: darkColors.text,
    },
    buttonShadow:{
        shadowColor: darkColors.shadow,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.55,
        shadowRadius: 8,
    },
});

const lightStyles = StyleSheet.create({
    buttonText:{
        fontSize: 16,
        color: lightColors.text,
    },
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: lightColors.inputFieldBorder,
        color: lightColors.text,
    },
    buttonShadow:{
        shadowColor: lightColors.shadow,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
});
