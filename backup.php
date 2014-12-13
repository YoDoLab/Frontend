<?php
	$filename = dirname(__FILE__).'/data.txt';
	$finalModify = isset($_GET['timestamp']) ? $_GET['timestamp'] : 0;
	$nowModify = filemtime($filename);
	while($nowModify <= $finalModify){
		usleep(10000);
		clearstatcache();
		$nowModify = filemtime($filename);
	}
	$response = array();
	$response['msg'] = file_get_contents($filename);
	$response['timestamp'] = $nowModify;
	echo $response;
?>