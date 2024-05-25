<?php
/**
 * Essential component of a skill
 */
class Component
{
    private int $id;
    private string $label;

    /**
     * Gets the label
     * @return string the label
     */
    public function getLabel():string
    {
        return $this->label;
    }

    /**
     * Create from a raw object with same properties
     * @param mixed $data the object (deserialized)
     * @return Component the component created
     */
    public static function createFromObject($data):Component
    {
        $comp = new Component();
        $comp->id = $data->id;
        $comp->label = $data->label;
        return $comp;
    }
}

?>