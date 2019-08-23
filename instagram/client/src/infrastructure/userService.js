export const userService = {
  isAuth: () => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const role = payload["role"];

        if (payload) {
          if (role !== null || role !== undefined) {
            return true;
          }
        }
      } catch (err) {
        localStorage.clear();

        this.$toast.open({
          message: "Unauthorized",
          type: "error"
        });
      }
    }
    return false;
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
  },

  getLastName: () => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload) {
        return payload["lastName"];
      }
    }
  },

  getProfilePicUrl: () => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload) {
        return payload["profilePicUrl"];
      }
    }
  },

  isAdminOrRoot: () => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload) {
        const role = payload["role"];
        if (role === "ROOT" || role === "ADMIN") {
          return true;
        }
        return false;
      }
    }
  },

  getUserData() {
    const userData = {
      username: this.getUsername(),
      id: this.getUserId(),
      firstName: this.getFirstName(),
      lastName: this.getLastName(),
      role: this.getRole(),
      getProfilePicUrl: this.getProfilePicUrl(),
      isAdminOrRoot: this.isAdminOrRoot()
    };

    return userData;
  },

  async getImageClass(imageUrl) {
    let img = await this.getMeta(imageUrl);

    let w = img.width;
    let h = img.height;
    // console.log("w", w);
    // console.log("h", h);
    // alert(w + " " + h);
    if (w >= h) {
      return "l";
    }

    return "";
  },

  getMeta(url) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  },
};
