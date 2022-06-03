
import React from "react";
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather";
import {darkColors, lightColors} from "./constants/ColorThemes";
import {de, en, fr} from "./constants/Languages";


export default function Header({changeMode, showSettings, toggleAmoled, darkMode, amoled, page, language, settingsVisible, todoOverviewVisible, todoName, setTodoOverviewVisible}) {


    const getWords = () => {
        if(language === 'de'){
            return de;
        } else if(language === 'fr'){
            return fr;
        } else{
            return en;
        }
    }

        return(
            <View style={darkMode ? (amoled ? darkStyles.headerAmoled : darkStyles.header) : lightStyles.header}>
                <Text style={darkMode ? darkStyles.title : lightStyles.title}>{settingsVisible ? getWords().settings : todoOverviewVisible ? todoName : (page === 'todo' ? getWords().todo : getWords().done)}</Text>
                <DarkModeToggle changeMode={() => changeMode()} darkMode={darkMode} toggleAmoled={toggleAmoled}/>
                <TouchableWithoutFeedback onPress={todoOverviewVisible ? () => setTodoOverviewVisible(false) : () => showSettings()}>
                    <Ionicons name={settingsVisible || todoOverviewVisible ? 'chevron-back' : 'settings-outline'} size={28}  color={darkMode ? darkColors.icon : lightColors.icon} style={darkMode ? darkStyles.menu : lightStyles.menu}/>
                </TouchableWithoutFeedback>
            </View>
        );
}



function DarkModeToggle({darkMode, changeMode, toggleAmoled}){
    if(darkMode) {
        return (
            <TouchableWithoutFeedback onPress={() => changeMode()} onLongPress={() => toggleAmoled()}>
                <Feather name="sun" size={24} color={darkColors.icon} style={darkStyles.button}/>
            </TouchableWithoutFeedback>
        );
    } else{
        return(
            <TouchableWithoutFeedback onPress={() => changeMode()} onLongPress={() => toggleAmoled()}>
                <FontAwesome5 name="moon" size={24} color={lightColors.icon} style={lightStyles.button}/>
            </TouchableWithoutFeedback>
        );
    }
}

Header.propsTypes = {
    darkMode: 'boolean',
    pageTitle: 'string',
}


const lightStyles = StyleSheet.create({
    header:{
        height: 45,
        maxHeight: 45,
        minHeight: 45,
        paddingTop: 50,
        backgroundColor: lightColors.foreground,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        color: lightColors.text,
        fontSize: 20,
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

const darkStyles = StyleSheet.create({
    header:{
        height: 45,
        maxHeight: 45,
        minHeight: 45,
        paddingTop: 50,
        backgroundColor: darkColors.header,
        justifyContent: 'center',
        borderColor: darkColors.foreground,
        borderBottomWidth: 1,
    },
    headerAmoled:{
        height: 45,
        maxHeight: 45,
        minHeight: 45,
        paddingTop: 50,
        backgroundColor: darkColors.amoled,
        justifyContent: 'center',
        borderColor: darkColors.foreground,
        borderBottomWidth: 1,
    },
    title: {
        textAlign: 'center',
        color: darkColors.text,
        fontSize: 20,
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
