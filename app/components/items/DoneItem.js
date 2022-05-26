import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {darkColors, lightColors} from "../../colorThemes";

export default function DoneItem({item, pressHandler, darkMode}){
        return (
            <View style={darkMode ? styles.itemDarkMode : styles.itemLightMode}>
                <Text style={darkMode ? styles.textDarkMode : styles.textLightMode}>{item.text}</Text>
                <TouchableOpacity onPress={() => pressHandler(item.key, item.text)}>
                    <MaterialCommunityIcons style={styles.delete} name="delete-forever" size={24} color={darkMode ? darkColors.icon : lightColors.icon}/>
                </TouchableOpacity>
            </View>
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
        flex: 9,
        paddingLeft: 6,
        color: lightColors.text,
    },
    textDarkMode:{
        flex: 9,
        paddingLeft: 6,
        color: darkColors.text,
    },
    delete:{
        flex: 1,
        padding: 6,
    }
});
