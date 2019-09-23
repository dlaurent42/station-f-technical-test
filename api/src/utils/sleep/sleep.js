export default (ms) => {
  const wait = new Date().getTime() + ms;
  do {
    // eslint-disable-line
  } while (wait > new Date().getTime());
};
