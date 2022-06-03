
import React, {useState} from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {darkColors, lightColors} from "../components/constants/ColorThemes";
import Ionicons from "react-native-vector-icons/Ionicons";
import {de, en, fr} from "../components/constants/Languages";
import Modal from "react-native-modal";
import ToDoItem from "../components/items/ToDoItem";
import Octicons from "react-native-vector-icons/Octicons";

export default function Settings({changeSettingsVisible, darkMode, amoled, changeLanguage, language}) {
    const [languageSettingsVisible, setLanguageSettingsVisible] = useState(false);
    const languages = [
        {key: 'de', name: 'Deutsch'},
        {key: 'en', name: 'English'},
        {key: 'fr', name: 'Français'}
    ]

    const changeLanguageSettingsVisible = () => {
        setLanguageSettingsVisible(prevState => !prevState);
    }

    const getWords = () => {
        if(language === 'de'){
            return de;
        } else if(language === 'fr'){
            return fr;
        } else{
            return en;
        }
    }

    return (
        <View style={styles.view}>
                <Modal
                    isVisible={languageSettingsVisible}
                    style={styles.settingsModal}
                    children={
                    <View>
                        <Text style={styles.title}>{getWords().language}</Text>
                        <FlatList
                            style={styles.list}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() => (<View style={{height: 17}}/>)}
                            data={languages}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={() => {
                                    changeLanguage(item.key);
                                    changeLanguageSettingsVisible();
                                }}>
                                    <View style={styles.listItem}>
                                        <Text style={darkMode ? styles.textDarkMode : styles.textLightMode}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.key}
                        />
                    </View>
                    }
                    onBackButtonPress={changeLanguageSettingsVisible}
                    hasBackdrop={false}
                    animationInTiming={400}
                    animationOutTiming={400}
                />

            <TouchableOpacity
                onPress={changeLanguageSettingsVisible}
                style={styles.button}>
                <Ionicons name={'language'} size={24} color={lightColors.text} style={styles.icon}/>
                <View>
                    <Text style={styles.text}>{getWords().language}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: lightColors.button,
        padding: 15,
        alignItems: 'center',
        borderRadius: 15,
        shadowColor: '#000',
        elevation: 4,
        marginVertical: 20,
    },
    view: {
        padding: 30,
    },
    text:{
        textAlign: 'center',
        color: lightColors.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
    icon:{
        position: 'absolute',
        right: 15,
        paddingVertical: 15,
    },
    settingsModal:{
        position: 'absolute',
        height: 600,
        width: 320,
        borderRadius: 8,
        alignSelf: 'center',
        top: 80,
        backgroundColor: lightColors.foreground,
        alignItems: 'center',
    },
    listItem:{
        borderColor: '#000000',
        marginTop: 15,
        width: 260,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: lightColors.inputFieldBorder,
    },
    list:{
        marginTop: 50,
    },
    title: {
        marginTop: 15,
        textAlign: 'center',
        color: lightColors.text,
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        position: 'absolute',
    },
});
