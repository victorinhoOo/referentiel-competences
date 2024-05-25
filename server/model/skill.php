<?php
require_once("component.php");

/**
 * A skill
 */
class Skill
{
    private int $id;
    private string $label;
    private int $number;
    private array $components;

    public function __construct()
    {
        $this->components = array();
    }

    /**
     * Get skill number
     * @return int
     */
    public function getNumber():int{
        return $this->number;
    }

    /**
     * 
     * 
     * @return string skill's label
     */
    public function getLabel():string{
        return $this->label;
    }

    /**
     * Get all the skill's essential components
     * @return array with components
     */
    public function getComponents():array
    {
        return $this->components;
    }

    /**
     * Create from an raw deserialized object
     * @param mixed $data raw object with same properties
     * @return Skill the new skill
     */
    public static function createFromObject($data): Skill
    {
        $skill = new Skill();
        $skill->id = $data->id;
        $skill->number = $data->number;
        $skill->label = $data->label;
        $array = $data->components;
        foreach($array as $subdata)
        {
            $component = Component::createFromObject($subdata);
            $skill->components[] = $component;
        }
        return $skill;
    }
}
?>