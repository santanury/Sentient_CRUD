import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
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

  // id to delete storage state
  const [id, setId] = useState();

  // item to edit state
  const [itemToEdit, setItemToEdit] = useState();

  // ids to delete state
  const [idsToDelete, setIdsToDelete] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    await axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        setUserData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteUsers = async () => {
    setUserData(userData.filter((user, index) => !idsToDelete.includes(index)));
    setIdsToDelete([]);
    setDeleteModalVisible(false);
  };

  return (
    <SafeAreaView style={{backgroundColor: '#9F9F9F', height: '100%'}}>
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
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          width: '100%',
          backgroundColor: '#435D7D',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {/* heading */}

        <Text
          style={{
            fontSize: 17,
            color: '#FFFFFF',
            fontWeight: '700',
            marginLeft: 10,
          }}>
          Manage Employee
        </Text>

        {/* button container */}

        <View
          style={{
            flexDirection: 'row',
            width: '50%',
            justifyContent: 'space-evenly',
          }}>
          {/* delete button */}

          {idsToDelete.length != 0 ? (
            <TouchableOpacity
              style={{
                height: 35,
                width: '30%',
                backgroundColor: '#DC3545',
                borderRadius: 3,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setDeleteModalVisible(true);
              }}>
              <Text style={{color: '#FFFFFF', fontSize: 15, fontWeight: '500'}}>
                Delete
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                backgroundColor: '#DC354599',
                height: 35,
                width: '30%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 3,
              }}>
              <Text
                style={{color: '#FFFFFF99', fontSize: 15, fontWeight: '500'}}>
                Delete
              </Text>
            </View>
          )}

          {/* add employee button */}

          <TouchableOpacity
            style={{
              backgroundColor: '#28A745',
              height: 35,
              width: '65%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 3,
            }}
            onPress={() => setInputModalVisible(true)}>
            <Text style={{color: '#FFFFFF', fontSize: 15, fontWeight: '500'}}>
              Add Employee
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* horizontal scroll container */}

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* attribute section */}

          <View
            style={{
              flexDirection: 'row',
              height: 45,
              alignItems: 'center',
              borderBottomWidth: 1.,
              borderBottomColor: '#000000',
            }}>
            {/* all employee select checkbox */}

            <CheckBox 
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
            <Text
              style={{
                width: 200,
                color: '#000000',
                fontWeight: '500',
              }}>
              Name
            </Text>

            {/* employee email attribute */}
            <Text
              style={{
                width: 200,
                color: '#000000',
                fontWeight: '500',
              }}>
              Email
            </Text>

            {/* employee address attribute */}
            <Text
              style={{
                width: 250,
                color: '#000000',
                fontWeight: '500',
              }}>
              Address
            </Text>

            {/* employee phone attribute */}
            <Text
              style={{
                width: 200,
                color: '#000000',
                fontWeight: '500',
              }}>
              Phone
            </Text>

            {/* employee action attribute */}
            <Text
              style={{
                width: 100,
                color: '#000000',
                fontWeight: '500',
              }}>
              Action
            </Text>
          </View>

          {/* vertivally scrollable employee list */}

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* employee data */}

            {userData?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    height: 45,
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: '#000000',
                  }}>
                  <CheckBox
                    disabled={false}
                    value={idsToDelete.includes(index) ? true : false}
                    onValueChange={() => {
                      if (idsToDelete.includes(index)) {
                        setIdsToDelete(idsToDelete.filter(id => id !== index));
                      } else {
                        setIdsToDelete([...idsToDelete, index]);
                      }
                    }}
                  />

                  {/* employee name */}

                  <Text
                    style={{
                      width: 200,
                      color: '#000000',
                    }}>
                    {item.name}
                  </Text>

                  {/* employee email */}

                  <Text
                    style={{
                      width: 200,
                      color: '#000000',
                    }}>
                    {item.email}
                  </Text>

                  {/* employee address */}

                  <Text
                    style={{
                      width: 250,
                      color: '#000000',
                    }}>
                    {item.address.street}
                  </Text>

                  {/* employee phone */}

                  <Text
                    style={{
                      width: 200,
                      color: '#000000',
                    }}>
                    {item.phone}
                  </Text>

                  {/* employee action */}

                  <View
                    style={{
                      width: 100,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {/* edit button */}

                    <TouchableOpacity
                      onPress={() => {
                        setEditModalVisible(true);
                        setItemToEdit(item);
                      }}>
                      <Image
                        source={icons.editIcon}
                        style={{width: 20, height: 20}}
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
                        style={{width: 20, height: 20}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
