<?php
	$result['id'] = $_POST['data']['id'];
	$result['name'] = $_POST['data']['name'];
	$result['url'] = $_POST['data']['picture']['data']['url'];

	print_r(json_encode($result, JSON_UNESCAPED_UNICODE));
?>
