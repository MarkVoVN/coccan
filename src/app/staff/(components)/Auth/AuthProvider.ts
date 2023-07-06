import { AuthProvider } from "react-admin";

const authProvider : AuthProvider = {
  login: ({ username, password }) => {
      if (username == 'admin' && password == 'admin') {
        localStorage.setItem('role', username);
        return Promise.resolve();
      }

      if (username == 'shipper' && password == 'shipper') {
        localStorage.setItem('role', username);
        return Promise.resolve();
      }

      if (username == 'hubmanager' && password == 'hubmanager') {
        localStorage.setItem('role', username);
        return Promise.resolve();
      }

      return Promise.reject();
  },
  logout: () => {
      localStorage.removeItem('role');
      return Promise.resolve();
  },
      checkAuth: () =>
      localStorage.getItem('role') ? Promise.resolve() : Promise.reject(),
  checkError:  (error) => {
      const status = error.status;
      if (status === 401 || status === 403) {
          localStorage.removeItem('role');
          return Promise.reject();
      }
      // other error code (404, 500, etc): no need to log out
      return Promise.resolve();
  },
  getIdentity: () =>
      Promise.resolve({
          id: 'user',
          fullName: 'John Doe',
      }),
  getPermissions: () => {
    const role = localStorage.getItem('role');
    return role ? Promise.resolve(role) : Promise.reject();
  },
};

export default authProvider;