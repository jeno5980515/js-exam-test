const category = (state = { index: 0 }, action) => {
  switch (action.type) {
    case 'CATEGORY/RESET':
      return { index: 0 };
    case 'CATEGORY/CHANGE':
      return {
        ...state,
        index: action.index
      };
    default:
      return state;
  }
};

export default category;
