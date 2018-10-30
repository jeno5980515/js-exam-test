import React from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { changeCategory } from 'actions/category';

import { getCategories } from 'questions/index';

const categories = getCategories();
const { Option } = Select;

const CategorySelector = ({ actions, index }) => (
  <Select
    onChange={actions.changeCategory}
    defaultValue={index}
    style={{ minWidth: 200 }}
  >
    { categories.map((q, i) => <Option key={q.name} value={i}>{q.name}</Option>)}
  </Select>
);

export default withRouter(connect(
  (state) => {
    return {
      index: state.category.index
    };
  },
  (dispatch) => {
    return {
      actions: {
        changeCategory: index => dispatch(changeCategory(index))
      }
    };
  }
)(CategorySelector));
