<?php
	$data = $_POST['data']['photos']['data'];

	$result = array();
	foreach($data as $event) {
		$tmp = $event['from']['name'];
		if(array_key_exists($tmp, $result)) {
			$result[$tmp]['count']++;
		}
		else {
			$result[$tmp]['count'] = 1;
			$result[$tmp]['id'] = $event['from']['id'];
		}

		foreach($event['tags']['data'] as $tag) {
			$tmp = $tag['name'];
			if(array_key_exists($tmp, $result)) {
				$result[$tmp]['count']++;
				$result[$tmp]['id'] = $tag['id'];
			}
			else {
				$result[$tmp]['count'] = 1;
				$result[$tmp]['id'] = $tag['id'];
			}
		}
	}
	print_r(json_encode($result, JSON_UNESCAPED_UNICODE));
?>
