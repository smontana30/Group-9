<?php
    require 'dbconn.php';

    // TODO:
    // Figure out how to test API using postman, swagger, etc..

    $inData = getRequestInfo();

    $id = 0;
    $firstName = "";
    $lastName = "";

    // Check if the request sent was valid.
    if (!isset($inData["login"]) && !isset($inData["password"]))
    {
        returnWithError("Invalid login JSON.");
        return;
    }

    // SQL command to pull login data
    $sql = "SELECT ID,FirstName,LastName FROM Users where Login='" . $inData["login"] . "' and Password='" . $inData["password"] . "'";
    $result = $conn->query($sql);
    $count = $result->num_rows;

    if ($count > 0)
    {
        $row = $result->fetch_assoc();
        $firstName = $row["FirstName"];
        $lastName = $row["LastName"];
        $id = $row["ID"];
        returnWithInfo($firstName, $lastName, $id);
    }
    else
    {
        returnWithError("No records found.");
    }

    // Parse request info and return a PHP JSON object.
    function getRequestInfo()
    {
        $json = file_get_contents('php://input');
        return json_decode($json, true);
    }

    function sendResultInfoAsJson($obj)
    {
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError($err)
    {
        $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }

    function returnWithInfo($firstName, $lastName, $id)
    {
        $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
        sendResultInfoAsJson($retValue);
    }
?>
