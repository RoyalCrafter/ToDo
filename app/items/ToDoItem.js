import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {darkColors, lightColors} from "../constants/ColorThemes";
import Octicons from "react-native-vector-icons/Octicons";
import {getPriorityColor} from "../handler/ItemHandler";

export default function ToDoItem({item, pressHandler, darkMode, showCurrentItem}){

    return (
        <TouchableOpacity onPress={() => showCurrentItem(item)}>
            <View style={styles(darkMode, item).item}>
                <View style={styles(darkMode, item).priorityView}>
                    <View style={styles(darkMode, item).priority}/>
                </View>
                <Text style={styles(darkMode, item).text}>{item.name}</Text>
                <TouchableOpacity style={styles(darkMode, item).touchable} onPress={() => pressHandler(item.key, item.name)}>
                    <Octicons name="check" size={24} color={darkMode ? darkColors.icon : lightColors.icon}/>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = (darkMode, item) => StyleSheet.create({
    item:{
        padding: 10,
        borderColor: darkMode ? darkColors.itemBorder : lightColors.itemBorder,
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
        backgroundColor: getPriorityColor(item),
    },
    text:{
        color: darkMode ? darkColors.text : lightColors.text,
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
