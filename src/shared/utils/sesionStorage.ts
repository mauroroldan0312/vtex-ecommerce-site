export const saveInSessionStorage = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};

export const getFromSessionStorage = (key: string) => {
  return sessionStorage.getItem(key);
};

export const removeFromSessionStorage = (key: string) => {
  sessionStorage.removeItem(key);
};
