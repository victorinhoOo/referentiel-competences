<?php
require_once("department.php");

/**
 * Interface to department repository
 */
interface DepartmentData
{
    /**
     * Query : get all departments
     * @return array of departements
     */
    function getAll():array;
}
?>