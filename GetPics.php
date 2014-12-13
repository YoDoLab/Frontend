<?php
	$data = $_POST['data'];
	
//	print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
//	print_r($data);
//		print_r(json_decode($event['picture']));
		echo $data['picture']['data']['url'];
?>
