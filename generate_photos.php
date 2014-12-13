<?php
	$filename = dirname(__FILE__).'/.data';
	$photo_data = $_POST['data']['photos']['data'];
	$name_list = $_POST['name'];

	$result = array();
	$i = 0;
	foreach($photo_data as $event) {
		if(array_key_exists($event['from']['name'], $name_list)) {
			file_put_contents($filename, $event['source'] . "\n", FILE_APPEND);
			continue;
		}

		foreach($event['tags']['data'] as $tag) {
			if(array_key_exists($tag['name'], $name_list)) {
				file_put_contents($filename, $event['source'] . "\n", FILE_APPEND);
				break;
			}
		}
	}
?>
