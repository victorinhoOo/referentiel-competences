<?php
/**
 * A study department
 */
class Department{
    private string $code;
    private string $name;

    /**
     * get the code of dept
     * @return string the dept's code
     */
    public function getCode():string {
        return $this->code;
    }

    /**
     *
     * @return string the dept's name
     */
    public function getName():string{
        return $this->name;
    }

    /**
     * Change dept's name
     * @param string $value the new name
     */
    public function setName(string $value){
        $this->name = $value;
    }

    /**
     * Create a department from an existing raw object
     * @param mixed $item the raw object deserialized
     * @return Department the new department
     */
    public static function createFromArray($item){
        $dept = new Department();
        $dept->name = $item["name"];
        $dept->code = $item["code"];
        return $dept;
    }

}
?>