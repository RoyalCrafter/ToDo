import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {darkColors, lightColors} from "../constants/ColorThemes";
import {getPriorityColor} from "../handler/ItemHandler";

export default function DoneItem({item, pressHandler, darkMode, showCurrentItem}){


    return (
        <TouchableOpacity onPress={() => showCurrentItem(item)}>
            <View style={darkMode ? styles.itemDarkMode : styles.itemLightMode}>
                <View style={styles.priorityView}>
                    <View style={[styles.priority, {backgroundColor: getPriorityColor(item)}]}/>
                </View>
                <Text style={darkMode ? styles.textDarkMode : styles.textLightMode}>{item.name}</Text>
                <TouchableOpacity style={styles.touchable} onPress={() => pressHandler(item.key, item.name)}>
                    <MaterialCommunityIcons name="delete-outline" size={24} color={darkMode ? darkColors.icon : lightColors.icon}/>
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
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    textLightMode:{
        flex: 9,
        paddingLeft: 6,
        color: lightColors.text,
    },
    textDarkMode:{
        flex: 9,
        paddingLeft: 6,
        color: darkColors.text,
    },
    touchable:{
        padding: 6,
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
});
