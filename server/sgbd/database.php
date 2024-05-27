<?php

/**
 * Database connection.
 * @version 1.3
 * @author aguidet
 */
class Database
{
    private string $host = "localhost";
    private string $base = "grp-440_s4_progweb";
    private string $user = "grp-440";
    private string $pass = "JNF2RxZFbI";

    private PDO $pdo;


    /**
     * Initialize the database
     */
    public function __construct()
    {
        $this->pdo = new PDO("mysql:host=$this->host;dbname=$this->base", $this->user, $this->pass);
        $this->pdo->exec("SET AUTOCOMMIT=0;");
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    /**
     * Begin a transaction
     */
    public function beginTransaction()
    {
        $this->pdo->beginTransaction();
    }

    /**
     * COmmit the transaction
     */
    public function commit(){
        $this->pdo->commit();
    }

    /**
     * ROllback the transaction
     */
    public function rollback(){
        $this->pdo->rollBack();
    }
    /**
     * Execute a query with values returned
     * @param string $req the query, may have parameters
     * @param array $params array with parameters
     * @return mixed data send by DB, associative array (array of arrays)
     */
    public function query(string $req, array $params)
    {
        $data = null;
        $r = $this->pdo->prepare($req);
        $r->execute($params);
        $data = $r->fetchAll(PDO::FETCH_ASSOC);
        return $data;
    }

    /**
     * Execute a SQL order (no returns)
     * @param string $req the parametred query
     * @param array $params parameters
     */
    public function execute(string $req, array $params)
    {
        $r = $this->pdo->prepare($req);
        $r->execute($params);
    }
}