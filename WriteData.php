<?php
	$data=$_POST['data'];
	$name=$_POST['name'];
	$f = fopen('data.txt','w');
	print_r(error_get_last());
	fwrite($f,$data);
	fclose($f);
?>
