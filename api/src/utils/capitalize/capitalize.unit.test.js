import capitalize from './capitalize';

describe('capitalize - function to capitalize following an array of separators', () => {

  it('should return "Damien Laurent-Nauguet" (dAMIEN LAURENT-nauguet)', () => {
    const res = capitalize('dAMIEN LAURENT-nauguet', [' ', '-']);
    expect(res).toBe('Damien Laurent-Nauguet');
  });

  it('should return "Damien Laurent-nauguet" (dAMIEN LAURENT-nauguet)', () => {
    const res = capitalize('dAMIEN LAURENT-nauguet');
    expect(res).toBe('Damien Laurent-nauguet');
  });
});
