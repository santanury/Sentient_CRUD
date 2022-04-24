import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';

// constant imports
import {icons} from '../Constants';

const InputModal = props => {
  // user input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({street: ''});

  // save button
  const save = async () => {
    // empty fields validation
    name === '' || email === '' || phone === '' || address === ''
      ? alert('Please fill all fields')
      : // phone number length validation
      phone.length !== 10
      ? alert('Please enter valid phone number')
      : // valid email check using regex
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
      ? alert('Please enter a valid email')
      : // api call to save data
        await axios
          .post('https://jsonplaceholder.typicode.com/users', {
            name,
            email,
            phone,
            address,
          })
          .then(res => {
            props.setUserData([
              ...props.userData,
              {
                name: name,
                email: email,
                phone: phone,
                address: address,
              },
            ]);
            props.setInputModalVisible(false);
          })
          .catch(err => {
            // error handling
            alert('Please check your internet connection and try again');
          });
  };

  return (
    // container

    <Modal visible={true} transparent>
      {/* transparent section */}

      <View style={styles.transparentSection}>
        {/* visible section */}

        <View style={styles.visibleSection}>
          {/* modal header */}

          <View style={styles.header}>
            {/* modal heading */}

            <Text style={styles.heading}>Add Employee</Text>

            {/* close button */}

            <TouchableOpacity
              onPress={() => {
                props.setInputModalVisible(false);
              }}>
              <Image
                style={{width: 25, height: 25}}
                source={icons.closeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* name input section */}

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={text => setName(text)}
            placeholder="Name"
            placeholderTextColor="#9F9F9F"
          />

          {/* email input section */}

          <TextInput
            style={styles.input}
            keyboardType={'email-address'}
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="Email"
            placeholderTextColor="#9F9F9F"
          />

          {/* phone input section */}

          <TextInput
            style={styles.input}
            maxLength={10}
            keyboardType={'phone-pad'}
            value={phone}
            onChangeText={text => setPhone(text)}
            placeholder="Phone"
            placeholderTextColor="#9F9F9F"
          />

          {/* address input section */}

          <TextInput
            style={styles.input}
            value={address.street}
            onChangeText={text => setAddress({street: text})}
            placeholder="Address"
            placeholderTextColor="#9F9F9F"
          />

          {/* cancel and save section */}

          <View style={styles.cancelSection}>
            {/* cancel button */}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                props.setInputModalVisible(false);
              }}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            {/* save button */}

            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                save();
              }}>
              <Text style={[styles.buttonText, {color: '#FFFFFF'}]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  transparentSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000099',
  },
  visibleSection: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  heading: {
    fontSize: 17,
    color: '#000000',
    fontWeight: '500',
  },
  input: {
    paddingLeft: 10,
    marginTop: 20,
    height: 40,
    width: '90%',
    borderWidth: 0.5,
    borderColor: '#000000',
    fontSize: 15,
    color: '#000000',
  },
  cancelSection: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    marginTop: 20,
    height: 35,
    width: '30%',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  saveButton: {
    marginTop: 20,
    height: 35,
    width: '30%',
    backgroundColor: '#28A745',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {color: '#000000', fontSize: 15, fontWeight: '500'},
});

export default InputModal;
