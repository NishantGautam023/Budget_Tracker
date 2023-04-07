// LocalStorage

// fetches any data given a Key in our LocalStorage and return to us.
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
