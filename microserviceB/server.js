const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const port = process.env.PORT || 3000;
let Consumer = require("./consumer");

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    let consumer = new Consumer();
    consumer.pullMessages();
});
