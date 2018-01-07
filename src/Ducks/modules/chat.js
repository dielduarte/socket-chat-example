
import User from '../../utils/User';

const REGISTER_NEW_MESSAGE_LISTEN = 'chat/REGISTER_NEW_MESSAGE_LISTEN';
const SEND_MESSAGE = 'chat/SEND_MESSAGE';
const UPDATE_MESSAGES_LIST = 'chat/UPDATE_MESSAGES_LIST';
const GET_USER = 'chat/GET_USER';

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
  socket.on('new_message', newMessage =>
    dispatch({ type: UPDATE_MESSAGES_LIST , payload: {newMessage} })
  );
};


const initialState = {
  userName: '',
  userColor: '',
  messagesList: []
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
    default: return state
  }
};
