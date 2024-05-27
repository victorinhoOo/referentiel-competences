<?php
require_once("skill.php");

/**
 * Set of skills (assetment)
 */
class SkillSet
{
    private int $id;
    private string $name;
    private int $level;
    private DateTime $date;
    private bool $active;

    private array $skills;

    private string $code_department;

    public function __construct()
    {
        $this->skills = array();
    }

    /**
     *
     * @return int the assetment's id
     */
    public function getId():int
    {
        return $this->id;
    }

    /**
     * tell if the assetment's active
     * @return bool
     */
    public function isActive():bool{
        return $this->active;}

    /**
     *
     * @return string the assetment's name
     */
    public function getName():string{
        return $this->name;
    }

    /**
     *
     * @return DateTime the assetment's date
     */
    public function getDate():DateTime{
        return $this->date;
    }

    /**
     *
     * @return int the assetment's level (year)
     */
    public function getLevel():int{
        return $this->level;
    }

    /**
     *
     * @return string the assetment's dept code
     */
    public function getCodeDept():string{
        return $this->code_department;
    }

    /**
     * get all skills of the assetment
     * @return array
     */
    public function getSkills(): array
    {
        return $this->skills;
    }

    /**
     * Create from a raw deserialized object
     * @param mixed $data the object
     * @return SkillSet the new skill assetment
     */
    public static function createFromObject($data) : SkillSet{
        $skillset = new SkillSet();
        $skillset->id = $data->id;
        $skillset->name = $data->name;
        $skillset->level = $data->level;
        $skillset->date = new DateTime($data->date);
        $skillset->active = $data->active;
        $skillset->code_department = $data->code_department;
        // linked objects
        $array = $data->skills;
        foreach($array as $subdata)
        {
            $skill = Skill::createFromObject($subdata);
            $skillset->skills[] = $skill;
        }
        return $skillset;
    }
}
?>