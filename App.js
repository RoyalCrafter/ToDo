import React, {useEffect, useState} from 'react';

import {darkColors, lightColors} from './app/constants/ColorThemes';
import Header from './app/components/Header';
import {
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import RNBootSplash from "react-native-bootsplash";
import Settings from "./app/screens/Settings";
import SystemNavigationBar from 'react-native-system-navigation-bar';
import useColorScheme from "react-native/Libraries/Utilities/useColorScheme";
import ItemOverview from "./app/screens/ItemOverview";
import {saveData, getData} from "./app/handler/DataHandler";
import PagerView from "react-native-pager-view";
import ToDoScreen from "./app/screens/ToDoScreen";
import DoneScreen from "./app/screens/DoneScreen";
import EditOverview from "./app/screens/EditOverview";
import {displayNotification} from "./app/handler/NotificationHandler";
//import BackgroundFetch from "react-native-background-fetch";


const STYLES = ['default', 'dark-content', 'light-content'];

export default function App() {

  const [todos, setTodos] = useState([]);
  const [done, setDone] = useState([]);
  const [darkMode, setDarkMode] = useState(useColorScheme() !== 'light');
  const [amoled, setAmoled] = useState(false);
  const [page, setPage] = useState('');
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [language, setLanguage] = useState('de');
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [itemOverviewVisible, setItemOverviewVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState({key: ' ', text: ' ', description: ' ', priority: 0, date: 0, duration: 0, isTodo: true});
  const [value, setValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(0);
  const [date, setDate] = useState(new Date(0));
  const [duration, setDuration] = useState(0);



  const changeMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  const toggleAmoled = () => {
    setAmoled(prevAmoled => !prevAmoled);
  }

  const changeSettingsVisible = () => {
    setSettingsVisible(prevSettingsVisible => !prevSettingsVisible);
  };

  const changeLanguage = val => {
    setLanguage(val);
  }

  const changePage = val => {
    setPage(val);
  };

  const showCurrentItem = (item, isToDo) => {
    setCurrentItem({key: item.key, text: item.text, description: item.description, priority: item.priority, date: item.date, duration: item.duration, isToDo: isToDo});
    setItemOverviewVisible(true);
  }


  useEffect(() => {
    console.log("dsgfg");
    const init = async () => {
      console.log("dsgfg");
      //initBackgroundFetch();
      getData(setTodos, setDone, setDarkMode, setAmoled, setLanguage);
      console.log("dsgfg");
    }
    init().finally(async () => {
      console.log("dsgfg");
      await RNBootSplash.hide({fade: true});
      console.log("dsgfg");
    })
  }, []);

  useEffect(() => {
    saveData(todos, done, darkMode, amoled, language);
  }, [darkMode, amoled, done, todos, language, value]);

  useEffect(() => {
    SystemNavigationBar.setNavigationColor(darkMode ? (amoled ? darkColors.amoled : darkColors.background) : lightColors.background);
    setStatusBarStyle('dark-content');
    setTimeout(() => setStatusBarStyle('light-content'), 1);
  }, [darkMode, amoled]);

  useEffect(() => {
    todos.forEach((item) => {
      //if(new Date(item.date).getTime() !== 0) {
        if (new Date(item.date).getTime() - item.duration < Date.now()) {
          displayNotification().then(r => (console.log(r)));
        }
      //}
    })
  });

  /*const initBackgroundFetch = async () => {
    // BackgroundFetch event handler.
    const onEvent = async (taskId) => {
      console.log('[BackgroundFetch] task: ', taskId);
      // Do your background work...

      // IMPORTANT:  You must signal to the OS that your task is complete.
      BackgroundFetch.finish(taskId);
    }

    // Timeout callback is executed when your Task has exceeded its allowed running-time.
    // You must stop what you're doing immediately BackgroundFetch.finish(taskId)
    const onTimeout = async (taskId) => {
      console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
      BackgroundFetch.finish(taskId);
    }

    // Initialize BackgroundFetch only once when component mounts.
    let status = await BackgroundFetch.configure({minimumFetchInterval: 15}, onEvent, onTimeout);

    console.log('[BackgroundFetch] configure status: ', status);
  }*/



    return (
      <View style={darkMode ? (amoled ? styles.containerAmoledMode : styles.containerDarkMode) : styles.containerLightMode}>
        <Header
            style={{flex: 1}}
            changeMode={changeMode}
            toggleAmoled={toggleAmoled}
            showSettings={changeSettingsVisible}
            settingsVisible={settingsVisible}
            darkMode={darkMode}
            amoled={amoled}
            page={page}
            language={language}
            itemOverviewVisible={itemOverviewVisible}
            todoName={currentItem.text.length > 15 ? currentItem.text.substring(0, 14) + '...' : currentItem.text}
            setItemOverviewVisible={setItemOverviewVisible}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
        />
        <StatusBar
            translucent
            backgroundColor={darkMode ? (amoled ? darkColors.amoled : darkColors.header) : lightColors.header}
            barStyle={statusBarStyle}
        />
        {settingsVisible ?
            <Settings
                darkMode={darkMode}
                changeLanguage={changeLanguage}
                language={language}
                todos={todos}
                done={done}
                setDone={setDone}
                setTodos={setTodos}
                style={{flex: 1}}
            />
            :
            itemOverviewVisible ?
                  <ItemOverview
                      darkMode={darkMode}
                      item={currentItem}
                      language={language}
                      setItemOverviewVisible={setItemOverviewVisible}
                      todos={todos}
                      setValue={setValue}
                      setDone={setDone}
                      setTodos={setTodos}
                      isEditing={isEditing}
                      setIsEditing={setIsEditing}
                  />
                  :
                  isEditing ?
                    <EditOverview
                        darkMode={darkMode}
                        language={language}
                        setIsEditing={setIsEditing}
                        item={undefined}
                        setItemOverviewVisible={setItemOverviewVisible}
                        todos={todos}
                        setValue={setValue}
                        isNewItem={true}
                        setTodos={setTodos}
                        name={name}
                        description={description}
                        priority={priority}
                        date={date}
                        duration={duration}
                        setName={setName}
                        setDescription={setDescription}
                        setPriority={setPriority}
                        setDate={setDate}
                        setDuration={setDuration}
                    />
                    :
                    <View/>

        }


        <PagerView initialPage={0} style={{flex: 1}} onPageSelected={() => changePage(page === 'todo' ? 'done' : 'todo')}>
          <View key={0}>
            {settingsVisible || itemOverviewVisible ?
                <View />
                :
                <ToDoScreen
                    darkMode={darkMode}
                    todos={todos}
                    language={language}
                    showCurrentItem={showCurrentItem}
                    setTodos={setTodos}
                    setDone={setDone}
                    setItemOverviewVisible={setItemOverviewVisible}
                    setIsEditing={setIsEditing}
                    name={name}
                    setName={setName}
                />
            }
          </View>
          <View key={1}>
            {settingsVisible || itemOverviewVisible ?
                <View />
                :
                <DoneScreen
                    darkMode={darkMode}
                    done={done}
                    showCurrentItem={showCurrentItem}
                    setDone={setDone}
                    setItemOverviewVisible={setItemOverviewVisible}
                />
            }
          </View>
        </PagerView>
      </View>
    );



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
