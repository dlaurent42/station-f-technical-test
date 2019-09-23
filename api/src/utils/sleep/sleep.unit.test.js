import sleep from './sleep';

describe('sleep - function to sleep thread for some time', () => {

  it('should wait 1000ms', () => {
    const before = Math.floor(new Date().getTime() / 1000);
    sleep(1000);
    const after = Math.floor(new Date().getTime() / 1000);
    expect(after - before).toBe(1);
  });

  it('should not wait (invalid input)', () => {
    const before = Math.floor(new Date().getTime() / 1000);
    sleep('test');
    const after = Math.floor(new Date().getTime() / 1000);
    expect(after - before).toBe(0);
  });

});
