<?php
    require 'db_conn.php';

    $inData = getRequestInfo();

    // Check if the request received is valid.
    if (!isset($inData['ID']) && !isset($inData['UserID']));
    {
        sendResultInfo('Invalid delete_contact JSON.');
    }

    // Delete the contacts given the ID, making sure that UserID is associated
    // with it.
    $sql = 'DELETE FROM Contacts WHERE ID=? AND UserID=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $inData['ID'], $inData['UserID']);

    if ($stmt->execute())
    {
        // The deletion was successful.
        sendResultInfo('');
    }
    else
    {
        // There was a problem with the deletion.
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
