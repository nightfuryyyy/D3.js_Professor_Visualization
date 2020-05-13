const api = require("./api");

const routeMethod =app => {
    app.use("/", api);

};
module.exports= routeMethod;