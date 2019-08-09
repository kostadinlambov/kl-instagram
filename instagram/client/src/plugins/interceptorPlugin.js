export default {
 install(Vue, options) {
  Vue.http.interceptors.push((request, next) => {
    const token = localStorage.getItem("token");

    if ( token && token.length && !request.url.endsWith("login") && !request.url.endsWith("register")) {
      request.headers.set("Authorization", `Bearer ${token}`);
      request.headers.set("Accept", 'application/json');
    }

    next(responce => {
      if (responce.status === 200 && responce.url.endsWith("login")) {
        saveToken(responce.body);
      }

      if(responce.status === 0 && !responce.body){
        responce.body = {'message': 'Server Error!'}
        responce.status = '500'
      }

    });
  });
}
}

const saveToken = data => {
  const token = JSON.parse(data).split(" ")[1];
  localStorage.setItem("token", token);
};

