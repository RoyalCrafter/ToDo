
// noinspection JSUnresolvedFunction

import React, {useState} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import AddTodo from "../components/AddTodo";
import ToDoItem from "../components/items/ToDoItem";


export default function ToDoScreen({darkMode, text, todos, changeText, addTodo, removeTodo, language, showCurrentToDo}){
    return(
        <View style={styles.view}>
            <View style={styles.content}>
                <AddTodo
                    style={styles.addTodo}
                    text={text}
                    submitHandler={() => addTodo(text)}
                    darkMode={darkMode}
                    changeHandler={(text) => changeText(text)}
                    language={language}
                />
                <View style={styles.list}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => (<View style={{height: 17}}/>)}
                        data={todos}
                        renderItem={({item}) => (
                            <ToDoItem
                                item={item}
                                pressHandler={() => removeTodo(item.key, item.text)}
                                darkMode={darkMode}
                                showCurrentToDo={showCurrentToDo}
                            />
                        )}
                        keyExtractor={item => item.key}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view:{
        flex: 1,
    },
    content: {
        //paddingVertical: 20,
        paddingTop: 20,
        padding: 40,
        flex: 100,
    },
    list: {
        marginTop: 20,
        flex: 1,
        flexGrow: 1,
    },
});
