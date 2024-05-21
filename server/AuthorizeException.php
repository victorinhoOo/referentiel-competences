<?php
require_once("ApiException.php");
class AuthorizeException extends ApiException
{
    public function __construct(string $message)
    {
        parent::__construct(403, $message);
    }
}
?>