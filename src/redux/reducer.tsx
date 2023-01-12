import {combineReducers} from 'redux';
const Todo = (State = [], action) => {
  switch (action.type) {
    case 'Create':
      return State.concat([action.data]);
    case 'Update':
      let {UUID, TextData} = action.data;
      let newData = State.map(el => {
        if (el.UUID === UUID) {
          return Object.assign({}, el, {TextData: TextData});
        }
        return el;
      });
      return newData;
    case 'Delete':
      return State.filter(post => post.UUID !== action.UUID);
    default:
      return State;
  }
};

export default combineReducers({
  Todo,
});
