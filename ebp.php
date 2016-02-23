

<html>
 <head>
  <title>PHP Test</title>
 <script src="jquery-1.js"></script>
<script src="jquery.js"></script>
 </head>
 
 <body>
 <?php
	echo 'PHP Code\n';
   $json = $_POST['json'];
	echo $json;
	echo "post done\n"; 
   if (json_decode($json) != null) { /* sanity check */
	echo "sanity done\n";
     $file = fopen('new_map_data.js','w+');
	 echo "opening done\n";
     fwrite($file, $json);
	 echo "writing done\n";
     fclose($file);
	 
	 
	 echo "fully done\n";
   } else {
     // handle error 
	 echo "Direct Error";
   }
?>
 <input>
 <a href="ebp.php">send json</a>
 <?php phpinfo(); ?> 
 </body>
 <script>
 
 document.getElementsByTagName("a")[0].addEventListener("click", function(){
    
	// write routes to JSON Object
	var jsonObject = {
		'nicsjain ai': document.getElementsByTagName('input')[0].value,
		asd: {
			as: 123,
			asdd: 'nicsjain'
		}
	}
// some jQuery to write to file
$.ajax({
    type : "POST",
    url : "ebp.php",
    dataType : 'json', 
    data : {
        json : JSON.stringify(jsonObject) /* convert here only */
    }
});
});
 
 </script>
</html>