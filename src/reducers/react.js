const code = (state = { index: 0 }, action) => {
  switch (action.type) {
    case 'REACT/CODE/RESET':
      return state;
    case 'REACT/CODE/CHANGE':
      return {
        ...state,
        compiledCode: action.compiledCode || state.compiledCode,
        [state.index]: {
          code: action.rawCode
        }
      };
    case 'REACT/QUESTION/RESET':
      return {
        ...state,
        compiledCode: '',
        [state.index]: {
          code: ''
        }
      };
    case 'REACT/QUESTION/CHANGE':
      return {
        ...state,
        index: action.index,
        compiledCode: ''
      };
    default:
      return state;
  }
};

export default code;
