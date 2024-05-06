<?php
require_once("database.php");
require_once("./model/department_data.php");

/**
 * RDB repository of departments
 */
class DepartmentDao implements DepartmentData{
    private Database $database;

    /**
     * Init the repository
     * @param mixed $db the database used
     */
    public function __construct($db){
        $this->database = $db;
    }

     /**
      * Get all the departments in database
      * @return mixed array of arrays with datas
      */
     public function getAll():array{
        $ret = $this->database->query("SELECT * FROM department",array());
        return $ret;
     }
}
?>