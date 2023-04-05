
import React from "react";
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather";
import {darkColors, lightColors} from "../constants/ColorThemes";
import {getWords} from "../handler/DataHandler";


export default function Header({changeMode, showSettings, toggleAmoled, darkMode, amoled, page, language, settingsVisible, itemOverviewVisible, todoName, setItemOverviewVisible, setIsEditing, isEditing}) {

    const getTitle = () => {
        console.log(page)
        if(settingsVisible){
            return getWords(language).settings;
        } else if(itemOverviewVisible){
            return todoName;
        } else if(isEditing){
            return getWords(language).addTodo;
        } else if(page){
            return getWords(language).todo;
        } else if(!page){
            return getWords(language).done;
        }
    }

    return(
        <View style={styles(darkMode, amoled).header}>
            <Text style={styles(darkMode, amoled).title}>{getTitle()}</Text>
            <DarkModeToggle
                changeMode={() => changeMode()}
                darkMode={darkMode}
                toggleAmoled={toggleAmoled}
                amoled={amoled}
            />
            <TouchableWithoutFeedback
                onPress={isEditing ? () => {setIsEditing(false)} : itemOverviewVisible ? () => {setItemOverviewVisible(false); setIsEditing(false)} : () => {showSettings()}}
            >
                <Ionicons
                    name={settingsVisible || itemOverviewVisible || isEditing ? 'chevron-back' : 'settings-outline'}
                    size={28}
                    color={darkMode ? darkColors.icon : lightColors.icon}
                    style={styles(darkMode, amoled).menu}
                />
            </TouchableWithoutFeedback>
        </View>
    );
}



function DarkModeToggle({darkMode, changeMode, toggleAmoled, amoled}){
    return (
        <TouchableWithoutFeedback onPress={() => changeMode()} onLongPress={() => toggleAmoled()}>
            <Feather name="sun" size={24} color={darkMode ? darkColors.icon : lightColors.icon} style={styles(darkMode, amoled).button}/>
        </TouchableWithoutFeedback>
    );
}

Header.propsTypes = {
    darkMode: 'boolean',
    pageTitle: 'string',
}


const styles = (darkMode, amoled) =>  StyleSheet.create({
    header:{
        height: 45,
        maxHeight: 45,
        minHeight: 45,
        paddingTop: 50,
        backgroundColor: darkMode ? amoled ? darkColors.amoled : darkColors.background : lightColors.foreground,
        justifyContent: 'center',
        borderColor: darkColors.foreground,
        borderBottomWidth: 1,
    },
    title: {
        textAlign: 'center',
        color: darkMode ? darkColors.text : lightColors.text,
        fontSize: 20,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        alignSelf: 'center',
        position: 'absolute',
    },
    button:{
        alignSelf: 'flex-end',
        position: 'absolute',
        right: 15,
    },
    menu:{
        alignSelf: 'flex-end',
        position: 'absolute',
        left: 15,
    },
});
