/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

import ListItem from '../components/ListItem';
import LinearGradient from 'react-native-linear-gradient';

const ResultScreen = props => {
    const [predictedResults, setPredictedResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [empty, setEmpty] = useState(false);
    const isFocused = useIsFocused();

    //remove item from local storage
    const deleteItem = async (key) => {
        //filter data
        const newData = predictedResults.filter((item) => predictedResults.indexOf(item) !== key);
        try {
            await AsyncStorage.removeItem('LungCancerResults');
            if (newData.length > 0) {
                await AsyncStorage.setItem('LungCancerResults', JSON.stringify(newData));
            }
            getData();
        } catch (error) {
            console.log(error);
        }
    };

    const deletAll = async () => {
        //confirm delete
        Alert.alert(
            'Delete All',
            'Do you want to delete all the data?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        setLoading(true);
                        AsyncStorage.removeItem('LungCancerResults');
                        setLoading(false);
                        getData();
                    },
                },
            ],
            { cancelable: false },
        );
    };

    //get data from local storage
    const getData = async () => {
        setLoading(true);
        try {
            const data = await AsyncStorage.getItem('LungCancerResults');
            if (data !== null) {
                setPredictedResults(JSON.parse(data));
                setLoading(false);
                setEmpty(false);
            } else {
                setLoading(false);
                setEmpty(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getData();
    }, [isFocused]);

    const onPress = (item) => {
        props.navigation.navigate('UserResult', { item, key: predictedResults.indexOf(item), predictedResults });
    };

    return (
        <LinearGradient colors={['#26D0CE', '#1A2980']}  style={styles.container}>
            {loading ? <ActivityIndicator style={styles.emptyTextView} size="large" color="white" /> : empty ? <View style={styles.emptyTextView}>
                <Text style={styles.emptyText}>Predicted result is not available!</Text>
                <Text style={styles.emptyText1}>Please predict first!</Text>
                <TouchableOpacity
                    style={styles.btnView}
                    onPress={() => props.navigation.navigate('Predict')}>
                    <Text style={styles.btnText}>Predict Lung Cancer</Text>
                </TouchableOpacity>
            </View> :
                <View style={styles.list}>
                    <FlatList
                        data={predictedResults}
                        renderItem={({ item, index }) =>
                            <ListItem item={item} handledelete={() => deleteItem(index)} onPress={onPress} />
                        }
                        keyExtractor={(item, index) => index.toString()}
                        marginTop={10}
                        style={styles.listView}
                    />
                    <TouchableOpacity style={styles.deleteButton} onPress={() => deletAll()}>
                        <Text style={styles.deleteText}>Delete All</Text>
                    </TouchableOpacity>
                </View>
            }
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    bodyTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        alignSelf: 'center',
        textAlign: 'center',
    },
    item: {
        backgroundColor: '#070724',
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        color: 'white',
        fontSize: 18,
        alignSelf: 'center',
        textAlign: 'justify',
    },
    emptyText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'justify',
    },
    emptyTextView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButton: {
        borderWidth: 1,
        borderColor: 'tomato',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        width: '50%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 10,
    },
    deleteText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
    },
    list: {
        flex: 1,
    },
    listView: {
        flex: 1,
        paddingBottom: 20,
    },
    btnView: {
        // backgroundColor: '#070724',
        height: 40,
        width: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
      borderColor: '#000',
        marginTop: 40,
    },
    btnText: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
    },
    emptyText1: {
        color: 'black',
        fontSize: 18,
        textAlign: 'justify',
    },
});

export default ResultScreen;
