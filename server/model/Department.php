<?php
class Department{
    private string $code;
    private string $name;


    public function getCode():string {
        return $this->code;
    }

    public function getName():string{
        return $this->name;
    }

    public function setName(string $value){
        $this->name = $value;
    }   

    public function hydrate(array $item){
        $this->name = $item["name"];
        $this->code = $item["code"];
    }
}
?>