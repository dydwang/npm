<?php
    include("./fun/crypto.php");
    include("./sql/link.php");
    $sqlObj=array(
         'chapterId' => 'VARCHAR(255) PRIMARY KEY,',
         'chapterName' => 'VARCHAR(255) NOT NULL,',
         'courseId' => 'VARCHAR(255) NOT NULL'
    );
    $tableName="tbl_chaptersm";
    	$linkSql = new LinkMysql();
        exit(json_encode($linkSql -> create($tableName,$sqlObj)));
?>