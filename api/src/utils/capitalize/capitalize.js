export default (string, separators = [' ']) => {
  const array = string.split('');
  return array.map((el, idx) => (
    (idx && !separators.includes(array[idx - 1]))
      ? el.toLowerCase()
      : el.toUpperCase()
  )).join('');
};
