import * as React from 'react';

import { View, ScrollView, Text, TextInput, Image, StyleSheet, FlatList, Button } from "react-native";
import { setLightEstimationEnabled } from 'expo/build/AR';

import Fire from '../Fire';

export default function ProfileScreen() {
    const [value, onChangeText] = React.useState('placeholder');
    const [itemList, updateItemList] = React.useState([]);

    const addItemHandler = () => {
        updateItemList(currentList => [...currentList, value]);
        console.log(itemList)
    };

    const itemButtonPressHandler = () => {
        console.log("item button pressed!");
    }

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
              <Text>Fire.shared.uid</Text>
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
                <Button key={item}
                    title={item}
                    style={styles.item}
                    onPress={itemButtonPressHandler} />
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