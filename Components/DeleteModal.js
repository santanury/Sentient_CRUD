import {Modal, View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

// constant imports
import {icons} from '../Constants';

const DeleteModal = props => {
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
              Delete Employee
            </Text>
            {/* close button */}
            <TouchableOpacity
              onPress={() => {
                props.setDeleteModalVisible(false);
              }}>
              <Image
                source={icons.closeIcon}
                style={{width: 25, height: 25}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* warning text */}
          <Text
            style={{
              fontSize: 15,
              color: '#000000',
              fontWeight: '300',
              marginVertical: 25,
              width: '90%',
            }}>
            Are you sure you want to delete these records?
          </Text>

          {/* reminder text */}

          <Text
            style={{
              fontSize: 15,
              color: '#FFFF00',
              fontWeight: '300',
              width: '90%',
            }}>
            The action cannot be undone
          </Text>

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
                props.setDeleteModalVisible(false);
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
                backgroundColor: '#DC3545',
                borderRadius: 3,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}
              onPress={() => {
                props.deleteUsers ? props.deleteUsers() : null;
              }}>
              <Text style={{color: '#FFFFFF', fontSize: 15, fontWeight: '500'}}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
