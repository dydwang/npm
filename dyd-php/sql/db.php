<?php

//连接数据库
	$host = '127.0.0.1';
	$user = 'root';
	$pwd = 'root';
	$dbname = 'test';
	$db = new mysqli($host,$user,$pwd,$dbname);

	if(!function_exists('mysql_connect')){
        function mysql_connect($dbhost, $dbuser, $dbpass){
            global $dbport;
            global $dbname;
            global $mysqli;
            $mysqli = mysqli_connect("$dbhost:$dbport", $dbuser, $dbpass, $dbname);
            return $mysqli;
            }
        function mysql_select_db($dbname){
            global $mysqli;
            return mysqli_select_db($mysqli,$dbname);
            }
        function mysql_fetch_array($result){
            return mysqli_fetch_array($result);
            }
        function mysql_fetch_assoc($result){
            return mysqli_fetch_assoc($result);
            }
        function mysql_fetch_row($result){
            return mysqli_fetch_row($result);
            }
        function mysql_query($query){
            global $mysqli;
            return mysqli_query($mysqli,$query);
            }
        function mysql_escape_string($data){
            global $mysqli;
            return mysqli_real_escape_string($mysqli, $data);
            }
        function mysql_real_escape_string($data){
            return mysql_real_escape_string($data);
            }
        function mysql_close(){
            global $mysqli;
            return mysqli_close($mysqli);
            }
    }
?>