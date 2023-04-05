import React, {useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {darkColors, lightColors} from "../constants/ColorThemes";
import {getWords} from "../handler/DataHandler";
import {addNewTodo, changeText} from "../handler/ItemHandler";
import {onDisplayNotification} from "../handler/NotificationHandler";

export default function AddTodo({darkMode, language, setTodos, setIsEditing, name, setName}) {

        return (
            <View>
                <TextInput
                    style={styles(darkMode).input}
                    placeholder={getWords(language).newTodo}
                    placeholderTextColor={darkMode ? darkColors.placeHolderText : lightColors.placeHolderText}
                    value={name}
                    onChangeText={(name) => changeText(name, setName)}
                />
                <TouchableOpacity
                    onPress={() => addNewTodo(name, '', 0, new Date(0), 0, 0, setTodos, language, setName)}
                    onLongPress={() => setIsEditing(true)}
                    style={styles(darkMode).button}
                >
                    <View>
                        <Text style={styles(darkMode).buttonText}>{getWords(language).addTodo}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
}

const styles = (darkMode) => StyleSheet.create({
    buttonText:{
        fontSize: 16,
        color: darkMode ? darkColors.text : lightColors.text,
    },
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: darkMode ? darkColors.inputFieldBorder : lightColors.inputFieldBorder,
        color: darkMode ? darkColors.text : lightColors.text,
    },
    button:{
        backgroundColor: lightColors.button,
        padding: 8,
        alignItems: 'center',
        borderRadius: 6,
    },
});
