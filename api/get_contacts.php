<?php
    require 'db_conn.php';
    
    $inData = getRequestInfo();

    // Check if the request received is valid.
    if (!isset($inData['UserID']))
    {
        returnWithError('Invalid get_contacts JSON.');
    }

    // Select the contacts from the Contacts table with the logged-in UserID.
    $sql = 'SELECT * FROM Contacts WHERE UserID=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $inData['UserID']);
    $stmt->execute();
    $result = $stmt->get_result();

    // For every row in the result, put it into an array.
    $rows = array();
    while ($r = mysqli_fetch_assoc($result))
    {
        $rows[] = $r;
    }

    // Send the array as a JSON Object.
    returnWithInfo($rows);

    // Parse request info and return a PHP Object.
    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfo($obj)
    {
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError($err)
    {
        $arr = array('rows' => '[]', 'error' => $err);
        sendResultInfo(json_encode($arr));
    }

    function returnWithInfo($rows)
    {
        $arr = array('rows' => $rows, 'error' => '');
        sendResultInfo(json_encode($arr));
    }
?>
