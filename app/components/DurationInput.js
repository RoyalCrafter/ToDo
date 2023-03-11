import React, {useState} from "react";
import {StyleSheet, TextInput, View, Text, TouchableOpacity} from "react-native";
import {darkColors, lightColors} from "../constants/ColorThemes";
import {getWords} from "../handler/DataHandler";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function DurationInput({darkMode, language, weeks, days, hours, minutes, setWeeks, setDays, setHours, setMinutes}) {


    const changeWeeks = (val) => {
        if(weeks !== 0 || val > 0) {
            setWeeks(parseInt(weeks) + val)
        }
    }

    const changeDays = (val) => {
        if(val > 0) {
            if (days === 6) {
                setDays(-1 + val)
                return;
            }
        }else{
            if(days === 0){
                setDays(7 + val)
                return;
            }
        }
        setDays(parseInt(days) + val)
    }

    const changeHours = (val) => {
        if(val > 0) {
            if (hours === 23) {
                setHours(-1 + val)
                return;
            }
        }else{
            if(hours === 0){
                setHours(24 + val)
                return;
            }
        }
        setHours(parseInt(hours) + val)
    }

    const changeMinutes = (val) => {
        if(val > 0) {
            if (minutes === 59) {
                setMinutes(-1 + val)
                return;
            }
        }else{
            if(minutes === 0){
                setMinutes(60 + val)
                return;
            }
        }
        setMinutes(parseInt(minutes) + val)
    }


    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <TouchableOpacity
                    onPress={() => changeWeeks(+1)}
                >
                    <Ionicons
                        name={'caret-up'}
                        size={28}
                        color={darkMode ? darkColors.placeHolderText : lightColors.itemBorder}
                        style={darkMode ? darkStyles.icon : lightStyles.icon}
                    />
                </TouchableOpacity>

                <View style={darkMode ? darkStyles.textField : lightStyles.textField}>
                    <Text style={darkMode ? darkStyles.text : lightStyles.text}>{weeks}</Text>
                </View>
                <TouchableOpacity onPress={() => changeWeeks(-1)}>
                    <Ionicons
                        name={'caret-down'}
                        size={28}
                        color={darkMode ? darkColors.placeHolderText : lightColors.itemBorder}
                        style={darkMode ? darkStyles.icon : lightStyles.icon}
                    />
                </TouchableOpacity>
                <Text style={darkMode ? darkStyles.subtext : lightStyles.subtext}>{getWords(language).weeks}</Text>
            </View>
            <View style={styles.view}>
                <TouchableOpacity onPress={() => changeDays(+1)}>
                    <Ionicons
                        name={'caret-up'}
                        size={28}
                        color={darkMode ? darkColors.placeHolderText : lightColors.itemBorder}
                        style={darkMode ? darkStyles.icon : lightStyles.icon}
                    />
                </TouchableOpacity>

                <View style={darkMode ? darkStyles.textField : lightStyles.textField}>
                    <Text style={darkMode ? darkStyles.text : lightStyles.text}>{days}</Text>
                </View>
                <TouchableOpacity onPress={() => changeDays(-1)}>
                    <Ionicons
                        name={'caret-down'}
                        size={28}
                        color={darkMode ? darkColors.placeHolderText : lightColors.itemBorder}
                        style={darkMode ? darkStyles.icon : lightStyles.icon}
                    />
                </TouchableOpacity>
                <Text style={darkMode ? darkStyles.subtext : lightStyles.subtext}>{getWords(language).days}</Text>
            </View>
            <View style={styles.view}>
                <TouchableOpacity onPress={() => changeHours(+1)}>
                    <Ionicons
                        name={'caret-up'}
                        size={28}
                        color={darkMode ? darkColors.placeHolderText : lightColors.itemBorder}
                        style={darkMode ? darkStyles.icon : lightStyles.icon}
                    />
                </TouchableOpacity>

                <View style={darkMode ? darkStyles.textField : lightStyles.textField}>
                    <Text style={darkMode ? darkStyles.text : lightStyles.text}>{hours}</Text>
                </View>
                <TouchableOpacity onPress={() => changeHours(-1)}>
                    <Ionicons
                        name={'caret-down'}
                        size={28}
                        color={darkMode ? darkColors.placeHolderText : lightColors.itemBorder}
                        style={darkMode ? darkStyles.icon : lightStyles.icon}
                    />
                </TouchableOpacity>
                <Text style={darkMode ? darkStyles.subtext : lightStyles.subtext}>{getWords(language).hours}</Text>
            </View>
            <View style={styles.view}>
                <TouchableOpacity
                    onPress={() => changeMinutes(+1)}
                >
                    <Ionicons
                        name={'caret-up'}
                        size={28}
                        color={darkMode ? darkColors.placeHolderText : lightColors.itemBorder}
                        style={darkMode ? darkStyles.icon : lightStyles.icon}
                    />
                </TouchableOpacity>
                <View style={darkMode ? darkStyles.textField : lightStyles.textField}>
                    <Text style={darkMode ? darkStyles.text : lightStyles.text}>{minutes}</Text>
                </View>
                <TouchableOpacity onPress={() => changeMinutes(-1)}>
                    <Ionicons
                        name={'caret-down'}
                        size={28}
                        color={darkMode ? darkColors.placeHolderText : lightColors.itemBorder}
                        style={darkMode ? darkStyles.icon : lightStyles.icon}
                    />
                </TouchableOpacity>
                <Text style={darkMode ? darkStyles.subtext : lightStyles.subtext}>{getWords(language).minutes}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
    },
    view:{
        alignItems: 'center'
    },
});

const darkStyles = StyleSheet.create({
    textField:{
        backgroundColor: darkColors.inputFieldBorder,
        marginHorizontal: 8,
        color: darkColors.text,
        width: 50,
        alignItems: 'center',
    },
    text:{
        color: darkColors.text,
        fontSize: 20,
    },
    subtext:{
        color: darkColors.text,
    },
    icon:{
    },
});

const lightStyles = StyleSheet.create({
    textField:{
        backgroundColor: lightColors.inputFieldBorder,
        marginHorizontal: 8,
        color: lightColors.text,
        width: 50,
        alignItems: 'center',
    },
    text:{
        color: lightColors.text,
        fontSize: 20,
    },
    subtext:{
        color: lightColors.text,
    },
    icon:{
    },
});