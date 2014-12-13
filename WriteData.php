<?php
	$data=$_POST['data'];
	$name=$_POST['name'];
<<<<<<< HEAD
	print_r($_POST);
	print $data;	
	$f = fopen("data.txt","w");
=======
	$f = fopen('data.txt','w');
	print_r(error_get_last());
>>>>>>> 683b40d635758bc3dbf1c73c7ea6617f0a74a567
	fwrite($f,$data);
	fclose($f);
?>
