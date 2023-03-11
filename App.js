import React, {useEffect, useState} from 'react';

import {darkColors, lightColors} from './app/constants/ColorThemes';
import Header from './app/components/Header';
import {
  BackHandler,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import RNBootSplash from "react-native-bootsplash";
import Settings from "./app/screens/Settings";
import SystemNavigationBar from 'react-native-system-navigation-bar';
import useColorScheme from "react-native/Libraries/Utilities/useColorScheme";
import ItemOverview from "./app/screens/ItemOverview";
import {saveData, getData, getItemData, saveItemData, clear, convertDataFormat} from "./app/handler/DataHandler";
import PagerView from "react-native-pager-view";
import ToDoScreen from "./app/screens/ToDoScreen";
import DoneScreen from "./app/screens/DoneScreen";
import EditOverview from "./app/screens/EditOverview";
import {onDisplayNotification} from "./app/handler/NotificationHandler";
import notifee, {EventType} from "@notifee/react-native";
import {isToDo} from "./app/handler/ItemHandler";
import {version as app_version}  from './package.json';


const STYLES = ['default', 'dark-content', 'light-content'];


export default function App() {

  const [todos, setTodos] = useState([]);
  const [done, setDone] = useState([]);
  const [darkMode, setDarkMode] = useState(useColorScheme() !== 'light');
  const [amoled, setAmoled] = useState(false);
  const [page, setPage] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [language, setLanguage] = useState('de');
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [itemOverviewVisible, setItemOverviewVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState({key: '', name: '', priority: 0, isToDo: true});
  const [value, setValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(0);
  const [date, setDate] = useState(new Date(0));
  const [duration, setDuration] = useState(0);
  const pagerRef = React.useRef(PagerView);

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



  const showCurrentItem = (item) => {
    setCurrentItem({key: item.key, name: item.name, priority: item.priority, isToDo: isToDo(item, todos)});
    setItemOverviewVisible(true);
  }


  useEffect(() => {
    const init = async () => {
      if(app_version === "1.3.0"){
        await convertDataFormat(setTodos, setDone, setDarkMode, setAmoled, setLanguage);
      }
      getData(setTodos, setDone, setDarkMode, setAmoled, setLanguage);
    }
    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
    })
  }, []);


  useEffect(() => {}, [settingsVisible, itemOverviewVisible, isEditing]);

  //Create BackHandler
  useEffect(() => {
    const backAction = () => {
      console.log(settingsVisible + ' ' + isEditing + ' ' + itemOverviewVisible + ' ' + page)
      if(settingsVisible) {
        console.log('settingsVisible: ' + settingsVisible)
        setSettingsVisible(false);
        setValue(value + 1);
        return true;
      }else if(isEditing) {
        console.log('isEditing: ' + isEditing)
        setIsEditing(false);
        setValue(value + 1);
        return true;
      }else if(itemOverviewVisible) {
        console.log('itemOverviewVisible: ' + itemOverviewVisible)
        setItemOverviewVisible(false);
        setValue(value + 1);
        return true;
      }else if (!page) {
        setPage(false)
        pagerRef.current.setPage(0);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    return () => backHandler.remove();
  }, []);


  useEffect(() => {
    saveData(todos, done, darkMode, amoled, language);
  }, [darkMode, amoled, done, todos, language, value]);

  useEffect(() => {
    SystemNavigationBar.setNavigationColor(darkMode ? (amoled ? darkColors.amoled : darkColors.background) : lightColors.background);
    setStatusBarStyle('dark-content');
    setTimeout(() => setStatusBarStyle('light-content'), 1);
  }, [darkMode, amoled]);

  /*useEffect(() => {
    todos.forEach((item) => {
      if(new Date(item.date).getTime() !== 0) {
        if (new Date(item.date).getTime() - item.duration < Date.now()) {
          onDisplayNotification(item, language);
        }
      }
    })
  });*/



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
            todoName={currentItem.name.length > 20 ? currentItem.name.substring(0, 19) + '...' : currentItem.name}
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


        <PagerView initialPage={0} style={{flex: 1}} ref={pagerRef} onPageSelected={() => setPage(!page)}>
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
