
import React from "react";
import {StyleSheet, View} from "react-native";
import {darkColors, lightColors} from "../constants/ColorThemes";
import Modal from "react-native-modal";

export default function SettingsModal({modalVisible, amoled, changeModalVisible, darkMode, changeLanguage}) {
  return (
      <Modal
        isVisible={modalVisible}
        animationIn={'slideInLeft'}
        animationInTiming={200}
        animationOut={'slideOutLeft'}
        animationOutTiming={200}
        children={
          <View>

          </View>
        }
        onBackButtonPress={changeModalVisible}
        onBackdropPress={changeModalVisible}
        backdropColor={darkColors.background}
        style={darkMode ? (amoled ? styles.modalAmoled : styles.modalDark) : styles.modalLight}
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
      />
  );
}

// noinspection JSUnresolvedFunction
const styles = StyleSheet.create({
  modalLight: {
    backgroundColor: lightColors.background,
    flex: 1,
  },
  modalDark: {
    backgroundColor: darkColors.modal,
  },
  modalAmoled: {
    backgroundColor: darkColors.background,
  },
  button: {
    backgroundColor: lightColors.button,
    padding: 15,
    alignItems: 'center',
    borderRadius: 100,
    shadowColor: '#000',
    elevation: 4,
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 16,
  },
});
