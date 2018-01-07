import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import './App.css';
import TypeArea from './components/TypeArea';
import MessagesList from './components/MessagesList';
import { WithRedux, initStore } from './Ducks';
import { Provider } from 'react-redux';

const SOCKET_PORT = 'http://localhost:8080/';
const store = initStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = io.connect(SOCKET_PORT);
  }

  render() {
    const { userName, userColor, usersTypingList } = this.props;
    const { sendMessage, startTyping } = this.props.actions;

    return (
      <div className="app">
        <div className="app-chat">
          <MessagesList messages={this.props.messagesList} />
          <TypeArea
            onEnterPress={message => sendMessage(this.socket, userName, userColor, message)}
            onChange={() => startTyping(this.socket, userName, userColor)}
            usersTypingList={usersTypingList}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { listenNewMessage, getUser, listenUserWriting } = this.props.actions;

    listenNewMessage(this.socket);
    listenUserWriting(this.socket);
    getUser(this.socket);
  }
}

const Main = WithRedux(App);

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('root')
);
