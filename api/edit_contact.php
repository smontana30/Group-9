<?php
    require 'db_conn.php';

    $inData = getRequestInfo();

    // Check if the request received is valid.
    if (!isset($inData['FirstName']) or !isset($inData['LastName']) 
        or !isset($inData['Phone']) or !isset($inData['ID']) or !isset($inData['UserID']))
    {
        sendResultInfo('Invalid add_contact JSON.');
        return;
    }

    // Update a contact in the Contacts table.
    $sql = 'UPDATE Contacts SET FirstName = ?, LastName = ?, Phone = ? WHERE ID = ? AND UserID = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sssii', $inData['FirstName'], $inData['LastName'], $inData['Phone'], $inData['ID'], $inData['UserID']);

    if ($stmt->execute())
    {
        // The update was successful.
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
