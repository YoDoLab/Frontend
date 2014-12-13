<?php
	$data=$_POST['data'];
	print_r($_POST);
	print $data;	
	$f = fopen("data.txt","w");
	fwrite($f,$data);
	fclose($f);
?>
