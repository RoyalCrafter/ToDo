import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {darkColors, lightColors} from "../constants/ColorThemes";
import Octicons from "react-native-vector-icons/Octicons";

export default function ToDoItem({item, pressHandler, darkMode, showCurrentToDo}){
        return (
            <TouchableOpacity onPress={() => showCurrentToDo(item.text, item.key)}>
            <View style={darkMode ? styles.itemDarkMode : styles.itemLightMode}>
                <Text style={darkMode ? styles.textDarkMode : styles.textLightMode}>{item.text}</Text>
                <TouchableOpacity onPress={() => pressHandler(item.key, item.text)}>
                    <Octicons style={styles.delete} name="check" size={24} color={darkMode ? darkColors.icon : lightColors.icon}/>
                </TouchableOpacity>
            </View>
            </TouchableOpacity>
        );
}

// noinspection JSUnresolvedFunction
const styles = StyleSheet.create({
    itemLightMode: {
        padding: 10,
        borderColor: lightColors.itemBorder,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemDarkMode:{
        padding: 10,
        borderColor: darkColors.itemBorder,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textLightMode:{
        color: lightColors.text,
        flex: 9,
        paddingLeft: 6,
        padding: 9,
    },
    textDarkMode:{
        color: darkColors.text,
        flex: 9,
        paddingLeft: 6,
        padding: 9,
    },
    delete:{
        flex: 1,
        padding: 6,
    }
});
