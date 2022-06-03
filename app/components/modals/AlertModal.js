import React from "react";
import {StyleSheet, Text} from "react-native";
import Modal from "react-native-modal";
import {darkColors, lightColors} from "../constants/ColorThemes";
import {de, en, fr} from "../constants/Languages";

export default function AlertModal({modalVisible, darkMode, setModalVisible, amoled, onModalShow, language}) {

  const getWords = () => {
    if(language === 'de'){
      return de;
    } else if(language === 'fr'){
      return fr;
    } else{
      return en;
    }
  }

  return (
    <Modal
      isVisible={modalVisible}
      animationIn={'zoomIn'}
      animationInTiming={300}
      animationOut={'zoomOut'}
      animationOutTiming={300}
      backdropColor={'rgba(0, 0, 0, 0)'}
      onBackdropPress={() => setModalVisible(false)}
      style={darkMode ? (amoled ? styles.alertModalAmoled : styles.alertModalDark) : styles.alertModalLight}
      onModalShow={() => onModalShow}
      hideModalContentWhileAnimating={true}
      backdropTransitionOutTiming={0}
      children={
        <Text style={darkMode ? styles.fontDark : styles.fontLight}>{getWords().button}</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  alertModalLight:{
    position: 'absolute',
    backgroundColor: lightColors.background,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
    height: 60,
    borderRadius: 10,
    bottom: 20,
    shadowColor: lightColors.shadow,
    elevation: 4,
    fontColor: lightColors.text,
  },
  alertModalDark:{
    position: 'absolute',
    backgroundColor: darkColors.modal,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
    height: 60,
    borderRadius: 10,
    bottom: 20,
    color: darkColors.text,
  },
  alertModalAmoled:{
    position: 'absolute',
    backgroundColor: darkColors.background,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
    height: 60,
    borderRadius: 10,
    bottom: 20,
    color: darkColors.text,
  },
  fontLight:{
    color: lightColors.text,
  },
  fontDark:{
    color: darkColors.text,
  },
});
