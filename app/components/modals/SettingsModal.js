import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {darkColors, lightColors} from "../../colorThemes";
import Modal from "react-native-modal";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function SettingsModal({modalVisible, amoled, changeModalVisible, darkMode, changePage}) {
  return (
    <Modal
      isVisible={modalVisible}
      animationIn={'slideInLeft'}
      animationInTiming={200}
      animationOut={'slideOutLeft'}
      animationOutTiming={200}
      children={
        <View>
          <TouchableOpacity
            onPress={() => changePage('ToDo')}
            style={styles.button}>
            <View>
              <MaterialCommunityIcons name={'clipboard-clock-outline'} size={30} color={darkMode ? darkColors.icon : lightColors.icon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changePage('Erledigt')}
            style={styles.button}>
            <View>
              <MaterialCommunityIcons name={'clipboard-check-outline'} size={30} color={darkMode ? darkColors.icon : lightColors.icon} />
            </View>
          </TouchableOpacity>
        </View>
      }
      onBackButtonPress={changeModalVisible}
      onBackdropPress={changeModalVisible}
      backdropColor={darkColors.background}
      style={darkMode ? (amoled ? styles.modalAmoled : styles.modalDark) : styles.modalLight}
      hideModalContentWhileAnimating={true}
      useNativeDriver={false}
      useNativeDriverForBackdrop={false}
      backdropTransitionOutTiming={0}
    />
  );
}

// noinspection JSUnresolvedFunction
const styles = StyleSheet.create({
  modalLight: {
    position: 'absolute',
    backgroundColor: lightColors.background,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 240,
    borderRadius: 100,
    left: 0,
  },
  modalDark: {
    position: 'absolute',
    backgroundColor: darkColors.modal,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 240,
    borderRadius: 100,
    left: 0,
  },
  modalAmoled: {
    position: 'absolute',
    backgroundColor: darkColors.background,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 240,
    borderRadius: 100,
    left: 0,
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
