<?php
use Vtiful\Kernel\Format;
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
    public function getSets(string $codeDept): array
    {
        return $this->db->query("SELECT * FROM skillset WHERE code_department=:code", ["code"=>$codeDept]);
    }

    /**
     * Insert all the skill set (with sub datas)
     * @param SkillSet $skillSet the skill set to insert
     * @throws Exception if something goes bad
     */
    public function insertSkillSet(SkillSet $skillSet) 
    {
        $this->db->beginTransaction();
        try
        {
            // first, insert a skill set in database
            $this->db->execute(
                "INSERT INTO skillset(active,code_department,date,level,name) VALUES(:active,:code_dept,:date,:level,:name);",
                [
                    "active" => $skillSet->isActive(),
                    "code_dept" => $skillSet->getCodeDept(),
                    "date" => $skillSet->getDate()->format("Y-m-d"),
                    "level" => $skillSet->getLevel(),
                    "name" => $skillSet->getName()
                ]
            );
            // then retrieve its ID 
            $res = $this->db->query("SELECT LAST_INSERT_ID() as id;",array());
            $id = $res[0]["id"];
            // create now the skills
            foreach($skillSet->getSkills() as $skill)
            {
                $this->insertSkill($skill, $id);
            }
            // commit !
            $this->db->commit();
        }
        catch(Exception $e)
        {
            $this->db->rollback();
            throw $e;
        }

    }
    private function insertSkill(Skill $skill, int $id_skillset)
    {
        // first the skill itself
        $this->db->execute(
            "INSERT INTO skill(number,label,id_skillset) VALUES(:number,:label,:idskillset);",
            ["number" => $skill->getNumber(), "label" => $skill->getLabel(), "idskillset" => $id_skillset]
        );
        // retreive its ID 
        $res = $this->db->query("SELECT LAST_INSERT_ID() as id", []);
        $id = $res[0]["id"];
        // then the components
        foreach($skill->getComponents() as $component)
        {
            $this->insertComponent($component, $id);
        }
    }

    private function insertComponent(Component $component,int $id_skill)
    {
        $this->db->execute(
            "INSERT INTO component(label,id_skill) VALUES(:label,:idskill)"
            ,
            ["label" => $component->getLabel(), "idskill" => $id_skill]
        );
    }
}
?>