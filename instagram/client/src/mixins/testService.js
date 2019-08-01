

export default {
    isAuth: () => {
        return localStorage.getItem('token') != null;
      }
}