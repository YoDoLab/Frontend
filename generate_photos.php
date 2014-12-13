<?php
	$photo_data = $_POST['data']['photos']['data'];
	$name_list = $_POST['name'];

	$result = array();
	$i = 0;
	foreach($photo_data as $event) {
		if(array_key_exists($event['from']['name'], $name_list)) {
			$result[$i++] = $event['source'];
			continue;
		}

		foreach($event['tags']['data'] as $tag) {
			if(array_key_exists($tag['name'], $name_list)) {
				$result[$i++] = $event['source'];
				break;
			}
		}
	}
	print_r(json_encode($result, JSON_UNESCAPED_UNICODE));
?>
