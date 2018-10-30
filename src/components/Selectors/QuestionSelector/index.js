import React from 'react';
import { Select } from 'antd';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { changeQuestion } from 'actions/code';

import { getStateInformation } from 'utils/stateHelper';

const { Option } = Select;

const QuestionSelector = ({ actions, state }) => {
  const {
    questionIndex,
    type,
    questions
  } = getStateInformation(state);
  return (
    <Select
      onChange={index => actions.changeQuestion({ index, type: type.toUpperCase() })}
      defaultValue={questionIndex}
      style={{ minWidth: 200 }}
    >
      { questions.map((q, i) => <Option key={q.name} value={i}>{q.name}</Option>)}
    </Select>
  );
};

export default withRouter(connect(
  (state) => {
    return {
      state
    };
  },
  (dispatch) => {
    return {
      actions: {
        changeQuestion: ({ index, type }) => dispatch(changeQuestion({ index, type }))
      }
    };
  }
)(QuestionSelector));
