<?php
    $conf = parse_ini_file("/var/www/conf.config");

    $conn = new mysqli($conf["ip"], $conf["username"], $conf["password"], $conf["name"]);

    if ($conn->connect_error)
    {
        die("Connection to the database failed: " . $conn->connect_error);
    }
?>
