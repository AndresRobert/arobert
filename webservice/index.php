<?php

/*
$name  = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
$mail  = filter_input(INPUT_POST, 'mail', FILTER_SANITIZE_SPECIAL_CHARS);
$phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_SPECIAL_CHARS);
$msg   = filter_input(INPUT_POST, 'msg', FILTER_SANITIZE_SPECIAL_CHARS);
*/
$name = filter_input(INPUT_GET, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
$mail = filter_input(INPUT_GET, 'mail', FILTER_SANITIZE_SPECIAL_CHARS);
$phone = filter_input(INPUT_GET, 'phone', FILTER_SANITIZE_SPECIAL_CHARS);
$msg = filter_input(INPUT_GET, 'msg', FILTER_SANITIZE_SPECIAL_CHARS);

$body = "Nombre: {$name} " . "\r\n" . "Mail: {$mail} ". "\r\n" ."Phone: {$phone} ". "\r\n" ."Mensaje: {$msg}";
$headers = "MIME-Version: 1.0" . "\r\n". "Content-type:text/html;charset=UTF-8" . "\r\n" . "From: <webmaster@peoplefirst.cl>" . "\r\n" . "Cc: arobert@peoplefirst.cl";

// send email
//$mailsent = mail("jsaavedra@peoplefirst.cl", "Landing Page", $body);
$mailsent = mail("jsaavedra@peoplefirst.cl", "Landing Page", $body, $headers);

if ($mailsent) {
    echo "mail send";
    echo'<pre>';print_r($body);echo'</pre>';
} else {
    echo "error";
}