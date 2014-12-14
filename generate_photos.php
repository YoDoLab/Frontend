<?php
	$filename = dirname(__FILE__).'/.data';
	$photo_data = $_POST['data']['photos']['data'];
	$name_list = $_POST['name'];

	foreach($photo_data as $event) {
		if(in_array($event['from']['name'], $name_list)) {
			file_put_contents($filename, $event['source'] . "\r\n", FILE_APPEND);
			continue;
		}

		foreach($event['tags']['data'] as $tag) {
			if(in_array($tag['name'], $name_list)) {
				$result[$i++] = $event['source'];
				break;
			}
		}
	}
?>
