let mysql = require("mysql");

class DbManager {
    constructor() {
        this.connection = mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "admin",
            database: "microservice_db",
            port: 3306
        });
    }

    insert(msg) {
        return new Promise((resolve, reject) => {
            let messageObject = JSON.parse(msg);
            let product = messageObject.payload.product;
            let timestamp = messageObject.timestamp;
            let sql = "INSERT INTO product (id_product, name, price, stock, timestamp) VALUES (DEFAULT, '" + product.name + "', " + product.price + ", " + product.stock + ", '" + timestamp + "')";
            this.connection.query(sql, function (err, result) {
                if (err) reject(err);
                console.log(" [x] Received: %s", msg);
                resolve(result);
            });
        });
    }
}

module.exports = DbManager;