import React from "react";
import {StyleSheet, View, Text} from "react-native";
import {darkColors} from "../constants/ColorThemes";

export default function NotificationItem({darkMode, date}) {
    return (
        <View style={styles.notificationItem}>
            <Text>{new Date(date).toLocaleString()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    notificationItem: {
        backgroundColor: darkColors.inputFieldBorder,
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
})