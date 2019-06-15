<?php
$cmds = array(
    "git reset --hard origin/master && git clean -f ",
    "git pull"
);  
foreach ($cmds as $cmd) {
    shell_exec($cmd);
}

