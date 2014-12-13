<?php
	$data=$_POST['data'];
<<<<<<< HEAD
	print_r($_POST);
	print $data;	
	$f = fopen("data.txt","w");
=======
	$name=$_POST['name'];
	$f = fopen('data.txt','w');
	print_r(error_get_last());
>>>>>>> cd221aa3634ccda8eaa657dfb2b0b5ed6d5947a9
	fwrite($f,$data);
	fclose($f);
?>
