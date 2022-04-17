import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';

// constant imports
import {icons} from '../Constants';

const InputModal = props => {
  // user input state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({street: ''});

  // save button
  const save = async () => {
    // empty fields validation
    if (name === '' || email === '' || phone === '' || address === '') {
      alert('Please fill all fields');
    }
    // phone number length validation
    else if (phone.length !== 10) {
      alert('Please enter valid phone number');
    }
    // email validation with regex
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      alert('Please enter a valid email');
    }
    // post new user
    else {
      await axios
        .post('https://jsonplaceholder.typicode.com/users', {
          name,
          email,
          phone,
          address,
        })
        .then(res => {
          props.setUserData([...props.userData, res.data]);
          console.log(res.data);

          // clearing the input fields
          setName('');
          setEmail('');
          setPhone('');
          setAddress({street: ''});
          // modal closing
          props.setInputModalVisible(false);
        });
    }
  };

  return (
    // container

    <Modal visible={true} transparent>
      {/* transparent section */}

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#00000099',
        }}>
        {/* visible section */}

        <View
          style={{
            width: '90%',
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            alignItems: 'center',
          }}>
          {/* modal header */}

          <View
            style={{
              flexDirection: 'row',
              height: 45,
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '90%',
            }}>
            {/* modal heading */}

            <Text
              style={{
                fontSize: 17,
                color: '#000000',
                fontWeight: '500',
              }}>
              Add Employee
            </Text>

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
            style={{
              marginTop: 20,
              height: 40,
              width: '90%',
              borderWidth: 1,
              borderColor: '#000000',
              fontSize: 15,
              color:"#000000"
            }}
            value={name}
            onChangeText={text => setName(text)}
            placeholder="Name"
            placeholderTextColor="#9F9F9F"
          />

          {/* email input section */}

          <TextInput
            style={{
              marginTop: 20,
              height: 40,
              width: '90%',
              borderWidth: 1,
              borderColor: '#000000',
              fontSize: 15,
              color:"#000000"
            }}
            keyboardType={'email-address'}
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="Email"
            placeholderTextColor="#9F9F9F"
          />

          {/* phone input section */}

          <TextInput
            style={{
              marginTop: 20,
              height: 40,
              width: '90%',
              borderWidth: 1,
              borderColor: '#000000',
              fontSize: 15,
              color:"#000000"
            }}
            maxLength={10}
            keyboardType={'phone-pad'}
            value={phone}
            onChangeText={text => setPhone(text)}
            placeholder="Phone"
            placeholderTextColor="#9F9F9F"
          />

          {/* address input section */}

          <TextInput
            style={{
              marginTop: 20,
              height: 40,
              width: '90%',
              borderWidth: 1,
              borderColor: '#000000',
              fontSize: 15,
              color:"#000000"
            }}
            value={address.street}
            onChangeText={text => setAddress({street: text})}
            placeholder="Address"
            placeholderTextColor="#9F9F9F"
          />

          {/* cancel and save section */}

          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            {/* cancel button */}

            <TouchableOpacity
              style={{
                marginTop: 20,
                height: 35,
                width: '30%',
                borderRadius: 3,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}
              onPress={() => {
                props.setInputModalVisible(false);
              }}>
              <Text style={{color: '#000000', fontSize: 15, fontWeight: '500'}}>
                Cancel
              </Text>
            </TouchableOpacity>

            {/* save button */}

            <TouchableOpacity
              style={{
                marginTop: 20,
                height: 35,
                width: '30%',
                backgroundColor: '#28A745',
                borderRadius: 3,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}
              onPress={() => {
                save();
              }}>
              <Text style={{color: '#FFFFFF', fontSize: 15, fontWeight: '500'}}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InputModal;
