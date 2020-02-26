const axios = require("axios");
axios.interceptors.response.use(
  res => {
    console.log("Interceptors response");
    return res;
  },
  error => {
    console.log(error.message);
  }
);

axios
  .get("https://burger-app-8b24d.firebaseio.com/ingredients.json")
  .then(res => {
    console.log(res.status);
    console.log("Always run eventhough there is error");
  })
  .catch(e => {
    console.log(e.message);
    console.log("Error");
  });
