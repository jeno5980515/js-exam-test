import React from 'react';
import { Input, Button } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { submitPassword } from 'actions/login';
import 'components/Pages/LoginPage/LoginPage.css';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { password: '', error: '' };
  }

  componentDidUpdate() {
    const { isLogin, history } = this.props;
    if (isLogin) {
      history.push('/');
    }
  }

  onSubmit = (e) => {
    const { password } = this.state;
    const { actions } = this.props;
    e.preventDefault();
    actions.submitPassword(password);
  }

  render() {
    const { error } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.onSubmit}>
          <div style={{ display: 'flex' }}>
            <Input
              placeholder="input the password to login"
              onChange={e => this.setState({ password: e.target.value })}
              style={{ width: 200, marginRight: 5 }}
            />
            <Button type="primary" htmlType="submit">Login</Button>
          </div>
        </form>
        <div className="error">{ error }</div>
      </div>
    );
  }
}

export default withRouter(connect(
  (state) => {
    return {
      isLogin: state.login.isLogin
    };
  },
  (dispatch) => {
    return {
      actions: {
        submitPassword: password => dispatch(submitPassword(password))
      }
    };
  }
)(LoginPage));
