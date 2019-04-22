// Action constants
export const COUNTER_UP = 'COUNTER_UP';
export const COUNTER_DOWN = 'COUNTER_DOWN';

// Action creators
export function increaseCounter() {
  return {
    type: COUNTER_UP,
  };
}

export function decreaseCounter() {
  return {
    type: COUNTER_DOWN,
  };
}

// Reducers
export function reducer(state = 0, action) {
  switch (action.type) {
    case COUNTER_UP:
      return state + 1;
    case COUNTER_DOWN:
      return state - 1;
    default:
      return state;
  }
}

// Selectors
export const getCounter = state => state.counter;
