/*
  This mixin permits to change page title once mounted (can be used for dynamic rendering)
*/
const getTitle = (vm) => {
  const { title } = vm.$options;
  return (title && typeof title === 'function')
    ? title.call(vm)
    : title;
};

export default {
  created() {
    const title = getTitle(this);
    if (title) {
      document.title = title;
    }
  },
};
