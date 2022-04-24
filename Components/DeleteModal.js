import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';

// constant imports
import {icons} from '../Constants';

const DeleteModal = props => {
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

            <Text style={styles.heading}>Delete Employee</Text>
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
          <Text style={[styles.warningText, {marginVertical: 25}]}>
            Are you sure you want to delete these records?
          </Text>

          {/* reminder text */}

          <Text style={[styles.warningText, {color: '#FF4500'}]}>
            The action cannot be undone
          </Text>

          {/* cancel and save section */}

          <View style={styles.cancelAndSaveSection}>
            {/* cancel button */}

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                props.setDeleteModalVisible(false);
              }}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>

            {/* save button */}

            <TouchableOpacity
              style={[styles.btn, {backgroundColor: '#DC3545'}]}
              onPress={() => {
                props.deleteUsers ? props.deleteUsers() : null;
              }}>
              <Text style={[styles.btnText, {color: '#fff'}]}>Delete</Text>
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
  warningText: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '300',
    width: '90%',
  },
  reminderText: {
    fontSize: 15,
    color: '#FFFF00',
    fontWeight: '300',
    width: '90%',
  },
  cancelAndSaveSection: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btn: {
    marginTop: 20,
    height: 35,
    width: '30%',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  btnText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default DeleteModal;
