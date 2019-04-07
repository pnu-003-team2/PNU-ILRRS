import {
  COUNTER_UP,
  COUNTER_DOWN,
  increaseCounter,
  decreaseCounter,
  reducer,
  getCounter,
} from '../';

describe('counter', () => {
  describe('action creators', () => {
    it('should create increase counter action', () => {
      expect(increaseCounter()).toEqual({ type: COUNTER_UP });
    });

    it('should create decrease counter action', () => {
      expect(decreaseCounter()).toEqual({ type: COUNTER_DOWN });
    });
  });

  describe('reducer', () => {
    it('should return initial state', () => {
      expect(reducer(undefined, {}));
    });

    it('should handle increase counter action', () => {
      expect(reducer(0, { type: COUNTER_UP })).toBe(1);
    });

    it('should handle decrease counter action', () => {
      expect(reducer(1, { type: COUNTER_DOWN })).toBe(0);
    });
  });

  describe('selectors', () => {
    it('should return counter state', () => {
      expect(getCounter({ counter: 1 })).toBe(1);
    });
  });
});
