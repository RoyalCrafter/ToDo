import React from "react";
import notifee, {AndroidCategory, AndroidImportance, AndroidStyle, TriggerType} from '@notifee/react-native';
import {getItemData, getWords} from "./DataHandler";
import {TimestampTrigger} from "@notifee/react-native";

export async function onDisplayNotification(item, date, language) {
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



    const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: new Date(date).getTime(),
    };

    await notifee.createTriggerNotification(
        {
            id: item.key + '-todo',
            title: 'Aufgabe fällig',
            body: item.text + ', ' + priority,
            android: {
                channelId,
                showTimestamp: true,
                style: {
                    type: AndroidStyle.INBOX,
                    lines: [item.text, 'Priorität: ' + priority],
                },
            },
        },
        trigger,
    );
    console.log('created trigger wait time: ' + trigger.timestamp + ' ' + Date.now() + ' ' + item.duration + ' ' + item.date)

}