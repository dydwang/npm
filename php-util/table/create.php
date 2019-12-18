<?php
include("../sql/link.php");
$linkSql = new LinkMysql();
$tableName=$_GET['tableName'];
include($tableName.'.php');
$linkSql = new LinkMysql();

exit($linkSql -> create($tableName,$sqlObj));
?>