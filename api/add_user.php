<?php
    require 'db_conn.php';

    $inData = getRequestInfo();

    // Check if the request received is valid.
    if (!isset($inData['firstName']) && !isset($inData['lastName']) 
        && !isset($inData['login']) && !isset($inData['password']))
    {
        sendResultInfo('Invalid add_user JSON.');
        return;
    }

    // Check if there already exists a user with the given login.
    $sql = 'SELECT ID FROM Users WHERE Login=? and Password=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $inData['login']);
    $stmt->execute();
    $result = $stmt->get_result();
    $count = $result->num_rows;

    if ($count > 0)
    {
        sendResultInfo('That user already exists.');
        return;
    }

    // Insert a new user into the Users table.
    $sql = 'INSERT INTO Users (FirstName, LastName, Login, Password) VALUES (?, ?, ?, ?)';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssss', $inData['firstName'], $inData['lastName'], $inData['login'], $inData['password']);

    if ($stmt->execute())
    {
        // The insertion was successful.
        sendResultInfo('');
    }
    else
    {
        // There was a problem with the insertion.
        sendResultInfo($stmt->error);
    }

    // Parse request info and return a PHP Object.
    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfo($err)
    {
        header('Content-type: application/json');
        $arr = array('error' => $err);
        echo json_encode($arr);
    }
?>
