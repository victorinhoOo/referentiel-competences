<?php
require_once("model/assessment_data.php");
require_once("database.php");

/**
 * Implements with MySQL assessments data
 */
class AssessmentDao implements AssessmentData
{
    private Database $db;

    /**
     * Init the dao
     * @param Database $db  link to database
     */
    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    /**
     * Add an assessment to database
     * @param mixed $obj the object (associative array)
     * @throws Exception if error occurs
     */
    public function addAssessment($obj){
        // all doing in one transaction
        $this->db->beginTransaction();
        try{
            $this->saveAssessment($obj);
            $res = $this->db->query("SELECT LAST_INSERT_ID() AS id;",[]);
            $id_assessment = $res[0]["id"];

            foreach($obj["validations"] as $validation)
            {
                $this->save_validation($id_assessment, $validation);
            }

            $this->db->commit();
        }
        catch(Exception $e){
            $this->db->rollback();
            throw $e;
        }
    }

    private function saveAssessment($obj)
    {
        $req = "INSERT INTO assessment(id_skillset, login_student, self_eval) VALUES(:ids,:ls,:ev);";
        $this->db->execute($req,["ids"=>$obj["id_skillset"], "ls"=>$obj["login_student"],"ev"=>$obj["autoeval"]]);
    }

    private function save_validation(int $id_assessment, $obj)
    {
        $type = $obj["type_element"];
        if($type=="skill"){
            $table= "skill_validation";
            $field = "id_skill";
        }

        else if($type=="component"){
            $table = "component_validation";
            $field="id_component";
        }
        else
            throw new ErrorException("bad type of validation");

        $req = "INSERT INTO $table(id_assessment,id_validation, $field) VALUES(:idass,:idval,:id);";
        $this->db->execute($req,["idass"=>$id_assessment, "idval"=>$obj["level"], "id"=>$obj["id_element"]]);
    }
}
?>