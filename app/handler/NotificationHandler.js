import React from "react";
import notifee from '@notifee/react-native';

const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
});

export const displayNotification = async () => {
// Display a notification
    await notifee.displayNotification({
        title: 'ToDo',
        body: 'Main body content of the notification',
        android: {
            channelId,
            // pressAction is needed if you want the notification to open the app when pressed
            pressAction: {
                id: 'default',
            },
        },
    });
}