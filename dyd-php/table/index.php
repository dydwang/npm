
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script type="text/javascript" src="../public/vue.js"></script>
    <script type="text/javascript" src="../public/httpVueLoader.js"></script>
    <link rel="stylesheet" href="../public/element.css">
    <script type="text/javascript" src="../public/element.js"></script>

</head>
<body>
<?php
    $con = dirname(__FILE__);
    // 扫描$con目录下的所有文件
    $filename = scandir($con);
    // 定义一个数组接收文件名
    $conname = array();  //tbl 数组
    foreach($filename as $k=>$v){
    // 跳过两个特殊目录 只录入tbl开头文件   continue跳出循环
        if($v=="." || $v==".."||substr($v, 0,3)!="tbl"){continue;}
        //截取文件名，我只需要文件名不需要后缀;然后存入数组。如果你是需要后缀直接$v即可
        $conname[] = substr($v,0,strpos($v,"."));
    }
    //echo(json_encode( $conname));
?>
<div id="vue">
            <app-vue id="app" :files="conname" style="width:100%;"></app-vue>
</div>

</body>
<script>
// 使用httpVueLoader
    Vue.use(httpVueLoader);
const conname=<?php echo(json_encode( $conname));?>;

		new Vue({
			el: "#vue",
			data(){
			    return{
			         conname:conname //tbl 数组
   			    }
			},
			components:{
			    'app-vue': httpVueLoader('../view/App.vue'),
			}
		})
</script>
</html>
