/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';

const PredictScreen = ({navigation}) => {
  //loading state
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  
  // gender state
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [genderItems, setGenderItems] = useState([
    {label: 'Male', value: '1'},
    {label: 'Female', value: '0'},
  ]);

  const [age, setAge] = useState('');

  //smoking state
  const [smokingOpen, setSmokingOpen] = useState(false);
  const [smokingValue, setSmokingValue] = useState(null);
  const [smokingItems, setSmokingItems] = useState([
    {label: 'No', value: '1'},
    {label: 'Yes', value: '2'},
  ]);

  const [fingerOpen, setFingerOpen] = useState(false);
  const [fingerValue, setFingerValue] = useState(null);
  const [fingerItems, setFingerItems] = useState([
    {label: 'No', value: '1'},
    {label: 'Yes', value: '2'},
  ]);

  const [anxietyOpen, setAnxietyOpen] = useState(false);
  const [anxietyValue, setAnxietyValue] = useState(null);
  const [anxietyItems, setAnxietyItems] = useState([
    {label: 'No', value: '1'},
    {label: 'Yes', value: '2'},
  ]);

  const [pressureOpen, setPressureOpen] = useState(false);
  const [pressureValue, setPressureValue] = useState(null);
  const [pressureItems, setPressureItems] = useState([
    {label: 'No', value: '1'},
    {label: 'Yes', value: '2'},
  ]);

  const [chronicOpen, setChronicOpen] = useState(false);
  const [chronicValue, setChronicValue] = useState(null);
  const [chronicItems, setChronicItems] = useState([
    {label: 'No', value: '1'},
    {label: 'Yes', value: '2'},
  ]);

  const [fatigueOpen, setFatigueOpen] = useState(false);
  const [fatigueValue, setFatigueValue] = useState(null);
  const [fatigueItems, setFatigueItems] = useState([
    {label: 'No', value: '1'},
    {label: 'Yes', value: '2'},
  ]);

  const [allergyOpen, setAllergyOpen] = useState(false);
  const [allergyValue, setAllergyValue] = useState(null);
  const [allergyItems, setAllergyItems] = useState([
    {label: 'No', value: '1'},
    {label: 'Yes', value: '2'},
  ]);

  const [wheezingOpen, setWheezingOpen] = useState(false);
  const [wheezingValue, setWheezingValue] = useState(null);
  const [wheezingItems, setWheezingItems] = useState([
    {label: 'No', value: '1'},
    {label: 'Yes', value: '2'},
  ]);

  const [alcoholOpen, setAlcoholOpen] = useState(false);
  const [alcoholValue, setAlcoholValue] = useState(null);
  const [alcoholItems, setAlcoholItems] = useState([
    {label: 'No', value: '1'},
    {label: 'Yes', value: '2'},
  ]);

  const [coughingOpen, setCoughingOpen] = useState(false);
  const [coughingValue, setCoughingValue] = useState(null);
  const [coughingItems, setCoughingItems] = useState([
    {label: 'No', value: '1'},
    {label: 'Yes', value: '2'},
  ]);

  const [breathOpen, setBreathOpen] = useState(false);
  const [breathValue, setBreathValue] = useState(null);
  const [breathItems, setBreathItems] = useState([
    {label: 'No', value: '1'},
    {label: 'Yes', value: '2'},
  ]);

  const [swallowingOpen, setSwallowingOpen] = useState(false);
  const [swallowingValue, setSwallowingValue] = useState(null);
  const [swallowingItems, setSwallowingItems] = useState([
    {label: 'No', value: '1'},
    {label: 'Yes', value: '2'},
  ]);

  const [chestOpen, setChestOpen] = useState(false);
  const [chestValue, setChestValue] = useState(null);
  const [chestItems, setChestItems] = useState([
    {label: 'No', value: '1'},
    {label: 'Yes', value: '2'},
  ]);

  //store data in local storage
  const storeData = async data => {
    try {
      //marge data with current data
      const currentData = await AsyncStorage.getItem('LungCancerResults');
      const newData = currentData ? JSON.parse(currentData) : [];
      newData.push(data);
      await AsyncStorage.setItem('LungCancerResults', JSON.stringify(newData));
    } catch (error) {
      console.log(error);
    }
  };

  const predictResult = () => {
    setLoading(true);
    if (
      name === '' ||
      age === '' ||
      genderValue === null ||
      smokingValue === null ||
      fingerValue === null ||
      anxietyValue === null ||
      pressureValue === null ||
      chronicValue === null ||
      fatigueValue === null ||
      allergyValue === null ||
      wheezingValue === null ||
      alcoholValue === null ||
      coughingValue === null ||
      breathValue === null ||
      swallowingValue === null ||
      chestValue === null
    ) {
      setLoading(false);
      Alert.alert(
        'Warning',
        'Please fill all the fields!',
        [
          {
            text: 'Ok',
            style: 'default',
          },
        ],
        {
          cancelable: true,
        },
      );
    } else {
      let formData = new FormData();
      formData.append('GENDER', genderValue);
      formData.append('AGE', age);
      formData.append('SMOKING', smokingValue);
      formData.append('YELLOW_FINGERS', fingerValue);
      formData.append('ANXIETY', anxietyValue);
      formData.append('PEER_PRESSURE', pressureValue);
      formData.append('CHRONIC_DISEASE', chronicValue);
      formData.append('FATIGUE', fatigueValue);
      formData.append('ALLERGY', allergyValue);
      formData.append('WHEEZING', wheezingValue);
      formData.append('ALCOHOL CONSUMING', alcoholValue);
      formData.append('COUGHING', coughingValue);
      formData.append('SHORTNESS OF BREATH', breathValue);
      formData.append('SWALLOWING DIFFICULTY', swallowingValue);
      formData.append('CHEST PAIN', chestValue);

      fetch('https://eml-lung-cancer.herokuapp.com/result', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(res => {
          //current date and time
          let date = new Date().toLocaleString();

          // send data to local storage

          const data = {
            name,
            genderValue,
            age,
            smokingValue,
            fingerValue,
            anxietyValue,
            pressureValue,
            chronicValue,
            fatigueValue,
            allergyValue,
            wheezingValue,
            alcoholValue,
            coughingValue,
            breathValue,
            swallowingValue,
            chestValue,
            result: res.prediction,
            date,
          };

          storeData(data);

          setAge('');
          setGenderValue(null);
          setAlcoholValue(null);
          setAllergyValue(null);
          setAnxietyValue(null);
          setBreathValue(null);
          setChestValue(null);
          setChronicValue(null);
          setCoughingValue(null);
          setFatigueValue(null);
          setFingerValue(null);
          setPressureValue(null);
          setSmokingValue(null);
          setSwallowingValue(null);
          setWheezingValue(null);
          setLoading(false);
          if (res.prediction === '1') {
            Alert.alert(
              name,
              'Please consult a doctor immediately!\nYou have Lung cancer!',
              [
                {
                  text: 'Ok',
                  style: 'default',
                },
              ],
              {
                cancelable: true,
              },
            );
          } else {
            Alert.alert(
              name,
              "Don't worry,\nYou don't have lung cancer!",
              [
                {
                  text: 'Ok',
                  style: 'default',
                },
              ],
              {
                cancelable: true,
              },
            );
          }
            setName('');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <LinearGradient colors={['#26D0CE', '#1A2980']} style={styles.container}>
      <ScrollView style={styles.formView}>

        <Text style={styles.inputTitle}>Name</Text>
        <TextInput
          style={styles.inputView}
          placeholder="Enter your name"
          value={name}
          onChangeText={text => setName(text)}
          placeholderTextColor="black"
        />
        
        <Text style={styles.inputTitle}>Age</Text>
        <TextInput
          style={styles.inputView}
          value={age}
          placeholder="Enter age"
          onChangeText={text => setAge(text)}
          placeholderTextColor="black"
          keyboardType="number-pad"
        />

        <Text style={styles.inputTitle}>Gender</Text>
        <DropDownPicker
          open={genderOpen}
          value={genderValue}
          items={genderItems}
          setOpen={setGenderOpen}
          setValue={setGenderValue}
          setItems={setGenderItems}
          placeholder="Select Gender"
          listMode="SCROLLVIEW"
          style={{
            backgroundColor: null,
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
            marginBottom: 10,
          }}
          textStyle={{
            color: 'white',
            fontSize: 18,
          }}
          labelStyle={{
            backgroundColor: null,
          }}
          dropDownContainerStyle={{
            backgroundColor: '#070724',
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
          }}
          arrowIconStyle={{
            tintColor: 'white',
          }}
          tickIconStyle={{
            tintColor: 'white',
          }}
          itemSeparator={true}
          itemSeparatorStyle={{
            backgroundColor: '#fff',
            marginHorizontal: 10,
          }}
          placeholderStyle={{
            color: 'black',
          }}
          zIndex={15}
        />

        <Text style={styles.inputTitle}>Smoking</Text>
        <DropDownPicker
          open={smokingOpen}
          value={smokingValue}
          items={smokingItems}
          setOpen={setSmokingOpen}
          setValue={setSmokingValue}
          setItems={setSmokingItems}
          placeholder="Select Smoking Status"
          listMode="SCROLLVIEW"
          style={{
            backgroundColor: null,
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
            marginBottom: 10,
          }}
          textStyle={{
            color: 'white',
            fontSize: 18,
          }}
          labelStyle={{
            backgroundColor: null,
          }}
          dropDownContainerStyle={{
            backgroundColor: '#070724',
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
          }}
          arrowIconStyle={{
            tintColor: 'white',
          }}
          tickIconStyle={{
            tintColor: 'white',
          }}
          itemSeparator={true}
          itemSeparatorStyle={{
            backgroundColor: '#fff',
            marginHorizontal: 10,
          }}
          placeholderStyle={{
            color: 'black',
          }}
          zIndex={14}
        />

        <Text style={styles.inputTitle}>Yellow Fingers</Text>
        <DropDownPicker
          open={fingerOpen}
          value={fingerValue}
          items={fingerItems}
          setOpen={setFingerOpen}
          setValue={setFingerValue}
          setItems={setFingerItems}
          placeholder="Select Yellow Fingers"
          listMode="SCROLLVIEW"
          style={{
            backgroundColor: null,
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
            marginBottom: 10,
          }}
          textStyle={{
            color: 'white',
            fontSize: 18,
          }}
          labelStyle={{
            backgroundColor: null,
          }}
          dropDownContainerStyle={{
            backgroundColor: '#070724',
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
          }}
          arrowIconStyle={{
            tintColor: 'white',
          }}
          tickIconStyle={{
            tintColor: 'white',
          }}
          itemSeparator={true}
          itemSeparatorStyle={{
            backgroundColor: '#fff',
            marginHorizontal: 10,
          }}
          placeholderStyle={{
            color: 'black',
          }}
          zIndex={13}
        />

        <Text style={styles.inputTitle}>Anxiety</Text>
        <DropDownPicker
          open={anxietyOpen}
          value={anxietyValue}
          items={anxietyItems}
          setOpen={setAnxietyOpen}
          setValue={setAnxietyValue}
          setItems={setAnxietyItems}
          placeholder="Select Anxiety"
          listMode="SCROLLVIEW"
          style={{
            backgroundColor: null,
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
            marginBottom: 10,
          }}
          textStyle={{
            color: 'white',
            fontSize: 18,
          }}
          labelStyle={{
            backgroundColor: null,
          }}
          dropDownContainerStyle={{
            backgroundColor: '#070724',
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
          }}
          arrowIconStyle={{
            tintColor: 'white',
          }}
          tickIconStyle={{
            tintColor: 'white',
          }}
          itemSeparator={true}
          itemSeparatorStyle={{
            backgroundColor: '#fff',
            marginHorizontal: 10,
          }}
          placeholderStyle={{
            color: 'black',
          }}
          zIndex={12}
        />

        <Text style={styles.inputTitle}>Peer Pressure</Text>
        <DropDownPicker
          open={pressureOpen}
          value={pressureValue}
          items={pressureItems}
          setOpen={setPressureOpen}
          setValue={setPressureValue}
          setItems={setPressureItems}
          placeholder="Select Peer Pressure"
          listMode="SCROLLVIEW"
          style={{
            backgroundColor: null,
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
            marginBottom: 10,
          }}
          textStyle={{
            color: 'white',
            fontSize: 18,
          }}
          labelStyle={{
            backgroundColor: null,
          }}
          dropDownContainerStyle={{
            backgroundColor: '#070724',
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
          }}
          arrowIconStyle={{
            tintColor: 'white',
          }}
          tickIconStyle={{
            tintColor: 'white',
          }}
          itemSeparator={true}
          itemSeparatorStyle={{
            backgroundColor: '#fff',
            marginHorizontal: 10,
          }}
          placeholderStyle={{
            color: 'black',
          }}
          zIndex={11}
        />

        <Text style={styles.inputTitle}>Chronic Disease</Text>
        <DropDownPicker
          open={chronicOpen}
          value={chronicValue}
          items={chronicItems}
          setOpen={setChronicOpen}
          setValue={setChronicValue}
          setItems={setChronicItems}
          placeholder="Select Chronic Disease"
          listMode="SCROLLVIEW"
          style={{
            backgroundColor: null,
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
            marginBottom: 10,
          }}
          textStyle={{
            color: 'white',
            fontSize: 18,
          }}
          labelStyle={{
            backgroundColor: null,
          }}
          dropDownContainerStyle={{
            backgroundColor: '#070724',
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
          }}
          arrowIconStyle={{
            tintColor: 'white',
          }}
          tickIconStyle={{
            tintColor: 'white',
          }}
          itemSeparator={true}
          itemSeparatorStyle={{
            backgroundColor: '#fff',
            marginHorizontal: 10,
          }}
          placeholderStyle={{
            color: 'black',
          }}
          zIndex={10}
        />

        <Text style={styles.inputTitle}>Fatigue</Text>
        <DropDownPicker
          open={fatigueOpen}
          value={fatigueValue}
          items={fatigueItems}
          setOpen={setFatigueOpen}
          setValue={setFatigueValue}
          setItems={setFatigueItems}
          placeholder="Select Fatigue"
          listMode="SCROLLVIEW"
          style={{
            backgroundColor: null,
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
            marginBottom: 10,
          }}
          textStyle={{
            color: 'white',
            fontSize: 18,
          }}
          labelStyle={{
            backgroundColor: null,
          }}
          dropDownContainerStyle={{
            backgroundColor: '#070724',
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
          }}
          arrowIconStyle={{
            tintColor: 'white',
          }}
          tickIconStyle={{
            tintColor: 'white',
          }}
          itemSeparator={true}
          itemSeparatorStyle={{
            backgroundColor: '#fff',
            marginHorizontal: 10,
          }}
          placeholderStyle={{
            color: 'black',
          }}
          zIndex={9}
        />

        <Text style={styles.inputTitle}>Allergy</Text>
        <DropDownPicker
          open={allergyOpen}
          value={allergyValue}
          items={allergyItems}
          setOpen={setAllergyOpen}
          setValue={setAllergyValue}
          setItems={setAllergyItems}
          placeholder="Select Allergy"
          listMode="SCROLLVIEW"
          style={{
            backgroundColor: null,
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
            marginBottom: 10,
          }}
          textStyle={{
            color: 'white',
            fontSize: 18,
          }}
          labelStyle={{
            backgroundColor: null,
          }}
          dropDownContainerStyle={{
            backgroundColor: '#070724',
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
          }}
          arrowIconStyle={{
            tintColor: 'white',
          }}
          tickIconStyle={{
            tintColor: 'white',
          }}
          itemSeparator={true}
          itemSeparatorStyle={{
            backgroundColor: '#fff',
            marginHorizontal: 10,
          }}
          placeholderStyle={{
            color: 'black',
          }}
          zIndex={8}
        />

        <Text style={styles.inputTitle}>Wheezing</Text>
        <DropDownPicker
          open={wheezingOpen}
          value={wheezingValue}
          items={wheezingItems}
          setOpen={setWheezingOpen}
          setValue={setWheezingValue}
          setItems={setWheezingItems}
          placeholder="Select Wheezing"
          listMode="SCROLLVIEW"
          style={{
            backgroundColor: null,
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
            marginBottom: 10,
          }}
          textStyle={{
            color: 'white',
            fontSize: 18,
          }}
          labelStyle={{
            backgroundColor: null,
          }}
          dropDownContainerStyle={{
            backgroundColor: '#070724',
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
          }}
          arrowIconStyle={{
            tintColor: 'white',
          }}
          tickIconStyle={{
            tintColor: 'white',
          }}
          itemSeparator={true}
          itemSeparatorStyle={{
            backgroundColor: '#fff',
            marginHorizontal: 10,
          }}
          placeholderStyle={{
            color: 'black',
          }}
          zIndex={7}
        />

        <Text style={styles.inputTitle}>Alcohol Consuming</Text>
        <DropDownPicker
          open={alcoholOpen}
          value={alcoholValue}
          items={alcoholItems}
          setOpen={setAlcoholOpen}
          setValue={setAlcoholValue}
          setItems={setAlcoholItems}
          placeholder="Select Alcohol Consuming"
          listMode="SCROLLVIEW"
          style={{
            backgroundColor: null,
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
            marginBottom: 10,
          }}
          textStyle={{
            color: 'white',
            fontSize: 18,
          }}
          labelStyle={{
            backgroundColor: null,
          }}
          dropDownContainerStyle={{
            backgroundColor: '#070724',
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
          }}
          arrowIconStyle={{
            tintColor: 'white',
          }}
          tickIconStyle={{
            tintColor: 'white',
          }}
          itemSeparator={true}
          itemSeparatorStyle={{
            backgroundColor: '#fff',
            marginHorizontal: 10,
          }}
          placeholderStyle={{
            color: 'black',
          }}
          zIndex={6}
        />

        <Text style={styles.inputTitle}>Coughing</Text>
        <DropDownPicker
          open={coughingOpen}
          value={coughingValue}
          items={coughingItems}
          setOpen={setCoughingOpen}
          setValue={setCoughingValue}
          setItems={setCoughingItems}
          placeholder="Select Coughing"
          listMode="SCROLLVIEW"
          style={{
            backgroundColor: null,
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
            marginBottom: 10,
          }}
          textStyle={{
            color: 'white',
            fontSize: 18,
          }}
          labelStyle={{
            backgroundColor: null,
          }}
          dropDownContainerStyle={{
            backgroundColor: '#070724',
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
          }}
          arrowIconStyle={{
            tintColor: 'white',
          }}
          tickIconStyle={{
            tintColor: 'white',
          }}
          itemSeparator={true}
          itemSeparatorStyle={{
            backgroundColor: '#fff',
            marginHorizontal: 10,
          }}
          placeholderStyle={{
            color: 'black',
          }}
          zIndex={5}
        />

        <Text style={styles.inputTitle}>Shortness of Breath</Text>
        <DropDownPicker
          open={breathOpen}
          value={breathValue}
          items={breathItems}
          setOpen={setBreathOpen}
          setValue={setBreathValue}
          setItems={setBreathItems}
          placeholder="Select Shortness of Breath"
          listMode="SCROLLVIEW"
          style={{
            backgroundColor: null,
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
            marginBottom: 10,
          }}
          textStyle={{
            color: 'white',
            fontSize: 18,
          }}
          labelStyle={{
            backgroundColor: null,
          }}
          dropDownContainerStyle={{
            backgroundColor: '#070724',
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
          }}
          arrowIconStyle={{
            tintColor: 'white',
          }}
          tickIconStyle={{
            tintColor: 'white',
          }}
          itemSeparator={true}
          itemSeparatorStyle={{
            backgroundColor: '#fff',
            marginHorizontal: 10,
          }}
          placeholderStyle={{
            color: 'black',
          }}
          zIndex={4}
        />

        <Text style={styles.inputTitle}>Swallowing Difficulty</Text>
        <DropDownPicker
          open={swallowingOpen}
          value={swallowingValue}
          items={swallowingItems}
          setOpen={setSwallowingOpen}
          setValue={setSwallowingValue}
          setItems={setSwallowingItems}
          placeholder="Select Swallowing Difficulty"
          listMode="SCROLLVIEW"
          style={{
            backgroundColor: null,
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
            marginBottom: 10,
          }}
          textStyle={{
            color: 'white',
            fontSize: 18,
          }}
          labelStyle={{
            backgroundColor: null,
          }}
          dropDownContainerStyle={{
            backgroundColor: '#070724',
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
          }}
          arrowIconStyle={{
            tintColor: 'white',
          }}
          tickIconStyle={{
            tintColor: 'white',
          }}
          itemSeparator={true}
          itemSeparatorStyle={{
            backgroundColor: '#fff',
            marginHorizontal: 10,
          }}
          placeholderStyle={{
            color: 'black',
          }}
          zIndex={3}
        />

        <Text style={styles.inputTitle}>Chest Pain</Text>
        <DropDownPicker
          open={chestOpen}
          value={chestValue}
          items={chestItems}
          setOpen={setChestOpen}
          setValue={setChestValue}
          setItems={setChestItems}
          placeholder="Select Chest Pain"
          listMode="SCROLLVIEW"
          style={{
            backgroundColor: null,
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
            marginBottom: 10,
          }}
          textStyle={{
            color: 'white',
            fontSize: 18,
          }}
          labelStyle={{
            backgroundColor: null,
          }}
          dropDownContainerStyle={{
            backgroundColor: '#070724',
            borderWidth: 1,
            borderColor: 'white',
            marginTop: 15,
          }}
          arrowIconStyle={{
            tintColor: 'white',
          }}
          tickIconStyle={{
            tintColor: 'white',
          }}
          itemSeparator={true}
          itemSeparatorStyle={{
            backgroundColor: 'white',
            marginHorizontal: 10,
          }}
          placeholderStyle={{
            color: 'black',
          }}
          zIndex={2}
        />

        {loading ? (
          <Modal animationType="fade" transparent={true} visible={loading}>
            <ActivityIndicator style={styles.loadingView} size="large" color="white" />
          </Modal>
        ) : (
          <TouchableOpacity
            style={styles.btnView}
            onPress={() => predictResult()}>
            <Text style={styles.btnText}>Predict</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  bodyTitle: {
    color: '#fff',
    fontSize: 25,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputTitle: {
    color: '#000',
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold'
  },
  inputView: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
    marginBottom: 10,
    color: 'white',
    fontSize: 20,
  },
  btnView: {
    height: 40,
    width: '100%',
    borderRadius: 15,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PredictScreen;