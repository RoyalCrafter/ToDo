import React, {useEffect, useState} from "react";
import {
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from "react-native";
import {getWords} from "../handler/DataHandler";
import {addNewTodo, changeItem, changeText} from "../handler/ItemHandler";
import {darkColors, lightColors} from "../constants/ColorThemes";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import DatePicker from 'react-native-date-picker'
import NotificationItem from "../items/NotificationItem";

export default function EditOverview({darkMode, language, setIsEditing, item, expandedItem, setItemOverviewVisible, todos, setValue, isNewItem, setTodos, name, setName, description, setDescription, priority, setPriority, date, setDate, duration, setDuration, notifications, setNotifications}) {
    const [addNotificationDateModalShown, setAddNotificationDateModalShown] = useState(false);
    const [notificationDate, setNotificationDate] = useState(new Date(date));

    const notificationDateHandler = async (date) => {
        await setNotificationDate(new Date(date));
    }

    const getDate = () => {
        return (new Date(date).getTime() - ((((new Date(date).getHours() * 60 + new Date(date).getMinutes()) * 60 + new Date(date).getSeconds())) * 1000));
    }

    const setDummy = () => {}

    return(
        <View>

            <ScrollView style={styles.scrollView} contentContainerStyle={{alignItems: 'center',}} showsVerticalScrollIndicator={false}>

                <>
                <TouchableOpacity onLongPress={() => setName('')}>
                    <Text style={darkMode ? darkStyles.headline : lightStyles.headline}>{getWords(language).name}</Text>
                </TouchableOpacity>
                <TextInput
                    style={darkMode ? darkStyles.input : lightStyles.input}
                    value={name}
                    onChangeText={(name) => changeText(name, setName)}
                    placeholder={getWords(language).name}
                    placeholderTextColor={darkMode ? darkColors.placeHolderText : lightColors.placeHolderText}
                />
                </>
                <>
                    <TouchableOpacity onLongPress={() => setPriority(0)}>
                        <Text style={darkMode ? darkStyles.headline : lightStyles.headline}>{getWords(language).priority}</Text>
                    </TouchableOpacity>
                    <SegmentedControl
                        tintColor={lightColors.button}
                        backgroundColor={darkMode ? darkColors.modal : lightColors.modal}
                        fontStyle={{color: darkMode ? darkColors.text : lightColors.text}}
                        activeFontStyle={{color: lightColors.text}}
                        style={styles.controlTab}
                        values={[getWords(language).low, getWords(language).medium, getWords(language).high]}
                        selectedIndex={priority}
                        onChange={(event) => {
                            setPriority(event.nativeEvent.selectedSegmentIndex);
                        }}
                    />
                </>
                <>
                    <TouchableOpacity onLongPress={() => setDescription('')}>
                        <Text style={darkMode ? darkStyles.headline : lightStyles.headline}>{getWords(language).description}</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={darkMode ? darkStyles.input : lightStyles.input}
                        value={description}
                        onChangeText={(description) => changeText(description, setDescription)}
                        multiline={true}
                        placeholder={getWords(language).description}
                        placeholderTextColor={darkMode ? darkColors.placeHolderText : lightColors.placeHolderText}
                    />
                </>
                <>
                    <TouchableOpacity onLongPress={() => setDate(new Date(0))}>
                        <Text style={darkMode ? darkStyles.headline : lightStyles.headline}>{getWords(language).date}</Text>
                    </TouchableOpacity>
                    <DatePicker
                        date={new Date(date)}
                        onDateChange={setDate}
                        minimumDate={new Date()}
                        mode={"date"}
                        locale={language}
                        androidVariant={"nativeAndroid"}
                        textColor={darkMode ? darkColors.text : lightColors.text}
                    />
                </>
                <>
                    <Text style={darkMode ? darkStyles.headline : lightStyles.headline}>{getWords(language).notifications}</Text>
                    <TouchableOpacity onPress={() => setAddNotificationDateModalShown(true)}>
                        <NotificationItem
                            darkMode={darkMode}
                            date={notificationDate}
                        />
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        open={addNotificationDateModalShown}
                        date={new Date(notificationDate)}
                        minimumDate={new Date()}
                        mode={"datetime"}
                        locale={language}
                        androidVariant={"nativeAndroid"}
                        title={getWords(language).date}
                        confirmText={getWords(language).confirm}
                        cancelText={getWords(language).cancel}
                        onConfirm={async (date) => {
                            await notificationDateHandler(date)
                            setAddNotificationDateModalShown(false)
                        }}
                        onCancel={() => {
                            setAddNotificationDateModalShown(false)
                        }}
                    />
                </>
                {/*<>
                    <TouchableOpacity onLongPress={() => {setDuration(0); setDurationInput('')}}>
                        <Text style={darkMode ? darkStyles.headline : lightStyles.headline}>{getWords(language).duration}</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={darkMode ? darkStyles.input : lightStyles.input}
                        value={durationInput}
                        onChangeText={(input) => {durationInputChangeHandler(input)}}
                        placeholder={'1w 1d 1h 1m'}
                        placeholderTextColor={darkMode ? darkColors.placeHolderText : lightColors.placeHolderText}
                    />
                </>*/}

                <View style={{height: 20}}/>
            </ScrollView>



                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.editButton} onPress={() => {
                        setIsEditing(false);
                        if(isNewItem) {
                            setName('')
                            setDescription('')
                            setPriority(0)
                            setDate(new Date(0))
                            setDuration(0)
                            setNotificationDate(new Date(0))
                        } else{
                            setName(item.name)
                            setDescription(expandedItem.description)
                            setPriority(item.priority)
                            setDate(expandedItem.date)
                            setDuration(expandedItem.duration)
                            setNotificationDate(expandedItem.notificationDate)
                        }
                    }}>
                        <Ionicons name="close" size={24} color={darkMode ? darkColors.icon : lightColors.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => {
                            if (name.length >= 3) {
                                setIsEditing(false);
                                if(isNewItem){
                                    addNewTodo(name, description, priority, getDate(), /*getDuration()*/0, notificationDate, setTodos, language, setDummy)
                                    setName('')
                                    setDescription('')
                                    setPriority(0)
                                    setDate(new Date(0))
                                    setDuration(0)
                                } else {
                                    changeItem(item.key, name, description.trim().length === 0 ? '' : description, priority, getDate(), /*getDuration()*/0, notificationDate, todos, setItemOverviewVisible, setValue, language);
                                }
                            } else {
                                ToastAndroid.show(getWords(language).alert, 700);
                            }
                        }}>
                        <Octicons name="check" size={24} color={darkMode ? darkColors.icon : lightColors.icon}/>
                    </TouchableOpacity>
                </View>
        </View>
    );
}



const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    buttonView:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    editButton:{
        backgroundColor: lightColors.button,
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 15,
        marginVertical: 20,
        width: (windowWidth - 40) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        top: 4,
    },
    buttonTextView:{
        flex: 5,
        width: 0,
        height: 0,
        borderRightWidth: 15,
        borderTopWidth: 45,
        borderRightColor: "transparent",
        borderTopColor: lightColors.button,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    priority:{
        marginTop: 20,
        width: '75%',
        height: 8,
        borderRadius: 10,
    },
    scrollView:{
        height: '80%',
        width: '100%',
    },
    controlTab:{
        marginTop: 20,
        height: 35,
        width: '75%',
    },
});

const lightStyles = StyleSheet.create({
    headline:{
        marginTop: 35,
        paddingHorizontal: 8,
        paddingVertical: 6,
        color: lightColors.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        marginTop: 24,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderBottomWidth: 1,
        borderBottomColor: lightColors.inputFieldBorder,
        color: lightColors.text,
        width: '75%',
        fontSize: 14,
    },
    openNotificationModal:{
        marginTop: 35,
        paddingHorizontal: 8,
        paddingVertical: 6,
        color: lightColors.text,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: lightColors.button,
        borderRadius: 10,
    },
});



const darkStyles = StyleSheet.create({
    headline:{
        marginTop: 35,
        paddingHorizontal: 8,
        paddingVertical: 6,
        color: darkColors.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        marginTop: 24,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderBottomWidth: 1,
        borderBottomColor: darkColors.inputFieldBorder,
        color: darkColors.text,
        width: '75%',
    },
    openNotificationModal:{
        marginTop: 35,
        paddingHorizontal: 8,
        paddingVertical: 6,
        color: darkColors.text,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: darkColors.button,
        borderRadius: 10,
        alignSelf: 'center',
        width: 100,
    },
});
