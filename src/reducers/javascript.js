const code = (state = { index: 0 }, action) => {
  switch (action.type) {
    case 'JAVASCRIPT/CODE/RESET':
      return state;
    case 'JAVASCRIPT/CODE/CHANGE':
      return {
        ...state,
        compiledCode: action.compiledCode || state.compiledCode,
        [state.index]: {
          code: action.rawCode
        }
      };
    case 'JAVASCRIPT/QUESTION/RESET':
      return {
        ...state,
        [state.index]: {
          code: ''
        }
      };
    case 'JAVASCRIPT/QUESTION/CHANGE':
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
