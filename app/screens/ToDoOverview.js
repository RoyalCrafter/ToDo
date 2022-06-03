
import React, {useState} from "react";
import {Dimensions, FlatList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {darkColors, lightColors} from "../components/constants/ColorThemes";
import Ionicons from "react-native-vector-icons/Ionicons";
import {de, en, fr} from "../components/constants/Languages";
import Modal from "react-native-modal";
import ToDoItem from "../components/items/ToDoItem";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function ToDoOverview({darkMode, deleteToDo, name, key}) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <View>
            {isEditing ?
                <>
                    <Text style={styles.text}>Name:</Text>
                    <TextInput
                        style={styles.inputFieldDarkMode}
                        placeholderTextColor={darkColors.placeHolderText}></TextInput>
                    <EditButtons
                        darkMode={darkMode}
                        setIsEditing={setIsEditing}
                    />
                </>
                :
                <ViewButtons
                    deleteToDo={deleteToDo}
                    darkMode={darkMode}
                    setIsEditing={setIsEditing}
                    key={key}
                />
            }
        </View>
    );
}


function ViewButtons({deleteToDo, darkMode, setIsEditing, key}) {
    return(
        <View style={styles.view}>
            <View style={styles.buttonView}>
                <TouchableOpacity style={styles.viewButton} onPress={() => deleteToDo(key)}>
                    <MaterialCommunityIcons style={styles.delete} name="delete-forever" size={24} color={darkMode ? darkColors.icon : lightColors.icon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewButton} onPress={() => setIsEditing(true)}>
                    <MaterialIcons style={styles.delete} name="edit" size={24} color={darkMode ? darkColors.icon : lightColors.icon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewButton}>
                    <Octicons style={styles.delete} name="check" size={24} color={darkMode ? darkColors.icon : lightColors.icon}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function EditButtons({darkMode, setIsEditing}){
    return(
        <View style={styles.view}>
            <View style={styles.buttonView}>
                <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(false)}>
                    <Ionicons style={styles.delete} name="close" size={24} color={darkMode ? darkColors.icon : lightColors.icon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editButton}>
                    <Octicons style={styles.delete} name="check" size={24} color={darkMode ? darkColors.icon : lightColors.icon}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const statusBarHeight = StatusBar.currentHeight;
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    viewButton:{
        backgroundColor: lightColors.button,
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 15,
        shadowColor: '#000',
        elevation: 4,
        marginVertical: 20,
        width: (windowWidth - 60) / 3,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    editButton:{
        backgroundColor: lightColors.button,
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 15,
        shadowColor: '#000',
        elevation: 4,
        marginVertical: 20,
        width: (windowWidth - 40) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonView:{
        flexDirection: 'row',
        position: 'absolute',
        alignItems: 'center',
    },
    view: {
        padding: 30,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: windowHeight + statusBarHeight - 120,
    },
    inputFieldDarkMode: {
        marginTop: 20,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: darkColors.inputFieldBorder,
        color: darkColors.text,
        position: 'absolute',
        width: 200,
        alignSelf: 'center',
    },
    text:{
        marginTop: 5,
        paddingHorizontal: 8,
        paddingVertical: 6,
        color: darkColors.text,
        fontSize: 20,
        position: 'absolute',
        alignSelf: 'center',
    }
});
