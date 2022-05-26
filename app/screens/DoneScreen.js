import React from "react";
import {FlatList, StyleSheet, View} from "react-native";
import DoneItem from "../components/items/DoneItem";

export default function DoneScreen({darkMode, done, removeDone}){
    return(
        <View style={styles.view}>
            <View style={styles.content}>
                <View style={styles.list}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => (<View style={{height: 17}}/>)}
                        data={done}
                        renderItem={({item}) => (
                            <DoneItem
                                item={item}
                                pressHandler={() => removeDone(item.key)}
                                darkMode={darkMode}
                            />
                        )}
                        keyExtractor={item => item.key}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view:{
        flex: 1,
    },
    content: {
        //paddingVertical: 20,
        paddingTop: 20,
        padding: 40,
        flex: 100,
    },
    list: {
        marginTop: 20,
        flex: 1,
        flexGrow: 1,
    },
});
