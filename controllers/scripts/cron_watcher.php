<?php


$fh = fopen('/opt/cron_watcher.txt','r');
$cron_errors = array();
$hostname = shell_exec("hostname");

while ($line = fgets($fh)) {
    if(!empty($line) && isset($line)) {
        $cron_id = trim($line);
        $cmd = "tail -3 /var/log/".$cron_id.".log | grep 'CronRun @ Error' -A2";
        $output = shell_exec($cmd);
        $output = trim($output);
        if(!empty($output) && isset($output)) {
            $spl = explode("\n", $output);
            $obj = new stdClass();
            $obj->cron_id = $cron_id;
            $obj->hostname = $hostname;
            $obj->output = $spl;
            $cron_errors[] = $obj;
        }
    }
}

fclose($fh);

$json = json_encode($cron_errors);
$domain = "http://7e4a987f.ngrok.io";
$path = "/cronjobsstatus/listener";
$cmd = "echo '".$json."' | curl --header 'Content-Type: application/json' -d @- $domain".$path;
$response = shell_exec($cmd);

?>
