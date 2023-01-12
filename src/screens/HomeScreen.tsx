import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {deleteTask} from '../redux/taskSlice';
import {useDispatch} from 'react-redux';
import Modal from 'react-native-modal';
import {addTask} from '../redux/taskSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = ({navigation, route}) => {
  // const {element} = route.params;
  // console.log('new todo', element.value);
  // Add todos
  const [todo, setTodo] = useState('');
  // Add Modal
  const [isModalVisible, setIsModalVisible] = useState<Boolean>(false);
  const handleModal = (): void => setIsModalVisible(() => !isModalVisible);

  const dispatch = useDispatch();

  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<Boolean>(false);
  const handleDeleteModal = (): void =>
    setIsDeleteModalVisible(() => !isDeleteModalVisible);
  const todos = useSelector(state => state.tasks);
  console.log('Todos:', todos);
  // const item2 = navigation.getParam('item');
  // console.log('value', item.value);

  //to Edit
  //   const [data, setData] = useState(toDoList);
  const [isRender, setIsRender] = useState(false);
  const [inputText, setinputText] = useState('');
  const [editId, seteditId] = useState('');
  console.log('inputText: ', inputText);
  console.log('EditId: ', editId);
  // Edit Modal visiblity
  const [isEditModalVisible, setIsEditModalVisible] = useState<Boolean>(false);
  const handleEditModal = (): void =>
    setIsEditModalVisible(() => !isEditModalVisible);

  const onSubmitTask = () => {
    if (todo.trim().length === 0) {
      Alert.alert('You need to enter a task');
      setTodo('');
      return;
    }
    dispatch(
      addTask({
        task: todo,
      }),
    );
    setTodo('');
  };
  //delete item by checking if id is equal to the id of the item
  const onDelete = id => {
    console.log('id passed in: ', id);
    dispatch(
      deleteTask({
        id: id,
      }),
    );
  };

  // const onEdit = () => {

  // }
  const onPressItem = ({item}) => {
    setIsEditModalVisible(true);
    setinputText(item.name);
    seteditId(item.id);
  };

  const handleEditItem = editId => {
    const newToDoList = todos.map(item => {
      if (item.id == editId) {
        item.name = inputText;
        return item;
      }
      return item;
    });
    setTodo(newToDoList);
    setIsRender(!isRender);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.name} </Text>
        {/* Delete Button */}
        <TouchableOpacity
          onPress={() => {
            seteditId(item.id);
            setinputText(item.name);
            handleDeleteModal();
          }}>
          <Icon name="trash" size={30} color="red" />
        </TouchableOpacity>

        {/* Edit Button */}
        <TouchableOpacity
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.navigate('Edit', {
              todos: item.id,
              item: item,
              // otherParam: 'anything you want here',
            });
            // onPressItem({item});
            setIsRender(!isRender);
          }}>
          <Icon name="pencil-outline" size={30} color="red" />
        </TouchableOpacity>
      </View>
    );
  };
  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };
  return (
    <SafeAreaView style={styles.container}>
      <Button title="Clear all" onPress={clearAsyncStorage} />

      <View style={styles.todoList}>
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={isRender}
        />
      </View>

      {/* Add Todo */}
      <View style={styles.todoHeader}>
        <TouchableOpacity style={styles.Addbutton} onPress={handleModal}>
          <Icon name="add-circle-outline" size={50} color="red" />
        </TouchableOpacity>
        {/* Add Modal */}
        <Modal
          isVisible={isModalVisible}
          transparent={true}
          animationIn="slideInUp"
          animationOut="slideOutDown">
          <View style={styles.ModalContainer}>
            <Text style={styles.modalTitle}> Create Todo </Text>
            {/* TextInput */}
            <TextInput
              style={styles.textInput}
              placeholder="Add todo"
              onChangeText={setTodo}
              value={todo}
              style={styles.inputBox}
            />
            <View style={styles.buttonStyle}>
              {/* Button */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  onSubmitTask();
                  handleModal();
                }}>
                <Text style={{color: 'white'}}>Add</Text>
              </TouchableOpacity>
              {/* Cancel */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handleModal();
                }}>
                <Text style={{color: 'white'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      {/* // DeleteModal */}
      <Modal
        isVisible={isDeleteModalVisible}
        transparent={true}
        animationIn="lightSpeedIn"
        animationOut="lightSpeedOut">
        <View style={styles.ModalContainer}>
          <Text style={styles.modalTitle}>
            {' '}
            Do you want to remove "{inputText}"?{' '}
          </Text>
          <View style={styles.buttonStyle}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                onDelete(editId);
                handleDeleteModal();
              }}>
              <Text style={{color: 'white'}}>Remove</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleDeleteModal}>
              <Text style={{color: 'white'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isVisible={isEditModalVisible}
        animationIn="bounceIn"
        animationOut="bounceOut">
        <View style={styles.ModalContainer}>
          <Text style={styles.modalTitle}>Update Todo</Text>
          <TextInput
            placeholder="Enter new toDo"
            placeholderTextColor="pink"
            value={inputText}
            onChangeText={text => setinputText(text)}
            style={styles.inputBox}
            editable={true}
            multiline={false}
            maxLength={200}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleEditItem(editId);

              // navigation.navigate('Edit', {todos: item.id, item: item});
              handleEditModal();
            }}>
            <Text style={{color: 'white'}}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleEditModal}>
            <Text style={{color: 'white'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-end',
  },
  todoList: {
    marginBottom: 10,
    justifyContent: 'flex-start',
    flex: 1,
  },
  todoHeader: {
    marginBottom: 20,
    alignItems: 'flex-end',
    marginLeft: 100,
  },
  item: {
    backgroundColor: '#e9e9e9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: 'black',
    width: 200,
  },
  modalTitle: {
    fontSize: 18,
    color: 'red',
  },
  ModalContainer: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 30,
  },
  deleteText: {
    fontSize: 30,
    color: 'red',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: 'black',
  },
  textInput: {
    borderColor: 'white',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    width: '90%',
    borderRadius: 5,
    color: 'black',
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    margin: 10,
    width: '30%',
    borderRadius: 5,
    alignItems: 'center',
  },
  Addbutton: {
    padding: 10,
    marginLeft: 30,
    width: '30%',
    alignContent: 'flex-end',
  },
  inputBox: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    width: 300,
    color: 'black',
  },
  buttonStyle: {flexDirection: 'row', justifyContent: 'center'},
});

export default HomeScreen;
