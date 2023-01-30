
// noinspection JSUnresolvedFunction

import React from "react";
import {FlatList, StyleSheet, View} from "react-native";
import AddTodo from "../components/AddTodo";
import ToDoItem from "../items/ToDoItem";
import {finishTodo} from "../handler/ItemHandler";


export default function ToDoScreen({darkMode, todos, language, showCurrentItem, setTodos, setDone, setItemOverviewVisible, setIsEditing, name, setName}){
    return(
        <View style={styles.view}>
            <View style={styles.content}>
                <AddTodo
                    darkMode={darkMode}
                    language={language}
                    setTodos={setTodos}
                    setIsEditing={setIsEditing}
                    name={name}
                    setName={setName}
                />
                <View style={styles.list}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => (<View style={{height: 17}}/>)}
                        data={todos}
                        renderItem={({item}) => (
                            <ToDoItem
                                item={item}
                                pressHandler={() => finishTodo(item, setTodos, setDone, setItemOverviewVisible)}
                                darkMode={darkMode}
                                showCurrentItem={showCurrentItem}
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
