import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'brace';
import 'brace/mode/javascript';
import 'brace/theme/textmate';
import 'brace/theme/monokai';

import Grid from 'components/Grid';
import GridItem from 'components/Grid/GridItem';
import ConsolePanel from 'components/Panel/ConsolePanel';
import CodePanel from 'components/Panel/CodePanel';
import TestPanel from 'components/Panel/TestPanel';
import TapePanel from 'components/Panel/TapePanel';
import ControlPanel from 'components/Panel/ControlPanel';

import { addTape, resetTape } from 'actions/tape';
import { resetConsole } from 'actions/console';

import { getQuestions } from 'questions/index';

import debouncedRunCode from 'utils/runCode';
import { getStateInformation } from 'utils/stateHelper';

import './JavaScriptPage.css';

const questions = getQuestions('javascript');

class JavaScriptPage extends Component {
  constructor(props) {
    super(props);
    this.controlHeight = 70;
  }

  componentDidMount() {
    const { compiledCode, wrappedConsole, actions } = this.props;
    actions.resetConsole();
    debouncedRunCode({ code: compiledCode, wrappedConsole, onTapeUpdate: actions.addTape });
  }

  shouldComponentUpdate(nextProps) {
    const { compiledCode: previousCompiledCode } = this.props;
    const { compiledCode, wrappedConsole, actions } = nextProps;
    if (previousCompiledCode !== compiledCode) {
      actions.resetConsole();
      actions.resetTape();
      debouncedRunCode({ code: compiledCode, wrappedConsole, onTapeUpdate: actions.addTape });
    }
    return true;
  }

  render() {
    const {
      code,
      questionIndex,
      handleCodeChange,
      tape,
      console: _console
    } = this.props;
    const { test } = questions[questionIndex];
    const layout = [
      {
        key: 'code', x: 0, y: 0, width: window.innerWidth / 2, height: window.innerHeight / 2, minWidth: 100, minHeight: 100, maxWidth: 700, maxHeight: 500
      },
      {
        key: 'test', x: 0, y: 1, width: window.innerWidth / 2, height: window.innerHeight / 2, minWidth: 100, maxWidth: 700
      },
      {
        key: 'control', x: 1, y: 0, width: window.innerWidth / 2, height: this.controlHeight, static: true
      },
      {
        key: 'tape', x: 1, y: 1, width: window.innerWidth / 2, height: (window.innerHeight - this.controlHeight) / 2, minWidth: 100, minHeight: 100, maxWidth: 700, maxHeight: 500
      },
      {
        key: 'console', x: 1, y: 2, width: window.innerWidth / 2, height: (window.innerHeight - this.controlHeight) / 2, minWidth: 100, minHeight: 100, maxWidth: 700, maxHeight: 500
      },
    ];
    return (
      <div className="App">
        <Grid layout={layout} totalWidth={window.innerWidth} totalHeight={window.innerHeight}>
          <GridItem key="code">
            <CodePanel
              handleCodeChange={handleCodeChange}
              data={code}
              mode="javascript"
              theme="monokai"
            />
          </GridItem>
          <GridItem key="test">
            <TestPanel data={test} />
          </GridItem>
          <GridItem key="control">
            <ControlPanel type="javascript" />
          </GridItem>
          <GridItem key="tape">
            <TapePanel data={tape} />
          </GridItem>
          <GridItem key="console">
            <ConsolePanel className="bottom-panel" data={_console} />
          </GridItem>
        </Grid>
      </div>
    );
  }
}

export default withRouter(connect(
  (state) => {
    const { code, questionIndex, compiledCode } = getStateInformation(state);
    return {
      compiledCode,
      questionIndex,
      code,
      tape: state.tape,
      console: state.console
    };
  },
  (dispatch) => {
    return {
      actions: {
        resetTape: () => dispatch(resetTape()),
        addTape: data => dispatch(addTape(data)),
        resetConsole: () => dispatch(resetConsole())
      }
    };
  }
)(JavaScriptPage));
