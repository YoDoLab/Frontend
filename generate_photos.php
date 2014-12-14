<?php
	$photo_data = $_POST['data']['photos']['data'];
	$name_list = $_POST['name'];

	print_r($photo_data);
	print_r($name_list);

	$result = array();
	$i = 0;
	foreach($photo_data as $event) {
		if(in_array($event['from']['name'], $name_list)) {
			$result[$i++] = $event['source'];
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
