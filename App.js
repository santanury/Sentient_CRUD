import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';

// constans import
import {icons} from './Constants';

// modal imports
import InputModal from './Components/InputModal';
import EditModal from './Components/EditModal';
import DeleteModal from './Components/DeleteModal';

const App = () => {
  // user data state
  const [userData, setUserData] = useState();

  // modal states
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // item to edit state
  const [itemToEdit, setItemToEdit] = useState();

  // ids to delete state
  const [idsToDelete, setIdsToDelete] = useState([]);

  // internet error state
  const [internetError, setInternetError] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    await axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        setUserData(res.data);
        setInternetError(false);
      })
      .catch(err => {
        console.log(err);
        setInternetError(true);
      });
  };

  const deleteUsers = async () => {
    setUserData(userData.filter((user, index) => !idsToDelete.includes(index)));
    setIdsToDelete([]);
    setDeleteModalVisible(false);
  };

  return (
    <SafeAreaView style={{backgroundColor: '#FFFFFF', height: '100%'}}>
      {/* input modal */}

      {inputModalVisible ? (
        <InputModal
          setInputModalVisible={setInputModalVisible}
          setUserData={setUserData}
          userData={userData}
        />
      ) : (
        <></>
      )}

      {/* edit modal */}

      {editModalVisible ? (
        <EditModal
          setEditModalVisible={setEditModalVisible}
          setUserData={setUserData}
          userData={userData}
          itemToEdit={itemToEdit}
        />
      ) : (
        <></>
      )}

      {/* delete modal */}

      {deleteModalVisible ? (
        <DeleteModal
          setDeleteModalVisible={setDeleteModalVisible}
          deleteUsers={deleteUsers}
        />
      ) : (
        <></>
      )}

      {/* header */}

      <View style={styles.header}>
        {/* heading */}

        <Text style={styles.heading}>Manage Employee</Text>

        {/* button container */}

        <View style={styles.headerBtnContainer}>
          {/* delete button */}

          {idsToDelete.length != 0 ? (
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => {
                setDeleteModalVisible(true);
              }}>
              <Text style={styles.btnTxt}>Delete</Text>
            </TouchableOpacity>
          ) : (
            <View style={[styles.deleteBtn, {backgroundColor: '#DC354599'}]}>
              <Text style={styles.btnTxt}>Delete</Text>
            </View>
          )}

          {/* add employee button */}

          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => setInputModalVisible(true)}>
            <Text style={styles.btnTxt}>Add Employee</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* horizontal scroll container */}

      {internetError !== true ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            {/* attribute section */}

            <View style={styles.itemRowSection}>
              {/* all employee select checkbox */}

              <CheckBox
                tintColors={{true: '#00FF00', false: 'black'}}
                disabled={false}
                value={
                  idsToDelete.length === userData?.length &&
                  userData?.length !== 0
                    ? true
                    : false
                }
                onValueChange={() => {
                  // select all idsToDelete
                  if (idsToDelete?.length === userData?.length) {
                    setIdsToDelete([]);
                  } else {
                    setIdsToDelete(userData?.map((user, key) => key));
                  }
                }}
              />

              {/* employee name attribute */}
              <Text style={[styles.attribute, {fontWeight: '500'}]}>Name</Text>

              {/* employee email attribute */}
              <Text style={[styles.attribute, {fontWeight: '500'}]}>Email</Text>

              {/* employee address attribute */}
              <Text style={[styles.attribute, {fontWeight: '500'}]}>
                Address
              </Text>

              {/* employee phone attribute */}
              <Text style={[styles.attribute, {fontWeight: '500'}]}>Phone</Text>

              {/* employee action attribute */}
              <Text style={[styles.attribute, {fontWeight: '500', width: 75}]}>
                Action
              </Text>
            </View>

            {/* vertivally scrollable employee list */}

            <ScrollView
              style={{paddingBottom: 10}}
              showsVerticalScrollIndicator={false}>
              {/* employee data */}

              {userData?.map((item, index) => {
                return (
                  <View key={index} style={styles.itemRowSection}>
                    <CheckBox
                      tintColors={{true: '#00FF00', false: 'black'}}
                      disabled={false}
                      value={idsToDelete.includes(index) ? true : false}
                      onValueChange={() => {
                        if (idsToDelete.includes(index)) {
                          setIdsToDelete(
                            idsToDelete.filter(id => id !== index),
                          );
                        } else {
                          setIdsToDelete([...idsToDelete, index]);
                        }
                      }}
                    />

                    {/* employee name */}
                    <Text style={styles.attribute}>{item.name}</Text>

                    {/* employee email */}
                    <Text style={styles.attribute}>{item.email}</Text>

                    {/* employee address */}
                    <Text style={styles.attribute}>{item.address.street}</Text>

                    {/* employee phone */}
                    <Text style={styles.attribute}>{item.phone}</Text>

                    {/* employee action */}

                    <View style={styles.empActionSection}>
                      {/* edit button */}

                      <TouchableOpacity
                        onPress={() => {
                          setEditModalVisible(true);
                          setItemToEdit(item);
                        }}>
                        <Image
                          source={icons.editIcon}
                          style={styles.actionBtnIcon}
                        />
                      </TouchableOpacity>

                      {/* delete button */}

                      <TouchableOpacity
                        style={{marginLeft: 15}}
                        onPress={() => {
                          setDeleteModalVisible(true);
                          setIdsToDelete([index]);
                        }}>
                        <Image
                          source={icons.deleteIcon}
                          style={styles.actionBtnIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>
      ) : (
        // no internet container

        <View style={styles.errorContainer}>
          {/* no connection text */}

          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            No Internet Connection
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            Please turn your internet on retry
          </Text>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              fetchUsers();
            }}>
            <Text style={styles.btnTxt}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    backgroundColor: '#435D7D',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '700',
    marginLeft: 10,
  },
  headerBtnContainer: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-evenly',
  },
  deleteBtn: {
    height: 35,
    width: '30%',
    backgroundColor: '#DC3545',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {color: '#FFFFFF', fontSize: 15, fontWeight: '500'},
  addBtn: {
    backgroundColor: '#28A745',
    height: 35,
    width: '65%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  itemRowSection: {
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#9F9F9F',
  },
  attribute: {
    width: 200,
    color: '#000000',
    fontWeight: '400',
  },
  empActionSection: {
    width: 75,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtnIcon: {width: 20, height: 20},
  errorContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default App;
