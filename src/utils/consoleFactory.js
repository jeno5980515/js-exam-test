const createWrappedConsole = (console, dispatch) => {
  return Object.keys(console).reduce((cal, key) => {
    const newCal = { ...cal };
    newCal[key] = (...args) => {
      dispatch({ type: 'CONSOLE/ADD', key, args: [...args] });
    };
    return newCal;
  }, {});
};

export default createWrappedConsole;
