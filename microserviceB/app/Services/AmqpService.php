<?php

namespace App\Services;

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class AmqpService
{
    public function __construct()
    {
        $this->connection = new AMQPStreamConnection("localhost", 5672, "guest", "guest", "test");
        $this->channel = $this->connection->channel();
        $this->exchange = 'amq.direct';
        $this->queue = 'products';
        $this->channel->queue_declare($this->queue, false, true, false, false);
        $this->channel->exchange_declare($this->exchange, 'direct', true, true, false);
        $this->channel->queue_bind($this->queue, $this->exchange);
    }

    public function publishMessage($message)
    {
        $date = new \DateTime();
        $msg_body = json_encode(["payload" => $message, "timestamp" => $date->getTimestamp()]);
        $msg = new AMQPMessage($msg_body, array('content_type' => 'text/plain', 'delivery_mode' => 2));
        $this->channel->basic_publish($msg, $this->exchange);
        echo "Message published " . $date->getTimestamp();
    }
}