<?php

/**
 * Database connection.
 * @version 1.2
 * @author aguidet
 */
class Database
{
    private string $host = "localhost";
    private string $base = "grp-440_s4_progweb";
    private string $user = "root";
    private string $pass = "";

    private PDO $pdo;


    /**
     * Initialize the database
     */
    public function __construct()
    {
        $this->pdo = new PDO("mysql:host=$this->host;dbname=$this->base", $this->user, $this->pass);
        $this->pdo->exec("SET AUTOCOMMIT=1;");
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
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