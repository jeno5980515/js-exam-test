const Console = (state = [], action) => {
  switch (action.type) {
    case 'CONSOLE/RESET':
      return [];
    case 'CONSOLE/ADD':
      return [
        ...state,
        {
          key: action.key,
          args: action.args
        }
      ];
    default:
      return state;
  }
};

export default Console;
