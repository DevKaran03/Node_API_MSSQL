const sql = require("mssql");
var config = {
  user: "sa",
  password: "test123",
  server: "127.0.0.1",
  database: "HCMDRD",
  options: {
    trustedconnection: true,
    enableArithAbort: true,
    instancename: "SQLEXPRESS",
  },
  port: 55512,
};
async function getOrders() {
  try {
    let pool = await sql.connect(config);
    let product = await pool
      .request()
      .query("SELECT ID,ItemLookupCode,Price,Quantity,Description FROM Item ");
    return product.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function S_product(productId) {
  try {
    let pool = await sql.connect(config);
    let single_product = await pool
      .request()
      .input("input_parameter", sql.Int, productId)
      .query(
        "SELECT ID,ItemLookupCode,Price,Quantity,Description FROM Item where ID = @input_parameter"
      );
    return single_product.recordsets;
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getOrders: getOrders,
  S_product: S_product,
};
