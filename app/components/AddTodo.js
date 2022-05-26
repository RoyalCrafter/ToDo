import React from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {darkColors, lightColors} from "../colorThemes";


export default function AddTodo({submitHandler, darkMode, text, changeHandler}) {


    if (darkMode) {
    return (
        <View style={styles.view}>
            <TextInput
                style={styles.inputFieldDarkMode}
                placeholder={'Neues ToDo...'}
                //placeholderTextColor={'#ddd'}
                placeholderTextColor={darkColors.placeHolderText}
                value={text}
                onChangeText={(text) => changeHandler(text)}
            />
            <TouchableOpacity onPress={() => submitHandler(text)} style={styles.button}>
                <View>
                    <Text style={styles.buttonText}>ToDo hinzufügen</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
    } else{
        return (
            <View >
                <TextInput
                    style={styles.inputFieldLightMode}
                    placeholder={'Neues ToDo...'}
                    //placeholderTextColor={'#ddd'}
                    placeholderTextColor={lightColors.placeHolderText}
                    value={text}
                    onChangeText={(text) => changeHandler(text)}
                />
                <TouchableOpacity onPress={() => submitHandler(text)} style={styles.button}>
                    <View>
                        <Text style={styles.buttonText}>ToDo hinzufügen</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputFieldLightMode: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: lightColors.inputFieldBorder,
        color: lightColors.text,
    },
    inputFieldDarkMode: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: darkColors.inputFieldBorder,
        color: darkColors.text,
    },
    button:{
        backgroundColor: lightColors.button,
        padding: 8,
        alignItems: 'center',
        borderRadius: 6,
        shadowColor: '#000',
        elevation: 4,
    },
    buttonText:{
        fontSize: 16,
    }
})
