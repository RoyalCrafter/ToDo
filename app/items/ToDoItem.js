import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {darkColors, lightColors} from "../constants/ColorThemes";
import Octicons from "react-native-vector-icons/Octicons";
import {getPriorityColor} from "../handler/ItemHandler";

export default function ToDoItem({item, pressHandler, darkMode, showCurrentItem}){

    return (
        <TouchableOpacity onPress={() => showCurrentItem(item, true)}>
            <View style={darkMode ? styles.itemDarkMode : styles.itemLightMode}>
                <View style={styles.priorityView}>
                    <View style={[styles.priority, {backgroundColor: getPriorityColor(item)}]}/>
                </View>
                <Text style={darkMode ? styles.textDarkMode : styles.textLightMode}>{item.text}</Text>
                <TouchableOpacity style={styles.touchable} onPress={() => pressHandler(item.key, item.text)}>
                    <Octicons name="check" size={24} color={darkMode ? darkColors.icon : lightColors.icon}/>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    itemLightMode: {
        padding: 10,
        borderColor: lightColors.itemBorder,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
    },
    itemDarkMode:{
        padding: 10,
        borderColor: darkColors.itemBorder,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
    },
    priorityView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    priority:{
        margin: 2,
        flex: 1,
        width: 6,
        borderRadius: 10,
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
    touchable:{
        padding: 6,
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
});
