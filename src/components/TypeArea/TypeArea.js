import React, { PureComponent } from 'react';
import './TypeArea.css';

class TypeArea extends PureComponent {
  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      const typeArea = this.refs.typeArea;
      this.props.onEnterPress(typeArea.value);
      typeArea.value = '';
    }
  }

  render() {
    return (
      <div className="container">
        <textarea
          className="area"
          onKeyUp={this.handleKeyPress}
          ref="typeArea">
        </textarea>
      </div>
    );
  }
}

export default TypeArea;