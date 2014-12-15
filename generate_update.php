<?php
	$url_data = $_POST['data'];
	$filename = dirname(__FILE__).'/update.txt';
	foreach($url_data as $u){
		file_put_contents($filename, $u."\r\n", FILE_APPEND);
	}
	foreach($url_data as $u){
		$q = explode("?", $u);
		if(count($q) == 1){
			$sli = explode("/", $u);
			$name = $sli[count($sli)-1];
			$name = str_ireplace("\x0D", "", $name);
			shell_exec('curl --user-agent \'Firefox 31\' --output /home/YoDo/public_html/assest/photos/'.$name.' "'.$u.'"');
		}
		else{
			$sli = explode("/", $q[0]);
			$name = $sli[count($sli)-1];
			shell_exec('curl --user-agent \'Firefox 31\' --output /home/YoDo/public_html/assest/photos/'.$name.' "'.$u.'"');
		}
	}

	shell_exec("curl --user-agent 'Chrome 39' --output /home/YoDo/public_html/assest/photos/10733914_393730317460670_6596194011772246087_o.jpg 'https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xap1/t31.0-8/s720x720/10733914_393730317460670_6596194011772246087_o.jpg'");
?>
