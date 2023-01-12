import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {editTask} from '../redux/taskSlice';
import {useDispatch} from 'react-redux';

const EditScreen = ({route, navigation}) => {
  const {item} = route.params; // get item from HomeScreen
  const todos = useSelector(state => state.tasks);
  console.log('todos', todos);
  const [value, setValue] = useState(item.name);
  const id = item.id;
  const dispatch = useDispatch();

  const update = () => {
    dispatch(editTask({id: id, name: value}));
  };

  const handleSubmit = (): void => {
    if (value.trim().length === 0) {
      Alert.alert('You need to enter a task');
      setValue('');
      return;
    }
  };

  return (
    <View style={{justifyContent: 'center', marginTop: 30}}>
      <Text style={styles.text}> Updating "{item.name}"</Text>

      <View>
        <TextInput
          style={styles.textInput}
          placeholderTextColor="pink"
          placeholder="New Todo..."
          value={value.toString()}
          onChangeText={text => setValue(text)}
        />
        <View style={styles.buttonStyle}>
          {/* Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleSubmit();
              update();
              navigation.pop(); //use this function to navigate back to the editing note
            }}>
            <Text style={{color: 'white'}}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}>
            <Text style={{color: 'white'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: 'red',
    marginLeft: 10,
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginLeft: 20,
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
  buttonStyle: {flexDirection: 'row', justifyContent: 'center'},
});

export default EditScreen;
