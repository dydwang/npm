<?php
class LinkMysql{
		public $array = [];
		function __construct(){

		}
		//查询数据库
		function select($sql){
			include("db.php");

			$Sql = $db -> query($sql);
			$array=[];
			while ($show = $Sql -> fetch_array( MYSQLI_ASSOC )){
				$this ->array[]=$show;
			}
			return $this ->array;
		}

		//修改数据库
        function change($sql){
			include("db.php");
			if($Sql = $db -> query($sql)){
				return true;
			}
			else{
				return false;
			}

	    }

	    //创建表
	    function create($tableName,$sqlObj){
	        include("db.php");
	        $sql="CREATE TABLE ${tableName}(";
	        foreach ($sqlObj as $key=>$value){
                     $sql=$sql."${key} ${value}";
            }
	        $sql=$sql.");";

	        if($Sql = $db -> query($sql)){
            	return 'true';
            }
            else{
            	return 'false';
            }
	    }
}
?>