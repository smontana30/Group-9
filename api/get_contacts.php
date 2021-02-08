<?php
    require 'db_conn.php';

    // Check if the request received is valid.
    if (!isset($_GET['UserID']))
    {
        returnWithError('The get_contacts API call requires a UserID query.');
        return;
    }

    if (isset($_GET['query']))
    {
        // $sql = 'SELECT * FROM Contacts WHERE CONCAT(FirstName, LastName) LIKE ? OR Phone LIKE ? AND UserID=?';
        $sql = 'SELECT * FROM Contacts WHERE FirstName LIKE ? OR LastName LIKE ? OR Phone LIKE ? AND UserID=?';
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('sssi', $_GET['query'], $_GET['query'], $_GET['query'], $_GET['UserID']);
    }
    else
    {
        $sql = 'SELECT * FROM Contacts WHERE UserID=?';
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $_GET['UserID']);
    }

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
        $arr = array('results' => '[]', 'error' => $err);
        sendResultInfo(json_encode($arr));
    }

    function returnWithInfo($rows)
    {
        $arr = array('results' => $rows, 'error' => '');
        sendResultInfo(json_encode($arr));
    }
?>
