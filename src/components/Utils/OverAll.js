export const getUserData = () => {
  const userStr = sessionStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  else return null;
};

export const getTokenFromSession = () => {
  let accessToken = sessionStorage.getItem("accessToken");
  return accessToken || null;
};

export const removeUserSession = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("user");
};

export const setUserSession = (token, user) => {
  sessionStorage.setItem("accessToken", token);
  sessionStorage.setItem("user", JSON.stringify(user));
};
