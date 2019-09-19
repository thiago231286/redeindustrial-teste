<?php
// Application middleware


// Resolvendo o problema de CORS. Retirado do link https://www.schoolofnet.com/forum/topico/erro-apos-instalacao-do-tuupolaslim-jwt-auth-6921
$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response ->withHeader('Access-Control-Allow-Origin', '*') ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, Origin, Accept')->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});