import {createSlice, nanoid} from '@reduxjs/toolkit';
export const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      console.log(nanoid());
      // 'dgPXxUz_6fWIQBD8XmiSy'

      console.log(action.payload);
      const newTask = {
        id: nanoid(),
        name: action.payload.task,
      };
      state.push(newTask);
    },
    deleteTask: (state, action) => {
      console.log('delete', action.payload.id);
      console.log('state', state);
      return state.filter(item => item.id !== action.payload.id);
    },
    editTask: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      const updatedState = [...state];
      return void (updatedState[index].name = action.payload.name);
    },
  },
});

export const {addTask, deleteTask, editTask} = taskSlice.actions;

export default taskSlice.reducer;
