import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { resetQuestion } from 'actions/code';

import QuestionSelector from 'components/Selectors/QuestionSelector';
import CategorySelector from 'components/Selectors/CategorySelector';

import { Button } from 'antd';
import styles from './ControlPanel.module.scss';

const ControlPanel = ({ actions, type }) => (
  <div className={styles.control}>
    <CategorySelector />
    <QuestionSelector />
    <Button type="danger" onClick={() => actions.resetQuestion(type)}>Reset</Button>
  </div>
);

export default withRouter(connect(
  () => {
    return {

    };
  },
  (dispatch) => {
    return {
      actions: {
        resetQuestion: type => dispatch(resetQuestion({ type: type.toUpperCase() }))
      }
    };
  }
)(ControlPanel));
