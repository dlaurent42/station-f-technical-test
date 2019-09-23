import isEmpty from './isEmpty';

describe('isEmpty - function to tell is given object empty', () => {

  it('should return true (null)', () => {
    const res = isEmpty(null);
    expect(res).toBe(true);
  });

  it('should return true (undefined)', () => {
    const res = isEmpty(test);
    expect(res).toBe(true);
  });

  it('should return true (empty object)', () => {
    const res = isEmpty({});
    expect(res).toBe(true);
  });

  it('should return true (empty string)', () => {
    const res = isEmpty('');
    expect(res).toBe(true);
  });

  it('should return false (non-empty object)', () => {
    const res = isEmpty({ test: 'yes' });
    expect(res).toBe(false);
  });

});
