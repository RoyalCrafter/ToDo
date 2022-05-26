import React, {useEffect, useState} from 'react';

import {MMKV} from 'react-native-mmkv';
import {darkColors, lightColors} from './app/colorThemes';
import ToDoScreen from './app/screens/ToDoScreen';
import SettingsModal from "./app/components/modals/SettingsModal";
import AlertModal from "./app/components/modals/AlertModal";
import Header from './app/components/Header';
import DoneScreen from './app/screens/DoneScreen';
import {Dimensions, StatusBar, StyleSheet, View, ToastAndroid} from "react-native";
import PagerView from 'react-native-pager-view';
import AnimatedSplash from "react-native-animated-splash-screen";

export default function App() {
  //Variablen und Arrays

  const [todos, setTodos] = useState([
    {key: 1, text: 'Hausaufgaben'},
    {key: 2, text: 'Gitarre spielen'},
    {key: 3, text: 'App programmieren'},
    {key: 4, text: 'Sport machen'},
  ]);
  const [done, setDone] = useState([
    {key: 1, text: 'Kaffee kaufen'},
    {key: 2, text: 'Gitarre spielen'},
    {key: 3, text: 'App programmieren'},
    {key: 4, text: 'Sport machen'},
  ]);
  const [text, setText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [amoled, setAmoled] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);


  const width = Dimensions.get('window').width;

  //Handler für alle Components

  const changeMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  const toggleAmoled = () => {
    setAmoled(prevAmoled => !prevAmoled);
    console.log('amoled');
  }

  const changeSettingsModalVisible = () => {
    setSettingsModalVisible(prevSettingsModalVisible => !prevSettingsModalVisible);
  };


  const changePage = val => {
    setPageTitle(val);
  };

  const changeText = val => {
    setText(val);
  };

  //Todos und Done verwalten

  const addTodo = text => {
    if (text.length > 3) {
      setTodos(prevTodos => {
        return [{key: Math.random(), text: text}, ...prevTodos];
      });
      changeText('');
    } else {
      /*setAlertModalVisible(true);
      setTimeout(() =>setAlertModalVisible(false), 700);*/
      ToastAndroid.show("Das ToDo muss länger als 3 Zeichen sein.", 700);
    }
  };

  const removeTodo = (key, text) => {
    addDone(text);
    setTodos(prevTodos => {
      return prevTodos.filter(todos => todos.key !== key);
    });
  };

  const addDone = text => {
    setDone(prevDone => {
      return [{key: Math.random(), text: text}, ...prevDone];
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
    getData();
    setTimeout(() => setLoaded(true), 500);
  }, []);

  useEffect(() => {
    saveData();
  }, [darkMode, amoled, done, todos])

  const todosKey = '@todos';
  const darkModeKey = '@darkMode';
  const doneKey = '@done';
  const amoledKey = '@amoled';

  const saveData = () => {
    storage.set(todosKey, JSON.stringify(todos));
    storage.set(doneKey, JSON.stringify(done));
    storage.set(darkModeKey, JSON.stringify(darkMode));
    storage.set(amoledKey, JSON.stringify(amoled));
  };

  const getData = () => {
    try {
      const todosValue = storage.getString(todosKey);
      const darkModeValue = storage.getString(darkModeKey);
      const doneValue = storage.getString(doneKey);
      const amoledValue = storage.getString(amoledKey)
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
    } catch(e){
      console.log('Data access error. Maybe it´s the first time the app is open on this device.');
    }
  };

  //App rendern

    return (
        <AnimatedSplash
            translucent={true}
            isLoaded={loaded}
            logoImage={require("./assets/ToDo-Logo_2.png")}
            backgroundColor={lightColors.foreground}
            logoHeight={250}
            logoWidth={250}
        >
      <View style={darkMode ? (amoled ? styles.containerAmoledMode : styles.containerDarkMode) : styles.containerLightMode}>
        <SettingsModal
          darkMode={darkMode}
          amoled={amoled}
          changePage={changePage}
          changeModalVisible={changeSettingsModalVisible}
          modalVisible={settingsModalVisible}
        />
        <AlertModal
          darkMode={darkMode}
          amoled={amoled}
          modalVisible={alertModalVisible}
          setModalVisible={setAlertModalVisible}
          onModalShow={() => setTimeout(() => setAlertModalVisible(false), 500)}
        />
        <StatusBar
          translucent
          backgroundColor={darkMode ? (amoled ? darkColors.amoled : darkColors.header) : lightColors.header}
        />
        <Header
          style={styles.header}
          changeMode={changeMode}
          showSettings={() => (console.log('')) /*TODO: Funktion zum Settings anzeigen einfügen*/}
          toggleAmoled={toggleAmoled}
          darkMode={darkMode}
          amoled={amoled}
          pageTitle={pageTitle}
        />
        <PagerView initialPage={0} style={{flex: 1}} onPageSelected={() => changePage(pageTitle === 'ToDo' ? 'Erledigt' : 'ToDo')}>
          <View key={0}>
            <ToDoScreen
                addTodo={addTodo}
                changeText={changeText}
                removeTodo={removeTodo}
                darkMode={darkMode}
                todos={todos}
                text={text}
            />
          </View>
          <View key={1}>
            <DoneScreen
                removeDone={removeDone}
                darkMode={darkMode}
                done={done}
            />
          </View>
        </PagerView>

      </View>
        </AnimatedSplash>
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
  header: {
    flex: 1,
  },
});
