let amqplib = require('amqplib/callback_api');

const DbManager = require("./db-manager");
const CONNECT_URL = "amqp://guest:guest@localhost:5672/test";
const QUEUE_NAME = "products";

class Consumer {
    constructor() {
        this.db = new DbManager();
    }
    pullMessages() {
        amqplib.connect(CONNECT_URL, (err, connection) => {
            if (err) throw err;
            connection.createChannel((err, channel) => {
                if (err) throw err;
                channel.assertQueue(QUEUE_NAME, {
                    durable: true
                });
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", QUEUE_NAME);
                channel.consume(QUEUE_NAME, message => {
                    this.db.insert(message.content.toString()).then(response => {
                        console.log(" [x] Record saved on database");
                        channel.ack(message);
                    }).catch(err => {
                        channel.nack(message);
                    });
                }, {
                    noAck: false
                });
            });
        });
    }
}

module.exports = Consumer;