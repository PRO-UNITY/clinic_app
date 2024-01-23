// clearInputs.js
export const clearInputs = (setters: any) => {
  setters.forEach((set: any) => {
    if (typeof set === 'function') {
      set('');
    }
  });
};
