<?php
    //文件名必须为表名 且以tbl_ 开头


    //列名 =》 规则
    $sqlObj=array(
         'chapterId' => 'VARCHAR(255) PRIMARY KEY,',
         'chapterName' => 'VARCHAR(255) NOT NULL,',
         'courseId' => 'VARCHAR(255) NOT NULL'
    );
?>