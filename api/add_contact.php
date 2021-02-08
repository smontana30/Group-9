<?php
    require 'db_conn.php';
    
    $inData = getRequestInfo();

    // Check if the request received is valid.
    if (!isset($inData['FirstName']) or !isset($inData['LastName']) 
        or !isset($inData['Phone']) or !isset($inData['UserID']))
    {
        sendResultInfo('Invalid add_contact JSON.');
        return;
    }

    // Insert a new contact into the Contacts table.
    $sql = 'INSERT INTO Contacts (FirstName, LastName, Phone, UserID) VALUES (?, ?, ?, ?)';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sssi', $inData['FirstName'], $inData['LastName'], $inData['Phone'], $inData['UserID']);
    
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
