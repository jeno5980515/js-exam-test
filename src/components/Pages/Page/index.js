import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { transform } from '@babel/standalone';

import ReactPage from 'components/Pages/ReactPage';
import JavaScriptPage from 'components/Pages/JavaScriptPage';

import { changeCode } from 'actions/code';

import createWrappedConsole from 'utils/consoleFactory';
import { getStateInformation } from 'utils/stateHelper';

const getPageComponent = (args) => {
  switch (args.index) {
    case 1: {
      return <ReactPage {...args} />;
    }
    default: {
      return <JavaScriptPage {...args} />;
    }
  }
};

class Page extends Component {
  constructor(props) {
    super(props);
    const { actions } = this.props;
    const { _dispatch: dispatch } = actions;
    this.wrappedConsole = createWrappedConsole(console, dispatch);
  }

  componentDidMount() {
    const { isLogin, history } = this.props;
    if (!isLogin) {
      history.push('/login');
      return;
    }
    const { state } = this.props;
    const { code } = getStateInformation(state);
    this.handleCodeChange(code);
  }

  componentDidUpdate(prevProps) {
    const { state: previousState } = prevProps;
    const { state } = this.props;
    const { categoryIndex: previousCategoryIndex } = getStateInformation(previousState);
    const { categoryIndex, code } = getStateInformation(state);
    if (previousCategoryIndex !== categoryIndex) {
      this.handleCodeChange(code);
    }
  }

  handleCodeChange = (newCode) => {
    const { actions, state } = this.props;
    const { question, type } = getStateInformation(state);
    const fullCode = `${newCode} ${question.test}`;
    try {
      const { code } = transform(fullCode, {
        presets: ['es2015', ['stage-2', { decoratorsBeforeExport: true }], 'react']
      });
      actions.changeCode({ compiledCode: code, rawCode: newCode, type });
    } catch (e) {
      actions.changeCode({ rawCode: newCode, type });
    }
  }

  render() {
    const { state } = this.props;
    const { handleCodeChange, wrappedConsole } = this;
    return (
      <React.Fragment>
        { getPageComponent({ index: state.category.index, handleCodeChange, wrappedConsole }) }
      </React.Fragment>
    );
  }
}

export default withRouter(connect(
  (state) => {
    return {
      state
    };
  },
  (dispatch) => {
    return {
      actions: {
        changeCode: args => dispatch(changeCode({ ...args, type: (args.type || 'javascript').toUpperCase() })),
        _dispatch: dispatch
      }
    };
  }
)(Page));
