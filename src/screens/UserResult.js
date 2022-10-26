/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const UserResult = props => {
    const { item, key, predictedResults } = props.route.params;

    //remove item from local storage
    const deleteItem = async () => {
        //confirm delete
        Alert.alert(
            'Delete',
            'Do you want to delete this result?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        //filter data
                        const newData = predictedResults.filter((items) => predictedResults.indexOf(items) !== key);
                        try {
                            AsyncStorage.removeItem('LungCancerResults');
                            if (newData.length > 0) {
                                AsyncStorage.setItem('LungCancerResults', JSON.stringify(newData));
                            }
                            props.navigation.navigate('ResultScreen');
                        } catch (error) {
                            console.log(error);
                        }
                    },
                },
            ],
            { cancelable: false },
        );
    };

    return (
        <LinearGradient colors={['#26D0CE', '#1A2980']} style={styles.container}>
            <ScrollView style={styles.resultView}>
                <Text style={styles.patientName}>Predicted Result of Lung Cancer</Text>
                <Text style={styles.date}>{item.date}</Text>
                <View style={styles.br} />

                {/* Crerate table */}
                <View style={styles.table}>
                    <View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>NAME</Text>
                            <Text style={styles.tableRowValue}>{item.name}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>GENDER</Text>
                            <Text style={styles.tableRowValue}>{item.genderValue === '0' ? 'Female' : 'Male'}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>AGE</Text>
                            <Text style={styles.tableRowValue}>{item.age}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>SMOKING</Text>
                            <Text style={styles.tableRowValue}>{item.smokingValue === '1' ? 'No' : 'Yes'}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>YELLOW FINGERS</Text>
                            <Text style={styles.tableRowValue}>{item.fingerValue === '1' ? 'No' : 'Yes'}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>ANXIETY</Text>
                            <Text style={styles.tableRowValue}>{item.anxietyValue === '1' ? 'No' : 'Yes'}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>PEER PRESSURE</Text>
                            <Text style={styles.tableRowValue}>{item.pressureValue === '1' ? 'No' : 'Yes'}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>CHRONIC DISEASE</Text>
                            <Text style={styles.tableRowValue}>{item.chronicValue === '1' ? 'No' : 'Yes'}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>FATIGUE</Text>
                            <Text style={styles.tableRowValue}>{item.fatigueValue === '1' ? 'No' : 'Yes'}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>ALLERGY</Text>
                            <Text style={styles.tableRowValue}>{item.allergyValue === '1' ? 'No' : 'Yes'}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>WHEEZING</Text>
                            <Text style={styles.tableRowValue}>{item.wheezingValue === '1' ? 'No' : 'Yes'}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>ALCOHOL CONSUMING</Text>
                            <Text style={styles.tableRowValue}>{item.alcoholValue === '1' ? 'No' : 'Yes'}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>COUGHING</Text>
                            <Text style={styles.tableRowValue}>{item.coughingValue === '1' ? 'No' : 'Yes'}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>SHORTNESS OF BREATH</Text>
                            <Text style={styles.tableRowValue}>{item.breathValue === '1' ? 'No' : 'Yes'}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>SWALLOWING DIFFICULTY</Text>
                            <Text style={styles.tableRowValue}>{item.swallowingValue === '1' ? 'No' : 'Yes'}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableRowTitle}>CHEST PAIN</Text>
                            <Text style={styles.tableRowValue}>{item.chestValue === '1' ? 'No' : 'Yes'}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.result}>{item.result == '0' ? `${item.name}, don't worry,\nYou don't have lung cancer!` : `${item.name}, please consult a doctor immediately!\nYou have Lung cancer!`}</Text>
                <View style={styles.btnView}>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem()}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.btnView}>
                    <TouchableOpacity style={styles.backBtnView} onPress={() => props.navigation.goBack()}>
                        <Text style={styles.backBtn}>Back</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    resultView: {
        marginTop: 15,
        marginHorizontal: 10,
    },
    patientName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    date: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
    br: {
        borderBottomWidth: 0.8,
        borderBottomColor: 'black',
        marginTop: 7,
        marginBottom: 20,
    },
    bodyText: {
        fontSize: 18,
        color: '#fff',
        marginTop: 10,
    },
    tableText: {
        fontSize: 18,
        color: '#fff',
        padding: 8,
    },
    result: {
        fontSize: 20,
        color: '#fff',
        marginTop: 10,
        textAlign: 'center',
    },
    deleteButton: {
        borderWidth: 1,
        borderColor: 'tomato',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        width: '100%',
        marginBottom: 2,
    },
    deleteText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
    },
    btnView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    table: {
        flexDirection: 'row',
    },
    tableRow: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#000',
    },
    tableRowTitle: {
        fontSize: 18,
        color: '#fff',
        padding: 8,
        width: '50%',
        paddingLeft: 10,
    },
    tableRowValue: {
        fontSize: 18,
        color: '#fff',
        padding: 8,
        width: '50%',
        borderLeftWidth: 1,
        borderLeftColor: '#000',
        paddingLeft: 10,
    },
    backBtn: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
    },
    backBtnView: {
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        width: '100%',
        marginBottom: 2,
    },
});

export default UserResult;
