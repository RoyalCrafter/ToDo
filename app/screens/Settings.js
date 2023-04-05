
import React, {useRef, useState} from "react";
import {
    FlatList,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import {darkColors, lightColors} from "../constants/ColorThemes";
import Ionicons from "react-native-vector-icons/Ionicons";
import Clipboard from '@react-native-clipboard/clipboard';
import PagerView from "react-native-pager-view";
import {getWords} from "../handler/DataHandler";
import {addDone, addExistingTodo, addNewTodo, changeText} from "../handler/ItemHandler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import {createAccount, loginAccount, logoutAccount} from "../handler/CloudHandler";

export default function Settings({darkMode, changeLanguage, language, todos, done, setTodos, setDone, setLoggedIn, loggedIn}) {
    const languages = [
        {key: 'de', name: 'Deutsch'},
        {key: 'en', name: 'English'},
        {key: 'fr', name: 'Français'}
    ]
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [name, setName] = useState('');
    const pagerRef = useRef(0);


    const closeMenu = () => {
        setPasswordVisible(false)
        setEmail('')
        setPassword('')
        setEmailValid(false)
        setName('')
        pagerRef.current.setPageWithoutAnimation(0);
    }
    const openLanguageMenu = () => {
        pagerRef.current.setPageWithoutAnimation(1);
    }
    const openSignupMenu = () => {
        pagerRef.current.setPageWithoutAnimation(2);
    }
    const openLoginMenu = () => {
        pagerRef.current.setPageWithoutAnimation(3);
    }
    const openLogoutMenu = () => {
        pagerRef.current.setPageWithoutAnimation(4);
    }

    const emailHandler = email => {
        setEmail(email);
        setEmailValid(isValidEmail(email));
    }

    const isValidEmail = email => {
        const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return regex.test(email) && email.split('@')[1].includes('.');
    };


    const signup = () => {
        if (emailValid && password.length > 8) {
            createAccount(email, password, name, language).then(r => {
                console.log(r);
            })
            closeMenu();
        }
    }

    const login = () => {
        loginAccount(email, password, language, setLoggedIn).then(r => {
            console.log(r);
        })
        closeMenu();
    }

    const logout = () => {
        logoutAccount(language, setLoggedIn).then(r => {
            console.log(r);
        })
        closeMenu();
    }


    return (
        <PagerView ref={pagerRef} initialPage={0} scrollEnabled={false} style={{height: '100%'}}>

            <View key={0} style={styles(darkMode).page}>
                <View style={styles(darkMode).emptyView}/>
                <View style={styles(darkMode).stroke}/>
                <TouchableOpacity
                    onPress={() => openLanguageMenu()}
                    style={styles(darkMode).button}>
                    <Ionicons name={'chevron-forward'} size={24} color={darkMode ? darkColors.text: lightColors.text} style={styles(darkMode).icon}/>
                    <View>
                        <Text style={styles(darkMode).subtitle}>{getWords(language).language}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles(darkMode).stroke}/>
                {loggedIn ?
                    <TouchableOpacity
                        onPress={() => openLogoutMenu()}
                        style={styles(darkMode).button}>
                        <Ionicons name={'chevron-forward'} size={24} color={darkMode ? darkColors.text: lightColors.text} style={styles(darkMode).icon}/>
                        <View>
                            <Text style={styles(darkMode).subtitle}>{getWords(language).logout}</Text>
                        </View>
                    </TouchableOpacity>
                :
                    <>
                        <TouchableOpacity
                        onPress={() => openSignupMenu()}
                        style={styles(darkMode).button}>
                        <Ionicons name={'chevron-forward'} size={24} color={darkMode ? darkColors.text: lightColors.text} style={styles(darkMode).icon}/>
                        <View>
                        <Text style={styles(darkMode).subtitle}>{getWords(language).signup}</Text>
                        </View>
                        </TouchableOpacity>
                        <View style={styles(darkMode).stroke}/>
                        <TouchableOpacity
                        onPress={() => openLoginMenu()}
                        style={styles(darkMode).button}>
                        <Ionicons name={'chevron-forward'} size={24} color={darkMode ? darkColors.text: lightColors.text} style={styles(darkMode).icon}/>
                        <View>
                        <Text style={styles(darkMode).subtitle}>{getWords(language).login}</Text>
                        </View>
                        </TouchableOpacity>
                    </>
                }
                <View style={styles(darkMode).stroke}/>
            </View>

            <View key={1}>
                <View style={styles(darkMode).subHeader}>
                    <Text style={styles(darkMode).subtitle}>{getWords(language).language}</Text>
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
                            <View style={styles(darkMode).listItem}>
                                <Text style={styles(darkMode).text}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>

                    )}
                    keyExtractor={item => item.key}
                />
            </View>

            <View key={2}>
                <View style={styles(darkMode).subHeader}>
                    <Text style={styles(darkMode).subtitle}>{getWords(language).signup}</Text>
                </View>
                <TouchableWithoutFeedback style={{position: 'absolute'}} onPress={() => closeMenu()}>
                    <Ionicons style={{padding: 10, top: -11.5, right: 5, alignSelf: 'flex-end'}} name={'close'} size={24}  color={darkMode ? darkColors.icon : lightColors.icon} />
                </TouchableWithoutFeedback>
                <View style={{paddingHorizontal: 40}}>
                    <View style={styles(darkMode).inputView}>
                        <TextInput
                            style={styles(darkMode).inputText}
                            placeholder={getWords(language).name}
                            placeholderTextColor={darkMode ? darkColors.placeHolderText : lightColors.placeHolderText}
                            value={name}
                            onChangeText={(name) => setName(name)}
                        />
                    </View>
                    <View style={styles(darkMode).inputView}>
                        <TextInput
                            style={styles(darkMode).inputText}
                            placeholder={'E-Mail'}
                            placeholderTextColor={darkMode ? darkColors.placeHolderText : lightColors.placeHolderText}
                            keyboardType="email-address"
                            value={email}
                            onChangeText={(email) => emailHandler(email)}
                        />
                        <MaterialCommunityIcons name={emailValid ? "email-check-outline" : "email-remove-outline"} size={24} color={emailValid ? '#4DFF2B' : '#FF2B2B'} style={{position: 'absolute', right: emailValid ? 14 : 15}}/>
                    </View>
                    <View style={styles(darkMode).inputView}>
                        <TextInput
                            style={styles(darkMode).inputText}
                            placeholder={getWords(language).password}
                            placeholderTextColor={darkMode ? darkColors.placeHolderText : lightColors.placeHolderText}
                            secureTextEntry={!passwordVisible}
                            value={password}
                            onChangeText={(password) => setPassword(password)}
                        />
                        <TouchableOpacity onPress={() => setPasswordVisible(prevValue => !prevValue)} style={styles(darkMode).iconPassword}>
                            <MaterialCommunityIcons name={passwordVisible ? 'eye' : 'eye-off'} size={24} color={darkMode ? darkColors.icon : lightColors.icon}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => signup()}
                        style={styles(darkMode).loginButton}
                    >
                        <View>
                            <Text style={styles(darkMode).buttonText}>{getWords(language).signup}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>


            <View key={3}>
                <View style={styles(darkMode).subHeader}>
                    <Text style={styles(darkMode).subtitle}>{getWords(language).login}</Text>
                </View>
                <TouchableWithoutFeedback style={{position: 'absolute'}} onPress={() => closeMenu()}>
                    <Ionicons style={{padding: 10, top: -11.5, right: 5, alignSelf: 'flex-end'}} name={'close'} size={24}  color={darkMode ? darkColors.icon : lightColors.icon} />
                </TouchableWithoutFeedback>
                <View style={{paddingHorizontal: 40}}>
                    <View style={styles(darkMode).inputView}>
                        <TextInput
                            style={styles(darkMode).inputText}
                            placeholder={'E-Mail'}
                            placeholderTextColor={darkMode ? darkColors.placeHolderText : lightColors.placeHolderText}
                            keyboardType="email-address"
                            value={email}
                            onChangeText={(email) => emailHandler(email)}
                        />
                    </View>
                    <View style={styles(darkMode).inputView}>
                        <TextInput
                            style={styles(darkMode).inputText}
                            placeholder={getWords(language).password}
                            placeholderTextColor={darkMode ? darkColors.placeHolderText : lightColors.placeHolderText}
                            secureTextEntry={!passwordVisible}
                            value={password}
                            onChangeText={(password) => setPassword(password)}
                        />
                        <TouchableOpacity onPress={() => setPasswordVisible(prevValue => !prevValue)} style={styles(darkMode).iconPassword}>
                            <MaterialCommunityIcons name={passwordVisible ? 'eye' : 'eye-off'} size={24} color={darkMode ? darkColors.icon : lightColors.icon}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => login()}
                        style={styles(darkMode).loginButton}
                    >
                        <View>
                            <Text style={styles(darkMode).buttonText}>{getWords(language).login}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View key={4}>
                <View style={styles(darkMode).subHeader}>
                    <Text style={styles(darkMode).subtitle}>{getWords(language).logout}</Text>
                </View>
                <TouchableWithoutFeedback style={{position: 'absolute'}} onPress={() => closeMenu()}>
                    <Ionicons style={{padding: 10, top: -11.5, right: 5, alignSelf: 'flex-end'}} name={'close'} size={24}  color={darkMode ? darkColors.icon : lightColors.icon} />
                </TouchableWithoutFeedback>
                <View style={{paddingHorizontal: 40}}>
                    <TouchableOpacity
                        onPress={() => logout()}
                        style={styles(darkMode).loginButton}
                    >
                        <View>
                            <Text style={styles(darkMode).buttonText}>{getWords(language).logout}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </PagerView>
    );
}

const styles = (darkMode) => StyleSheet.create({
    button:{
        padding: 15,
        alignItems: 'center',
    },
    emptyView:{
        padding: 15,
    },
    stroke:{
        borderBottomWidth: 1,
        borderColor: darkMode ? darkColors.inputFieldBorder : lightColors.inputFieldBorder
    },
    page: {
        padding: 30,
    },
    subtitle:{
        textAlign: 'center',
        color: darkMode ? darkColors.text : lightColors.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
    icon:{
        position: 'absolute',
        right: 15,
        paddingVertical: 15,
    },
    iconPassword:{
        position: 'absolute',
        right: 15,
    },
    listItem:{
        borderColor: '#000000',
        width: 260,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: darkMode ? darkColors.inputFieldBorder : lightColors.inputFieldBorder,
        color: darkMode ? darkColors.placeHolderText : lightColors.placeHolderText,
    },
    text:{
        color: darkMode ? darkColors.text : lightColors.text,
        fontSize: 15,
    },
    subHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        color: darkMode ? darkColors.text : lightColors.text,
        top: 25,
    },
    inputView: {
        marginBottom: 10,
        paddingLeft: 8,
        paddingRight: 40,
        borderBottomWidth: 1,
        borderBottomColor: darkMode ? darkColors.inputFieldBorder : lightColors.inputFieldBorder,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputText:{
        color: darkMode ? darkColors.text : lightColors.text,
        width: '100%',
    },
    loginButton:{
        backgroundColor: lightColors.button,
        padding: 8,
        alignItems: 'center',
        borderRadius: 6,
        top: 10,
        marginHorizontal: 20,
    },
    buttonText:{
        fontSize: 16,
        color: darkMode ? darkColors.text : lightColors.text,
    },
});
