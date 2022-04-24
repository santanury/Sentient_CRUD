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

// constant imports
import {icons} from '../Constants';

const EditModal = props => {
  // user input state
  const [name, setName] = useState(props.itemToEdit.name);
  const [email, setEmail] = useState(props.itemToEdit.email);
  const [phone, setPhone] = useState(props.itemToEdit.phone);
  const [address, setAddress] = useState(props.itemToEdit.address.street);

  // update button
  const update = async () => {
    // empty fields validation
    name === '' || email === '' || phone === '' || address === ''
      ? alert('Please fill all fields')
      : // phone number length validation
      phone.length !== 10
      ? alert('Please enter valid phone number')
      : // valid email check using regex
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
      ? alert('Please enter a valid email')
      : // js prototype assigning R&D required
        (props.itemToEdit.name = name);
    props.itemToEdit.email = email;
    props.itemToEdit.phone = phone;
    props.itemToEdit.address.street = address;
    props.setEditModalVisible(false);
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

            <Text style={styles.heading}>Edit Employee</Text>

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
            value={address}
            onChangeText={text => setAddress(text)}
            placeholder="Address"
            placeholderTextColor="#9F9F9F"
          />

          {/* cancel and update section */}

          <View style={styles.cancelSection}>
            {/* cancel button */}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                props.setEditModalVisible(false);
              }}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            {/* update button */}

            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => {
                update();
              }}>
              <Text style={[styles.buttonText, {color: '#FFF'}]}>Update</Text>
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
  updateButton: {
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

export default EditModal;
