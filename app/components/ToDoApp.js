
import React, {useEffect} from "react";
import {BackHandler, StyleSheet, View} from "react-native";
import PagerView from "react-native-pager-view";
import ToDoScreen from "../screens/ToDoScreen";
import DoneScreen from "../screens/DoneScreen";

export default function ToDoApp({darkMode, addTodo, changeText, language, todos, removeTodo, removeDone, changePage, done, text, page, settingsVisible, todoOverviewVisible, showCurrentToDo}) {



    return (
        <>
            <PagerView initialPage={0} style={{flex: 1}} onPageSelected={() => changePage(page === 'todo' ? 'done' : 'todo')}>
                <View key={0}>
                    {settingsVisible || todoOverviewVisible ?
                        <View />
                        :
                        <ToDoScreen
                        addTodo={addTodo}
                        changeText={changeText}
                        removeTodo={removeTodo}
                        darkMode={darkMode}
                        todos={todos}
                        text={text}
                        language={language}
                        settingsVisible={settingsVisible}
                        showCurrentToDo={showCurrentToDo}
                        />
                    }
                </View>
                <View key={1}>
                    {settingsVisible || todoOverviewVisible ?
                        <View />
                        :
                        <DoneScreen
                            removeDone={removeDone}
                            darkMode={darkMode}
                            done={done}
                            settingsVisible={settingsVisible}
                        />
                    }
                </View>
            </PagerView></>
    );
}

const styles = StyleSheet.create({});
