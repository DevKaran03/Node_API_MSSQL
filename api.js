var Products = require("./Products");
const dboperation = require("./dboperation");

var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);
router.route("/products").get((req, res) => {
  dboperation.getOrders().then((result) => {
    //console.log(result);
    res.json(result[0]);
  });
});
router.route("/products/:id").get((req, res) => {
  dboperation.S_product(req.params.id).then((result) => {
    //console.log(result);
    res.json(result[0]);
  });
});
var port = 5000;
app.listen(port);
console.log("API is running on" + port);
