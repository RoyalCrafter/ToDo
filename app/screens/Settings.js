
import React, {useRef} from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import {darkColors, lightColors} from "../constants/ColorThemes";
import Ionicons from "react-native-vector-icons/Ionicons";
import Clipboard from '@react-native-clipboard/clipboard';
import PagerView from "react-native-pager-view";
import {getWords} from "../handler/DataHandler";
import {addDone, addExistingTodo} from "../handler/ItemHandler";

export default function Settings({darkMode, changeLanguage, language, todos, done, setTodos, setDone}) {
    const languages = [
        {key: 'de', name: 'Deutsch'},
        {key: 'en', name: 'English'},
        {key: 'fr', name: 'Français'}
    ]
    const pagerRef = useRef(0);


    const closeMenu = () => {
        pagerRef.current.setPageWithoutAnimation(0);
    }
    const openLanguageMenu = () => {
        pagerRef.current.setPageWithoutAnimation(1);
    }
    const openDataMenu = () => {
        pagerRef.current.setPageWithoutAnimation(2);
    }


    const getClipboardContent = () => {
        let string;
        const getString = async () => {
            string = await Clipboard.getString();
            console.log(string)
        }
        getString().finally(() => {
            const content = JSON.parse(string);
            console.log(content)
            console.log(content[0])
            console.log(content[1])
            try {
                content[0].forEach((item) => {
                    addExistingTodo(item, setTodos);
                });
                content[1].forEach((item) => {
                    addDone(item, setDone);
                });
            } catch (e) {
                console.log('');
            }
        })
    }


    return (
        <PagerView ref={pagerRef} initialPage={0} scrollEnabled={false} style={{height: '100%'}}>

            <View key={0} style={styles.page}>
                <View style={styles.emptyView}/>
                <View style={darkMode ? styles.darkStroke : styles.lightStroke}/>
                <TouchableOpacity
                    onPress={() => openLanguageMenu()}
                    style={styles.button}>
                    <Ionicons name={'chevron-forward'} size={24} color={darkMode ? darkColors.text: lightColors.text} style={styles.icon}/>
                    <View>
                        <Text style={darkMode ? styles.darkSubtitle : styles.lightSubtitle}>{getWords(language).language}</Text>
                    </View>
                </TouchableOpacity>
                <View style={darkMode ? styles.darkStroke : styles.lightStroke}/>
                <TouchableOpacity
                    onPress={() => openDataMenu()}
                    style={styles.button}>
                    <Ionicons name={'chevron-forward'} size={24} color={darkMode ? darkColors.text: lightColors.text} style={styles.icon}/>
                    <View>
                        <Text style={darkMode ? styles.darkSubtitle : styles.lightSubtitle}>Export/Import</Text>
                    </View>
                </TouchableOpacity>
                <View style={darkMode ? styles.darkStroke : styles.lightStroke}/>
            </View>

            <View key={1}>
                <View style={darkMode ? styles.darkSubHeader : styles.lightSubHeader}>
                    <Text style={darkMode ? styles.darkSubtitle : styles.lightSubtitle}>{getWords(language).language}</Text>
                </View>
                <TouchableWithoutFeedback style={{position: 'absolute'}} onPress={() => closeMenu()}>
                    <Ionicons style={{padding: 10, top: -11.5, right: 5, alignSelf: 'flex-end'}} name={'close'} size={24}  color={darkMode ? darkColors.icon : lightColors.icon} />
                </TouchableWithoutFeedback>
                <FlatList
                    style={{marginTop: 15}}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
                    ItemSeparatorComponent={() => (<View style={{height: 17}}/>)}
                    data={languages}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => {
                            changeLanguage(item.key);
                            closeMenu();
                        }}>
                            <View style={darkMode ? styles.darkListItem : styles.lightListItem}>
                                <Text style={darkMode ? styles.darkText : styles.lightText}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>

                    )}
                    keyExtractor={item => item.key}
                />
            </View>

            <View key={2}>
                <View style={darkMode ? styles.darkSubHeader : styles.lightSubHeader}>
                    <Text style={darkMode ? styles.darkSubtitle : styles.lightSubtitle}>Export/Import</Text>
                </View>
                <TouchableWithoutFeedback style={{position: 'absolute'}} onPress={() => closeMenu()}>
                    <Ionicons style={{padding: 10, top: -11.5, right: 5, alignSelf: 'flex-end'}} name={'close'} size={24}  color={darkMode ? darkColors.icon : lightColors.icon} />
                </TouchableWithoutFeedback>
                <TouchableOpacity
                    onPress={() => Clipboard.setString(JSON.stringify([todos, done]))}
                    style={styles.button}>
                    <View>
                        <Text style={darkMode ? styles.darkSubtitle : styles.lightSubtitle}>{getWords(language).copy}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => getClipboardContent()}
                    style={styles.button}>
                    <View>
                        <Text style={darkMode ? styles.darkSubtitle : styles.lightSubtitle}>{getWords(language).paste}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </PagerView>
    );
}

const styles = StyleSheet.create({
    button:{
        padding: 15,
        alignItems: 'center',
    },
    emptyView:{
        padding: 15,
    },
    darkStroke:{
        borderBottomWidth: 1,
        borderColor: darkColors.inputFieldBorder,
    },
    lightStroke:{
        borderBottomWidth: 1,
        borderColor: lightColors.inputFieldBorder,
    },
    page: {
        padding: 30,
    },
    darkSubtitle:{
        textAlign: 'center',
        color: darkColors.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
    lightSubtitle:{
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
    darkListItem:{
        borderColor: '#000000',
        width: 260,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: darkColors.inputFieldBorder,
        color: darkColors.placeHolderText,
    },
    lightListItem:{
        borderColor: '#000000',
        width: 260,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: lightColors.inputFieldBorder,
    },
    darkText:{
        color: darkColors.text,
        fontSize: 15,
    },
    lightText:{
        color: lightColors.text,
        fontSize: 15,
    },
    darkSubHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        color: darkColors.text,
        top: 25,
    },
    lightSubHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        color: lightColors.text,
        top: 25,
    },
});
