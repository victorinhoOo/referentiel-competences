<?php
require_once("./model/skills_data.php");
require_once("database.php");

/**
 * RDB repository of Skillsets
 */
class SKillsDao implements SkillsData
{
    private Database $db;

    /**
     * Init the dao
     * @param Database $db the database used
     */
    public function __construct(Database $db){
        $this->db = $db;
    }

    /**
     * get all the skill sets in database
     * @param string $codeDept the department's code
     * @return mixed the data (array of arrays)
     */
    function getSets(string $codeDept): array
    {
        return $this->db->query("SELECT * FROM skillset WHERE code_department=:code", ["code"=>$codeDept]);
    }
}
?>