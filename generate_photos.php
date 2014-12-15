<?php
	$filename = dirname(__FILE__).'/.data';
	$photo_data = $_POST['data']['photos']['data'];
	$name_list = $_POST['name'];

	$i = 0;
	foreach($photo_data as $event) {
		if(in_array($event['from']['name'], $name_list)) {
			file_put_contents($filename, $event['source'] . "\r\n", FILE_APPEND);
			$result[$i++] = $event['source'];
			continue;
		}

		foreach($event['tags']['data'] as $tag) {
			if(in_array($tag['name'], $name_list)) {
				file_put_contents($filename, $event['source'] . "\r\n", FILE_APPEND);
				$result[$i++] = $event['source'];
				break;
			}
		}
	}

	print_r(json_encode($result));
?>
