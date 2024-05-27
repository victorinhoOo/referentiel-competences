<?php
/**
 * Generic exception for API errors
 */
class ApiException extends Exception
{
    private int $status;

    /**
     * Create the exception
     * @param int $status the HTTP status to send back
     * @param string $message the message to send back
     */
    public function __construct(int $status, string $message )
    {
        parent::__construct($message);
        $this->status = $status;
    }

    public function __toString():string{
        return "HTTP/1.0 ".$this->status." ".$this->message;
    }

    public function getStatus() : int{
        return $this->status;
    }
}
?>