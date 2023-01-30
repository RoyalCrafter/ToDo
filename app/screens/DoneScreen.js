import React from "react";
import {FlatList, StyleSheet, View} from "react-native";
import DoneItem from "../items/DoneItem";
import {deleteDone} from "../handler/ItemHandler";

export default function DoneScreen({darkMode, done, showCurrentItem, setDone, setItemOverviewVisible}){
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
                                pressHandler={() => deleteDone(item.key, setDone, setItemOverviewVisible)}
                                darkMode={darkMode}
                                showCurrentItem={showCurrentItem}
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
