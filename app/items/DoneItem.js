import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {darkColors, lightColors} from "../constants/ColorThemes";
import {getPriorityColor} from "../handler/ItemHandler";

export default function DoneItem({item, pressHandler, darkMode, showCurrentItem}){


    return (
        <TouchableOpacity onPress={() => showCurrentItem(item)}>
            <View style={styles(darkMode, item).item}>
                <View style={styles(darkMode, item).priorityView}>
                    <View style={styles(darkMode, item).priority}/>
                </View>
                <Text style={styles(darkMode, item).text}>{item.name}</Text>
                <TouchableOpacity style={styles(darkMode, item).touchable} onPress={() => pressHandler(item.key, item.name)}>
                    <MaterialCommunityIcons name="delete-outline" size={24} color={darkMode ? darkColors.icon : lightColors.icon}/>
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
        alignItems: 'center',
        justifyContent: 'center',
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
        flex: 9,
        paddingLeft: 6,
        color: darkMode ? darkColors.text : lightColors.text,
    },
    touchable:{
        padding: 6,
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
});
