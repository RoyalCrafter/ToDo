import React, {useEffect, useRef, useState} from 'react';

import {MMKV} from 'react-native-mmkv';
import {darkColors, lightColors} from './app/components/constants/ColorThemes';
import AlertModal from "./app/components/modals/AlertModal";
import Header from './app/components/Header';
import {Dimensions, StatusBar, StyleSheet, View, ToastAndroid, BackHandler} from "react-native";
import RNBootSplash from "react-native-bootsplash";
import {de, en} from "./app/components/constants/Languages";
import ToDoApp from "./app/components/ToDoApp";
import Settings from "./app/screens/Settings";
import SystemNavigationBar from 'react-native-system-navigation-bar';
import useColorScheme from "react-native/Libraries/Utilities/useColorScheme";
import ToDoOverview from "./app/screens/ToDoOverview";


const STYLES = ['default', 'dark-content', 'light-content'];

export default function App() {
  //Variablen und Arrays

  const [todos, setTodos] = useState([]);
  const [done, setDone] = useState([]);
  const [text, setText] = useState('');
  const [darkMode, setDarkMode] = useState(useColorScheme() !== 'light');
  const [amoled, setAmoled] = useState(false);
  const [page, setPage] = useState('');
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [language, setLanguage] = useState('de');
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [todoOverviewVisible, setTodoOverviewVisible] = useState(false);
  const [currentToDo, setCurrentToDo] = useState('');
  const [currentToDoKey, setCurrentToDoKey] = useState(0);


  //Handler für alle Components

  const changeMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  const toggleAmoled = () => {
    setAmoled(prevAmoled => !prevAmoled);
    console.log('amoled');
  }

  const changeSettingsVisible = () => {
    setSettingsVisible(prevSettingsVisible => !prevSettingsVisible);
  };

  const changeLanguage = val => {
    setLanguage(val);
  }

  const showCurrentToDo = (name, key) => {
    if(name.length > 20){
      setCurrentToDo(name.substr(0, 20) + '...');
    } else {
      setCurrentToDo(name);
    }
    setCurrentToDoKey(key);
    setTodoOverviewVisible(true);
  }

  const changePage = val => {
    setPage(val);
  };

  const changeText = val => {
    setText(val);
  };

  const getWords = () => {
    if(language === 'de'){
      return de;
    } else{
      return en;
    }
  }


  //Todos und Done verwalten

  const changeName = (key, newText) => {

  };

  const addTodo = text => {
    if (text.length >= 3) {

      setTodos(prevTodos => {
        return [{key: new Date().getTime(), text: text}, ...prevTodos];
      });
      changeText('');
    } else {
      /*setAlertModalVisible(true);
      setTimeout(() =>setAlertModalVisible(false), 700);*/
      ToastAndroid.show(getWords().alert, 700);
    }
  };

  const removeTodo = (key, text) => {
    addDone(text);
    setTodos(prevTodos => {
      return prevTodos.filter(todos => todos.key !== key);
    });
  };


  const deleteTodo = (key) => {
    setTodoOverviewVisible(false);
    setTodos(prevTodos => {
      return prevTodos.filter(todos => todos.key !== key);
    })

  };


  const addDone = text => {
    setDone(prevDone => {
      return [{key: new Date().getTime(), text: text}, ...prevDone];
    });
  };

  const removeDone = key => {
    setDone(prevDone => {
      return prevDone.filter(done => done.key !== key);
    });
  };

  //Daten speichern

  const storage = new MMKV();


  useEffect(() => {
    const init = async () => {
      getData();
    }
    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
    })
  }, []);

  useEffect(() => {
    saveData();
  }, [darkMode, amoled, done, todos, language]);

  useEffect(() => {
    SystemNavigationBar.setNavigationColor(darkMode ? (amoled ? darkColors.amoled : darkColors.background) : lightColors.background);
    setStatusBarStyle('dark-content');
    setTimeout(() => setStatusBarStyle('light-content'), 1);
  }, [darkMode, amoled]);


  const todosKey = '@todos';
  const darkModeKey = '@darkMode';
  const doneKey = '@done';
  const amoledKey = '@amoled';
  const languageKey = '@language';

  const saveData = () => {
    storage.set(todosKey, JSON.stringify(todos));
    storage.set(doneKey, JSON.stringify(done));
    storage.set(darkModeKey, JSON.stringify(darkMode));
    storage.set(amoledKey, JSON.stringify(amoled));
    storage.set(languageKey, JSON.stringify(language));
  };

  const getData = () => {
    try {
      const todosValue = storage.getString(todosKey);
      const darkModeValue = storage.getString(darkModeKey);
      const doneValue = storage.getString(doneKey);
      const amoledValue = storage.getString(amoledKey)
      const languageValue = storage.getString(languageKey)
      if (todosValue !== null) {
        setTodos(JSON.parse(todosValue));
      }
      if (darkModeValue !== null) {
        setDarkMode(JSON.parse(darkModeValue));
      }
      if(doneValue !== null){
        setDone(JSON.parse(doneValue));
      }
      if(amoledValue !== null){
        setAmoled(JSON.parse(amoledValue));
      }
      if(languageValue !== null){
        setLanguage(JSON.parse(languageValue));
      }
    } catch(e){
      console.log('Data access error. Maybe it´s the first time the app is open on this device.');
    }
  };

  //App rendern

    return (
      <View style={darkMode ? (amoled ? styles.containerAmoledMode : styles.containerDarkMode) : styles.containerLightMode}>
        <AlertModal
          darkMode={darkMode}
          amoled={amoled}
          modalVisible={alertModalVisible}
          setModalVisible={setAlertModalVisible}
          onModalShow={() => setTimeout(() => setAlertModalVisible(false), 500)}
          language={language}
        />
        <StatusBar
            translucent
            backgroundColor={darkMode ? (amoled ? darkColors.amoled : darkColors.header) : lightColors.header}
            barStyle={statusBarStyle}
        />
        <Header
            style={{flex: 1}}
            changeMode={changeMode}
            showSettings={changeSettingsVisible}
            settingsVisible={settingsVisible}
            toggleAmoled={toggleAmoled}
            darkMode={darkMode}
            amoled={amoled}
            page={page}
            language={language}
            todoOverviewVisible={todoOverviewVisible}
            todoName={currentToDo}
            setTodoOverviewVisible={setTodoOverviewVisible}
        />
        {settingsVisible ?
            <Settings
                changeSettingsVisible={changeSettingsVisible}
                darkMode={darkMode}
                amoled={amoled}
                changeLanguage={changeLanguage}
                language={language}
            />
            :
            todoOverviewVisible ?
                  <ToDoOverview
                      darkMode={darkMode}
                      deleteToDo={deleteTodo}
                      name={currentToDo}
                      key={currentToDoKey}
                  />
                  :
                  <View/>

        }

            <ToDoApp
                addTodo={addTodo}
                todos={todos}
                removeTodo={removeTodo}
                done={done}
                addDone={addDone}
                removeDone={removeDone}
                darkMode={darkMode}
                amoled={amoled}
                language={language}
                page={page}
                changeText={changeText}
                changePage={changePage}
                text={text}
                settingsVisible={settingsVisible}
                todoOverviewVisible={todoOverviewVisible}
                showCurrentToDo={showCurrentToDo}
            />


      </View>
  /*<SettingsModal
      darkMode={darkMode}
      amoled={amoled}
      changeLanguage={changeLanguage}
      changeModalVisible={changeSettingsModalVisible}
      modalVisible={settingsModalVisible}
      style={{flex: 1}}
  />*/
    );


  //Ausgelagerte Components zum Rendern



}

//Styles
const statusBarHeight = StatusBar.currentHeight;

const styles = StyleSheet.create({
  containerLightMode: {
    paddingTop: statusBarHeight,
    flex: 1,
    backgroundColor: lightColors.background,
  },
  containerDarkMode: {
    paddingTop: statusBarHeight,
    flex: 1,
    backgroundColor: darkColors.background,
  },
  containerAmoledMode: {
    paddingTop: statusBarHeight,
    flex: 1,
    backgroundColor: darkColors.amoled,
  },
  modeChangeScreen:{
    position: 'absolute',
    flex: 5,
    backgroundColor: lightColors.foreground,
  }
});
