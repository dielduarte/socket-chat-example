
import User from '../../utils/User';

const REGISTER_NEW_MESSAGE_LISTEN = 'chat/REGISTER_NEW_MESSAGE_LISTEN';
const REGISTER_USER_WRITING_LISTEN = 'chat/REGISTER_USER_WRITING_LISTEN';
const SEND_MESSAGE = 'chat/SEND_MESSAGE';
const UPDATE_MESSAGES_LIST = 'chat/UPDATE_MESSAGES_LIST';
const GET_USER = 'chat/GET_USER';
const USER_START_TYPING = 'chat/USER_START_TYPING';
const ADD_USER_ON_TYPING_LIST = 'chat/ADD_USER_ON_TYPING_LIST';
const REMOVE_USER_ON_TYPING_LIST = 'chat/REMOVE_USER_ON_TYPING_LIST';

export const sendMessage = (socket, userName, userColor, message) => dispatch => {
  const newMessage = { userName, userColor, message };
  dispatch({ type: SEND_MESSAGE });
  socket.emit('send_message', newMessage);
  dispatch({ type: UPDATE_MESSAGES_LIST, payload: { newMessage  } });
};

export const getUser = (socket) => dispatch => {
  const { name, color } = User.getUser();
  dispatch({ type: GET_USER, payload: { name, color } });
};

export const listenNewMessage = (socket) => dispatch => {
  dispatch({ type: REGISTER_NEW_MESSAGE_LISTEN });
  socket.on('new_message', newMessage => {
    dispatch({ type: UPDATE_MESSAGES_LIST , payload: { newMessage } })
    dispatch({ type: REMOVE_USER_ON_TYPING_LIST, payload: { newMessage } });
  });
};

export const startTyping = (socket, userName, userColor) => dispatch => {
  dispatch({ type: USER_START_TYPING });
  socket.emit('user_start_typing', { userName, userColor });
};

export const listenUserWriting = (socket) => dispatch => {
  dispatch({ type: REGISTER_USER_WRITING_LISTEN });
  socket.on('new_user_writing', newUser =>
    dispatch({ type: ADD_USER_ON_TYPING_LIST, payload: { newUser } })
  );
};


const initialState = {
  userName: '',
  userColor: '',
  messagesList: [],
  usersTypingList: []
};

export default function reducer(state = initialState, action){
  switch (action.type) {
    case GET_USER:
      const { name, color } = action.payload;

      return {
        ...state,
        userName: name,
        userColor: color
      }
    case UPDATE_MESSAGES_LIST:
      const { newMessage } = action.payload;

      return {
        ...state,
        messagesList: [
          ...state.messagesList,
          newMessage
        ]
      }
    case ADD_USER_ON_TYPING_LIST:
      const { newUser } = action.payload;

      return {
        ...state,
        usersTypingList: [
          ...state.usersTypingList,
          newUser
        ]
      }
    case REMOVE_USER_ON_TYPING_LIST:
      const usersTypingList = state.usersTypingList.filter(user => {
         if(user.userName !== action.payload.newMessage.userName) {
           return user;
         }
      });

      return {
        ...state,
        usersTypingList
      }
    default: return state
  }
};
