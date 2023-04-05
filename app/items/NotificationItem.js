import React from "react";
import {StyleSheet, View, Text} from "react-native";
import {darkColors, lightColors} from "../constants/ColorThemes";

export default function NotificationItem({darkMode, timestamp}) {
    return (
        <View style={styles(darkMode).notificationItem}>
            <Text style={styles(darkMode).dateText}>{new Date(timestamp).toLocaleString()}</Text>
        </View>
    );
}

const styles = (darkMode) => StyleSheet.create({
    notificationItem: {
        backgroundColor: darkMode ? darkColors.modal : lightColors.inputFieldBorder,
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    dateText:{
        color: darkMode ? darkColors.text : lightColors.text,
    }
})