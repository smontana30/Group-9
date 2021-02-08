<?php
    require 'db_conn.php';

    $inData = getRequestInfo();

    $id = 0;
    $firstName = '';
    $lastName = '';

    // Check if the request received is valid.
    if (!isset($inData['login']) or !isset($inData['password']))
    {
        returnWithError('Invalid login JSON.');
        return;
    }

    // Prepare and execute the login query.
    $sql = 'SELECT ID, FirstName, LastName FROM Users WHERE Login=? and Password=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $inData['login'], $inData['password']);
    $stmt->execute();
    $result = $stmt->get_result();
    $count = $result->num_rows;

    // If there are a nonzero amount of rows returned, the login credentials are valid.
    if ($count > 0)
    {
        $row = $result->fetch_assoc();
        $firstName = $row['FirstName'];
        $lastName = $row['LastName'];
        $id = $row['ID'];
        returnWithInfo($firstName, $lastName, $id);
    }
    else
    {
        // The login information does not correspond with any users.
        returnWithError('No records found.');
    }

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
        $arr = array('id' => 0, 'firstName' => '', 'lastName' => '', 'error' => $err);
        sendResultInfo(json_encode($arr));
    }

    function returnWithInfo($firstName, $lastName, $id)
    {
        $arr = array('id' => $id, 'firstName' => $firstName, 'lastName' => $lastName, 'error' => '');
        sendResultInfo(json_encode($arr));
    }
?>
