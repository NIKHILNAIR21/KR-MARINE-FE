// session.ts

// Function to get the token from local storage
export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

// Function to clear the token from local storage
export const clearSession = (): void => {
  localStorage.removeItem("token");
};

// Function to set the token in local storage
export const setSession = (accessToken: string): void => {
  localStorage.setItem("token", accessToken);
};
