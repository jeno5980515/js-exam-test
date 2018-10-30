const tape = (state = [], action) => {
  switch (action.type) {
    case 'TAPE/RESET': {
      return [];
    }
    case 'TAPE/ADD': {
      return [...state, action.data];
    }
    default:
      return state;
  }
};

export default tape;
