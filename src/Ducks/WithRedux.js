import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chatActions from './modules/chat';

export const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ ...chatActions }, dispatch)
  }
};

function mapStateToProps(state) {
  return {
    messagesList: state.chat.messagesList,
    userColor: state.chat.userColor,
    userName: state.chat.userName,
    usersTypingList: state.chat.usersTypingList
  }
}

const WithRedux = Component => connect(mapStateToProps, mapDispatchToProps)(Component);

export default WithRedux;