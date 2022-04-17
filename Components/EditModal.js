import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';

// constant imports
import {icons} from '../Constants';

const InputModal = props => {
  // user input state
  const [name, setName] = useState(props.itemToEdit.name);
  const [email, setEmail] = useState(props.itemToEdit.email);
  const [phone, setPhone] = useState(props.itemToEdit.phone);
  const [address, setAddress] = useState(props.itemToEdit.address.street);

  // update button
  const update = async () => {
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
    } else {
      // js prototype assigning R&D required
      props.itemToEdit.name = name;
      props.itemToEdit.email = email;
      props.itemToEdit.phone = phone;
      props.itemToEdit.address.street = address;
      props.setEditModalVisible(false);
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
              Edit Employee
            </Text>

            {/* close button */}

            <TouchableOpacity
              onPress={() => {
                props.setEditModalVisible(false);
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
              color: '#000000',
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
              color: '#000000',
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
              color: '#000000',
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
              color: '#000000',
            }}
            value={address}
            onChangeText={text => setAddress(text)}
            placeholder="Address"
            placeholderTextColor="#9F9F9F"
          />

          {/* cancel and update section */}

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
                props.setEditModalVisible(false);
              }}>
              <Text style={{color: '#000000', fontSize: 15, fontWeight: '500'}}>
                Cancel
              </Text>
            </TouchableOpacity>

            {/* update button */}

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
                update();
              }}>
              <Text style={{color: '#FFFFFF', fontSize: 15, fontWeight: '500'}}>
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InputModal;