import React from "react";
import notifee, {AndroidStyle, TriggerType} from '@notifee/react-native';
import {getWords} from "./DataHandler";
import {TimestampTrigger} from "@notifee/react-native";
import {ToastAndroid} from "react-native";

export async function onDisplayNotification(item, timestamp, language) {
    await notifee.requestPermission()

    const channelId = await notifee.createChannel({
        id: 'todo',
        name: 'ToDo',
    });

    let priority;

    if (item.priority === 0) {
        priority = getWords(language).low
    } else if (item.priority === 1) {
        priority = getWords(language).medium
    } else {
        priority = getWords(language).high
    }

    if(timestamp < Date.now()){
        ToastAndroid.show(getWords(language).alert_notification_to_late, ToastAndroid.LONG);
        return;
    }

    const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: timestamp,
    };

    await notifee.createTriggerNotification(
        {
            id: item.key + '-todo',
            title: 'Aufgabe fällig',
            body: item.name,
            android: {
                channelId,
                showTimestamp: true,
                style: {
                    type: AndroidStyle.INBOX,
                    lines: [item.name, 'Priorität: ' + priority],
                },
            },
        },
        trigger,
    );

}