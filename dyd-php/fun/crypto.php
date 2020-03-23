<?php
    include("req.php");
    $req; //变为前端传来的参数

    function appLogin($data){

         $key = "9vApxLk5G3PAsJrM";
         $iv = "FnJL7EDzjqWjcaY9";

         $data = str_replace(' ','+',$data);

         $decrypted = openssl_decrypt($data, 'AES-128-CBC', $key, OPENSSL_ZERO_PADDING, $iv);

         return trim($decrypted);//返回删除空格的值
    }
    try{
        foreach ($_POST as $key=>$value){
                 $req[$key]=appLogin($value); //对每个参数遍历并解密
            }
    }catch(Exception $e){
          return false;
    }
?>