import React, { PureComponent } from 'react';
import './TypeArea.css';

class TypeArea extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isTyping: false
    };
  }

  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      const typeArea = this.refs.typeArea;
      this.props.onEnterPress(typeArea.value);
      typeArea.value = '';
      this.setState({ isTyping: false });
    }
  }

  handleChange = (e) => {
    if (!this.state.isTyping) {
      this.setState(
        { isTyping: true }, 
        () => this.props.onChange()
      );
    }
  }

  renderSentence(users) {
    const { usersTypingList } = this.props;

    if (usersTypingList.length !== 0) {
      if (usersTypingList.length === 1) {
        return ' is typing...';
      } else {
        return ' are typing...';
      }
    }
  }

  render() {
    const { usersTypingList } = this.props;

    return (
      <div className="container">
        <textarea
          className="area"
          onKeyUp={this.handleKeyPress}
          onChange={this.handleChange}
          ref="typeArea">
        </textarea>

        <div className="users-writing">
          {
            usersTypingList.map((user, id) => {
              return (
                <span className="user-writing" key={id} style={{ color: `rgb${user.userColor}` }}>{user.userName}</span>
              );
            })
          }

          {this.renderSentence()}
        </div>
      </div>
    );
  }
}

export default TypeArea;