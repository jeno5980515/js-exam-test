const questionList = [
  {
    name: 'countChar',
    content: `
/**
 * Implement the function 'countChar'
 * to count the occurance of each character for the input string,
 * and return an object containing those information.
 *
 * For example :
 *  input string: 'abca'
 *
 *  returned object:
 *  {
 *     a: 2,
 *     b: 1,
 *     c: 1
 *  }
 */

/**
 * Implement function body
 */
function countChar(s) {

}

`,
    test: `
test('countChar test', (t) => {
  t.subtest('should return character count in an object', t => {
    const result = countChar();
    t.equal(typeof result, 'object');
  });
  t.subtest('should be able to count chars', t => {
    const input = 'abca';
    const result = countChar(input);
    t.equal(result.a, 2);
    t.equal(result.b, 1);
  });
  t.subtest('should be able count some longer string as well', t => {
    const input = 'The Quick Brown Fox Jumps Over The Lazy Dog';
    const result = countChar(input);
    t.equal(result[' '], 8);
    t.equal(result.T, 2);
    t.equal(result.o, 3);
  });
})

`
  },
  {
    name: 'forEach, map and reduce',
    content: `
/**
 * Implement the function 'forEach, map and reduce'
 *
 */

/**
 * Implement function body
 */
const myForEach = function (array, callback) {

}

const myMap = function (array, callback) {

}

const myReduce = function (array, callback, initValue) {

}

`,
    test: `
test('forEach, map and reduce test', (t) => {
  t.subtest('should execute forEach correctly', t => {
    let count = 0;
    myForEach([1, 2, 3, 4], (val, index) => count += val * index * index);
    t.equal(count, 50);
  });
  t.subtest('should execute map correctly', t => {
    const result = myMap([1, 2, 3, 4], (val, index) => val * index * index);
    t.equal(result[0], 0);
    t.equal(result[2], 12);
  });
  t.subtest('should execute reduce correctly', t => {
    const result = myReduce([10, 2, 3], (cal, val, index) => cal + val * index, 0);
    t.equal(result, 8);
  });
});

`
  },
  {
    name: 'adder',
    content: `
/**
 * Implement a function 'adder'
 * which behavior is like the following example
 *
 * ex:
 *   addTen = adder(10)
 *   addFive = adder(5)
 *
 *   addTen(10)  // return 20
 *   addFive(10) // return 15
*/

/**
 * Implement function body
 */
function adder() {
}

`,
    test: `
test('adder test', (t) => {
  t.subtest('should return a function', t => {
    t.equal(typeof adder(), 'function');
  });
  t.subtest('should be able to add two numbers', t => {
    const add5 = adder(5);
    t.equal(add5(10), 15);
    t.equal(add5(20), 25);

    t.equal(adder(40)(2), 42);
  });
})

`
  },
  {
    name: 'infinite adder',
    content: `
/**
 * Implement a function 'adder'
 * which behavior is like the following example
 *
 * ex:
 *
 *   adder(10)(20)(30).getValue()  // return 60
 *   adder(10)(20)(30)(40).getValue() // return 100
*/

/**
 * Implement function body
 */
function adder() {
}

`,
    test: `
test('adder test', (t) => {
  t.subtest('should return a function', t => {
    t.equal(typeof adder(), 'function');
  });
  t.subtest('should get default value with 0', t => {
    t.equal(adder().getValue(), 0);
  });
  t.subtest('should be able to add mutiple numbers', t => {
    t.equal(adder(10).getValue(), 10);
    t.equal(adder(10)(20)(30).getValue(), 60);
    t.equal(adder(10)(20)(30)(40).getValue(), 100);
  });
})

`
  },
  {
    name: 'default function',
    content: `
/**
 * Implement a function 'defaultWith'
 * which behavior is like the following example
 *
 * ex:
 *
 *   const fn = ({ a, b }) => a + b;
 *   const boundFn = defaultWith(fn, { a: 10 });
 *   boundFn({ b: 20 }); // return 30
*/

/**
 * Implement function body
 */
function defaultWith() {
}

`,
    test: `
test('defaultWith test', (t) => {
  t.subtest('should return a function', t => {
    const fn = () => {};
    t.equal(typeof defaultWith(fn, {}), 'function');
  });
  t.subtest('should get correct result when all parameters are given', t => {
    const fn = ({ a, b }) => a * 2 + b * 3;
    const boundFn = defaultWith(fn, { a: 3 });
    t.equal(boundFn({ b: 4 }), 18);
  });
  t.subtest('should get correct result when all parameters are given', t => {
    const fn = ({ x, y, z }) => x * y * z;
    const boundFn = defaultWith(fn, { x: 3, y: 4 });
    t.equal(boundFn({ x: 7, z: 2 }), 56);
  });
})

`
  },
  {
    name: 'sequential',
    content: `
/**
 * Implement the function 'sequential'
 * to execute async functions in sequence.
 *
 * 'sequential' takes an array of async functions as parameter,
 * and execute each of them after previous one has done.
 */

/**
 * Implement function body
 */
function sequential(tasks = []) {

}

`,
    test: `
function asyncTask1(done) {
  setTimeout(() => {
    console.log('task 1 done');
    done(1);
  }, 500);
}
function asyncTask2(done) {
  setTimeout(() => {
    console.log('task 2 done');
    done(2);
  }, 400);
}
function asyncTask3(done) {
  setTimeout(() => {
    console.log('task 3 done');
    done(3);
  }, 300);
}

const tasks = [asyncTask1, asyncTask2, asyncTask3];

test('sequential test', (t) => {
  const log = spy(console, 'log');
  sequential(tasks);
  t.equal(log.callCount(), 0);
  clock.tick(600);
  t.equal(log.callCount(), 1);
  t.ok(log.calledWith('task 1 done'));
  clock.tick(600);
  t.equal(log.callCount(), 3);
  t.ok(log.calledWith('task 3 done'));
});

    `
  },
  {
    name: 'parallel',
    content: `
/**
 * Implement the function 'parallel'
 * to execute async functions at once.
 *
 * 'parallel' takes an array of async functions as parameter,
 * and execute each of them in the same time.
 *
 */

/**
 * Implement function body
 */
function parallel(tasks = [], callback) {
}

`,
    test: `
function asyncTask1(done) {
  setTimeout(() => {
    console.log('task 1 done');
    done(1);
  }, 500);
}
function asyncTask2(done) {
  setTimeout(() => {
    console.log('task 2 done');
    done(2);
  }, 400);
}
function asyncTask3(done) {
  setTimeout(() => {
    console.log('task 3 done');
    done(3);
  }, 300);
}

const tasks = [asyncTask1, asyncTask2, asyncTask3];

test('parallel test', t => {
  t.subtest('should run all tasks at once', t => {
    const spyLog = spy(console, 'log');
    parallel(tasks, (result) => { /* do nothing */ });
    t.equal(spyLog.callCount(), 0);
    clock.tick(600);
    t.equal(spyLog.callCount(), 3);
  });

  t.subtest('should get task result in an array', t => {
    let obj = {};
    parallel(tasks, (result) => {
      obj.result = result;
    });
    clock.tick(600);
    t.deepEqual(obj.result, [1, 2, 3]);
  });

  t.subtest('should trigger callback only once', t => {
    let count = 0;
    const callback = () => count++;

    parallel(tasks, callback);
    clock.tick(300);
    t.equal(count, 0);
    clock.tick(600);
    t.equal(count, 1);
  });
});

`
  },
  {
    name: 'combineReducers',
    content: `
// http://redux.js.org/docs/api/combineReducers.html
function combineReducers(reducers) {
}

function calc(state = 0, action) {
  switch(action.type) {
    case 'ADD':
      return state + 1;
    case 'DEC':
      return state - 1;
    default:
      return state;
  }
}

function calledCount(state = 0, action) {
  if(action.type == 'CALL') {
    return state + 1;
  }
  return state;
}

`,
    test: `
test('combineReducers', t => {
  const reducer = combineReducers({
    calc: calc,
    calls: calledCount,
  });

  t.subtest('should init states', t => {
    let state = {};
    state = reducer(state, {type: ''});
    t.equal(state.calc, 0);
    t.equal(state.calls, 0);
  });

  t.subtest('should handle actions', t => {
    let state = {};
    state = reducer(state, {type: 'ADD'});
    t.equal(state.calc, 1);
    state = reducer(state, {type: 'ADD'});
    t.equal(state.calc, 2);
  });
})
`
  },
  {
    name: 'applyMiddleware',
    content: `
// http://redux.js.org/docs/api/applyMiddleware.html

function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = store.dispatch;
    /**************************
     implement              here
     **************************/




    /***************************/
    return Object.assign(store, { dispatch })
  }
}

`,
    test: `

function createStore(reducer, preloadedState, enhancer) {

  if (typeof enhancer !== 'undefined') {
    return enhancer(createStore)(reducer, preloadedState)
  }

  let currentReducer = reducer;
  let currentState = preloadedState;

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = currentReducer(currentState, action);
  }

  dispatch({ type: '@@INIT' });

  return {
    dispatch,
    getState
  };
}

function calc(state = 0, action) {
  switch(action.type) {
    case 'ADD':
      return state + 1;
    case 'DEC':
      return state - 1;
    default:
      return state;
  }
}

const thunk = ({ getState, dispatch }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }
  return next(action);
}

test('applyMiddleware test', t => {

  t.subtest('should execute normal action', t => {
    const store = createStore(calc, 0, applyMiddleware(thunk));
    store.dispatch({ type: 'ADD' });
    t.equal(store.getState(), 1);
  });

  t.subtest('should execute function action', t => {
    const store = createStore(calc, 0, applyMiddleware(thunk));
    const incrementAsync = (dispatch, getState) => {
      setTimeout(() => {
        dispatch({ type: 'ADD' });
      }, 1000);
    };
    store.dispatch(incrementAsync);
    store.dispatch(incrementAsync);
    store.dispatch(incrementAsync);
    store.dispatch(incrementAsync);
    store.dispatch(incrementAsync);
    t.equal(store.getState(), 0);
    clock.tick(1000);
    t.equal(store.getState(), 5);
  });

  t.subtest('should apply mutiple middlewares in the right order', t => {
    let logCount = 1;
    const log = () => next => action => {
      logCount += 1;
      next(action);
    }
    const log2 = () => next => action => {
      logCount *= 2;
      next(action);
    }
    const store = createStore(calc, 0, applyMiddleware(log, log2));
    store.dispatch({ type: 'ADD' });
    store.dispatch({ type: 'ADD' });
    store.dispatch({ type: 'ADD' });
    t.equal(logCount, 22);
  });
})
`
  },
  {
    name: 'createStore',
    content: `
// http://redux.js.org/docs/api/createStore.html

function createStore(reducer, preloadedState, enhancer) {

  function getState() {

  }

  function subscribe(listener) {

  }

  function dispatch(action) {

  }

  dispatch({ type: '@@INIT' })

  return {
    dispatch,
    subscribe,
    getState
  }
}


`,
    test: `
function calc(state = 0, action) {
  switch(action.type) {
    case 'ADD':
      return state + 1;
    case 'DEC':
      return state - 1;
    default:
      return state;
  }
}

const wrappedThunk = (createStore) => {
  return function (...args) {
    const store = createStore(...args);
    const { dispatch, getState } = store;
    store.dispatch = (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }
      dispatch(action);
    }
    return store;
  }
}

test('createStore test', t => {

  t.subtest('should execute getState successfully', t => {
    const store = createStore(calc, 0);
    t.equal(store.getState(), 0);
  });

  t.subtest('should execute dispatch successfully', t => {
    const store = createStore(calc, 0);
    t.equal(store.getState(), 0);
    store.dispatch({ type: 'ADD' });
    t.equal(store.getState(), 1);
  });

  t.subtest('should execute subscribe and unsubscribe successfully', t => {
    const store = createStore(calc, 0);
    let dispatchCount = 1;
    let dispatchCount2 = 3;
    const unsubscribeForCount = store.subscribe(() => dispatchCount *= 2);
    const unsubscribeForCount2 = store.subscribe(() => dispatchCount2 *= 2);
    store.dispatch({ type: 'ADD' });
    store.dispatch({ type: 'ADD' });
    store.dispatch({ type: 'ADD' });
    t.equal(dispatchCount, 8);
    t.equal(dispatchCount2, 24);
    unsubscribeForCount();
    store.dispatch({ type: 'ADD' });
    store.dispatch({ type: 'ADD' });
    unsubscribeForCount2();
    store.dispatch({ type: 'ADD' });
    t.equal(dispatchCount, 8);
    t.equal(dispatchCount2, 96);
  });

  t.subtest('should execute enhancer successfully', t => {
    const store = createStore(calc, 0, wrappedThunk);
    const incrementAsync = (dispatch, getState) => {
      setTimeout(() => {
        dispatch({ type: 'ADD' });
      }, 1000);
    };
    store.dispatch(incrementAsync);
    store.dispatch(incrementAsync);
    store.dispatch(incrementAsync);
    store.dispatch(incrementAsync);
    store.dispatch(incrementAsync);
    t.equal(store.getState(), 0);
    clock.tick(1000);
    t.equal(store.getState(), 5);
  });
})
`
  },
  {
    name: 'explain',
    content: `
// explain the purpose of following code;
// modify variable name and/or code style when appropriate;
// add comments where you see fit
function foo(a, b) {
  var c = [];
  for(var i0 = 0, i1 = 0; i0 < a.length && i1 < b.length; ) {
    if(a[i0] < b[i1]) {
      c.push(a[i0++]);
    }
    if(a[i0] >= b[i1]) {
      c.push(b[i1++]);
    }
  }
  if(i0 < a.length) {
    for(var i = i0; i < a.length; i++) {
      c.push(a[i]);
    }
  }
  if(i1 < b.length) {
    for(var i = i1; i < b.length; i++) {
      c.push(b[i]);
    }
  }
  return c;
}

console.log(foo([1,4,5], [2,3,6]))
`
  },
  {
    name: 'mergeSort',
    content: `
// implement function merge, so mergeSort can run correctly
function merge(arr1, arr2) {
  // TODO enter your code here
  return arr1;
}

function mergeSort(arr) {
  if(arr.length <= 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const sortedArr1 = mergeSort(arr.slice(0, mid));
  const sortedArr2 = mergeSort(arr.slice(mid));
  return merge(sortedArr1, sortedArr2);
}

`,
    test: `
test('mergeSort', t => {
  t.deepEqual(mergeSort([6,3,5,10,2,100,4,1]),[1,2,3,4,5,6,10,100]);
  const randomNumbers = Array.from({length: 20})
    .map(() => Math.floor(Math.random() * 100));
  const sorted = randomNumbers.slice(0).sort((a, b) => a - b);
  t.deepEqual(mergeSort(randomNumbers), sorted);
})
`
  },
];

export default questionList;
