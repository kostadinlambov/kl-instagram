
export const userService = {
  isAuth: () => {
    return localStorage.getItem("token") != null;
  },

  getUsername: () => {
    const token = localStorage.getItem("token");
    if (token != null && token !== undefined) {
      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload) {
        return payload["sub"];
      }
    }

    return null;
  },

  getUserId: () => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload) {
        return payload["id"];
      }
    }

    return null;
  },

  getRole: () => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload) {
        return payload["role"];
      }
    }
  },

  getFirstName: () => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload) {
        return payload["firstName"];
      }
    }
  }
};
