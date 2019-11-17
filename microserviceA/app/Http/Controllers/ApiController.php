<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AmqpService;

class ApiController extends Controller
{
    public function createProduct(Request $request)
    {
        $data = $request->get('payload');
        $amqpService = new AmqpService();
        $amqpService->publishMessage($data);
    }
}
