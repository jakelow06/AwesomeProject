import * as React from 'react';

import { View, ScrollView, Text, TextInput, Image, StyleSheet, FlatList, Button } from "react-native";
import { setLightEstimationEnabled } from 'expo/build/AR';

import * as firebase from 'firebase';
import { UpdateEventType } from 'expo-updates';

export default function ProfileScreen() {
    const [value, onChangeText] = React.useState('placeholder');
    const [itemList, updateItemList] = React.useState([]);
    
    var currentDbItems = firebase.database();
    currentDbItems.ref('items').once('value').then((snapshot) => {
        var itemsFromDb = [];
        snapshot.forEach((item) => {
            let dbItem = {
                'key': item.key,
                'value': item.val()
            }
            itemsFromDb.push(dbItem);
        });
        
        updateItemList(itemsFromDb);
    });

    const deleteItemValue = (value) => {
        currentDbItems.ref('items/' + value['key']).remove((error) => {console.log(error);});
    }

    const writeItemValue = (value) => {
        console.log("writeItemValue called");
        var newItemKey = currentDbItems.ref().child('items').push().key;
        var item = {};
        item['/items/' + newItemKey] = value;
        currentDbItems.ref().update(item);
        return newItemKey;
    };


    const addItemHandler = () => {
        console.log("addItemHandler called");
        //console.log("value: " + value);
        var itemKey = writeItemValue(value);
        var listItem = {
            'key': itemKey,
            'value': value
        };
        updateItemList(currentList => [...currentList, listItem]);
        
    };

    const itemButtonPressHandler = (val) => {
        console.log("item button pressed! " + val);
    };

    return (
        <ScrollView>
            <View style={styles.nameAndPicture}>
             <Image
              source={{uri:"https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"}}
              style={{width:100, height:100}}
             />
             <View style={{flexDirection: 'column', justifyContent: 'center'}}>
              <Text>(Name here)</Text>
              <Text>(Location here)</Text>
             </View>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
             <TextInput 
               style={styles.textInput}
               onChangeText={text => onChangeText(text)}
             />
             <Button title="ADD" onPress={addItemHandler} />
            </View>
            <View>
             {itemList.map((item) => 
                <Button key={item['key']}
                    title={item['value']}
                    style={styles.item}
                    onPress={itemButtonPressHandler}
                    onPress={() => deleteItemValue(item)} />
             )}
            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    nameAndPicture: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    item: {
        borderWidth: 2,
        padding: 10,
        justifyContent: 'center',
        backgroundColor: 'white',
        marginVertical: 10
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        justifyContent: 'flex-end',
        flex: 2
    }
});