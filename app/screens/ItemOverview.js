import React, {useState} from "react";
import {Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {darkColors, lightColors} from "../constants/ColorThemes";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {getItemData, getWords} from "../handler/DataHandler";
import EditOverview from "./EditOverview";
import {deleteDone, deleteTodo, finishTodo, getNonTransparentPriorityColor, restoreToDo} from "../handler/ItemHandler";
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import NotificationItem from "../items/NotificationItem";


export default function ItemOverview({darkMode, language, item, setDone, setItemOverviewVisible, setTodos, setValue, todos, isEditing, setIsEditing}) {
    const expandedItem = getItemData(item.key)
    const [name, setName] = useState(item.name);
    const [priority, setPriority] = useState(item.priority);
    const [description, setDescription] = useState(expandedItem.description);
    const [date, setDate] = useState(expandedItem.date);
    const [duration, setDuration] = useState(expandedItem.duration);
    const [notificationTimestamp, setNotificationTimestamp] = useState(expandedItem.notificationTimestamp);

    const getDate = () => {
        return new Date(date).toLocaleDateString();
    }

    const getDuration = () => {
        const minutes = duration / (60 * 1000);
        const hours = minutes / 60;
        const days = hours / 24;
        const weeks = days / 7;

        let result = '';
        if (Math.floor(weeks) > 0) {
            result += `${Math.floor(weeks)} ${Math.floor(weeks) > 1 ? getWords(language).weeks : getWords(language).week}, `;
        }
        if (Math.floor(days % 7) > 0) {
            result += `${Math.floor(days % 7)} ${Math.floor(days % 7) > 1 ? getWords(language).days : getWords(language).day}, `;
        }
        if (Math.floor(hours % 24) > 0) {
            result += `${Math.floor(hours % 24)} ${Math.floor(hours % 24) > 1 ? getWords(language).hours : getWords(language).hour}, `;
        }
        if (Math.floor(minutes % 60) > 0) {
            result += `${Math.floor(minutes % 60)} ${Math.floor(minutes % 60) > 1 ? getWords(language).minutes : getWords(language).minute}`;
        }

        if (result.endsWith(', ')) {
            result = result.slice(0, -2);
        }

        return result;
    }


    const getDescriptionContent = () => {
        if(description === ''){
            return(<></>);
        } else {
            return (
                <>
                    <Text
                        style={styles(darkMode).headline}>{getWords(language).description}</Text>
                    <Text style={styles(darkMode).text}>{description}</Text>
                </>
            );
        }
    }

    const getDateContent = () => {
        if(new Date(date).getTime() === 0){
            return(<></>);
        } else {
            return (
                <>
                    <Text style={styles(darkMode).headline}>{getWords(language).date}</Text>
                    <View>
                        <Text style={styles(darkMode).date}>{getDate()}</Text>
                    </View>
                </>
            );
        }
    }

    const getDurationContent = () => {
        if(duration === 0){
            return(<></>);
        } else {
            return (
                <>
                    <Text style={styles(darkMode).headline}>{getWords(language).duration}</Text>
                    <View>
                        <Text style={styles(darkMode).text}>{getDuration()}</Text>
                    </View>
                </>
            );
        }
    }

    const getNotificationContent = () => {
        if(notificationTimestamp === 0){
            return(<></>);
        } else {
            return (
                <>
                    <Text style={styles(darkMode).headline}>{getWords(language).notification}</Text>
                    <NotificationItem
                        darkMode={darkMode}
                        timestamp={notificationTimestamp}
                    />
                </>
            );
        }
    }


    return (
        <>
            {isEditing ?
                <EditOverview
                    darkMode={darkMode}
                    language={language}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    item={item}
                    expandedItem={expandedItem}
                    setItemOverviewVisible={setItemOverviewVisible}
                    todos={todos}
                    setValue={setValue}
                    isNewItem={false}
                    setTodos={setTodos}
                    name={name}
                    description={description}
                    priority={priority}
                    notificationTimestamp={notificationTimestamp}
                    date={date}
                    duration={duration}
                    setName={setName}
                    setDescription={setDescription}
                    setPriority={setPriority}
                    setDate={setDate}
                    setDuration={setDuration}
                    setNotificationTimestamp={setNotificationTimestamp}
                />
                :
                <>
                    <ScrollView style={styles(darkMode).scrollView} contentContainerStyle={{alignItems: 'center'}} showsVerticalScrollIndicator={false}>
                        <>
                            <Text style={styles(darkMode).headline}>{getWords(language).name}</Text>
                            <Text style={styles(darkMode).text}>{item.name}</Text>
                        </>
                        <>
                            <Text style={styles(darkMode).headline}>{getWords(language).priority}</Text>
                            <SegmentedControl
                                tintColor={getNonTransparentPriorityColor(item)}
                                backgroundColor={darkMode ? darkColors.modal : lightColors.modal}
                                fontStyle={{color: darkMode ? darkColors.text : lightColors.text}}
                                activeFontStyle={{color: lightColors.text}}
                                style={styles(darkMode).controlTab}
                                values={[getWords(language).low, getWords(language).medium, getWords(language).high]}
                                selectedIndex={priority}
                            />
                        </>
                        {getDescriptionContent()}
                        {getDateContent()}
                        {/*{getDurationContent()}*/}
                        {getNotificationContent()}
                        <View style={{height: 20}}/>
                    </ScrollView>
                    {item.isToDo ?
                        <View style={styles(darkMode).buttonView}>
                            <TouchableOpacity style={styles(darkMode).todoButton} onPress={() => deleteTodo(item.key, setTodos, setItemOverviewVisible)}>
                                <MaterialCommunityIcons name="delete-outline" size={24} color={darkMode ? darkColors.icon : lightColors.icon}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles(darkMode).todoButton} onPress={() => setIsEditing(true)}>
                                <MaterialIcons name="edit" size={24} color={darkMode ? darkColors.icon : lightColors.icon}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles(darkMode).todoButton} onPress={() => finishTodo(item, setTodos, setDone, setItemOverviewVisible)}>
                                <Octicons name="check" size={24} color={darkMode ? darkColors.icon : lightColors.icon}/>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles(darkMode).buttonView}>
                            <TouchableOpacity style={styles(darkMode).doneButton} onPress={() => deleteDone(item.key, setDone, setItemOverviewVisible)}>
                                <MaterialCommunityIcons name="delete-outline" size={24} color={darkMode ? darkColors.icon : lightColors.icon}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles(darkMode).doneButton} onPress={() => restoreToDo(item, setTodos, setDone, setItemOverviewVisible, language)}>
                                <MaterialCommunityIcons name="backup-restore" size={24} color={darkMode ? darkColors.icon : lightColors.icon}/>
                            </TouchableOpacity>
                        </View>
                    }
                </>
            }
        </>
    );
}


const windowWidth = Dimensions.get('window').width;

const styles = (darkMode) => StyleSheet.create({
    buttonView:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    todoButton:{
        backgroundColor: lightColors.button,
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 15,
        marginVertical: 20,
        width: (windowWidth - 60) / 3,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        top: 10.3,
    },
    doneButton:{
        backgroundColor: lightColors.button,
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 15,
        marginVertical: 20,
        width: (windowWidth - 40) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        top: 10.3,
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
    headline:{
        marginTop: 35,
        paddingHorizontal: 8,
        paddingVertical: 6,
        color: darkMode ? darkColors.text : lightColors.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
    text: {
        marginTop: 25,
        paddingHorizontal: 8,
        paddingVertical: 6,
        color: darkMode ? darkColors.text : lightColors.text,
        fontSize: 14,
        width: '75%',
        marginBottom: 1,
    },
    date: {
        marginTop: 25,
        paddingHorizontal: 8,
        paddingVertical: 6,
        color: darkMode ? darkColors.text : lightColors.text,
        fontSize: 15,
        width: '75%',
        alignSelf: 'center',
    },
});
