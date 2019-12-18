<?php
include("../sql/link.php");


$linkSql = new LinkMysql();
$tableName=$_GET['tableName'];
include($tableName.'.php');
$linkSql = new LinkMysql();
$sql='SELECT count(*) as count FROM  '.$tableName;
exit(json_encode($linkSql -> select($sql)));
?>