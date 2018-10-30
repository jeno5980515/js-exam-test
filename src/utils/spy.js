const spy = (obj, methodName) => {
  const origFn = obj[methodName];
  let callHistory = [];
  let calledWith = {};

  const secret = Math.random().toFixed(4) + '';
  obj[methodName] = (...args) => {
    const result = origFn.apply(obj, args);
    callHistory.push(args);
    calledWith[args.join(secret)] = true;
    return result;
  };
  return {
    calledWith: (...args) => !!calledWith[args.join(secret)],
    callCount: () => callHistory.length,
    restore: () => (obj[methodName] = origFn)
  };
};

export default spy;
