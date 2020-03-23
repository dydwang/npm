<?php
include("../sql/link.php");
$linkSql = new LinkMysql();
$tableName=$_GET['tableName'];
include($tableName.'.php');
$linkSql = new LinkMysql();
$sql='truncate table '.$tableName;
exit(json_encode($linkSql -> change($sql)));
?>