import { combineReducers } from 'redux';
import javascript from './javascript';
import react from './react';
import login from './login';
import category from './category';
import tape from './tape';
import _console from './console';

const reducer = combineReducers({
  javascript,
  react,
  login,
  category,
  tape,
  console: _console
});

export default reducer;
