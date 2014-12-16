<?php
	$filename = dirname(__FILE__).'/.data';
	print file_get_contents($filename);
	unlink($filename);
?>
