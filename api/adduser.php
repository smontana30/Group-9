<?php
    require 'dbconn.php';

    $inData = getRequestInfo();

    // Check if the request sent was valid.
    if (!isset($inData["firstName"]) && !isset($inData["lastName"]) 
        && !isset($inData["login"]) && !isset($inData["password"]))
    {
        returnWithError("Invalid login JSON.");
        return;
    }

    // Check if there already exists a user with the given login.
    $sql_check = "SELECT ID FROM Users where Login='" . $inData["login"] . "'";
    $sql_check_result = $conn->query($sql_check);
    $count = $sql_check_result->num_rows;

    if ($count > 0)
    {
        returnWithError("That user already exists.");
        return;
    }

    // Insert the new user.
    $sql_insert = "INSERT INTO Users (FirstName, LastName, Login, Password) VALUES ('" . 
        $inData["firstName"] . "', '" .
        $inData["lastName"] . "', '" .
        $inData["login"] . "', '" .
        $inData["password"] .
    "')";

    if ($conn->query($sql_insert))
    {
        $retVal = '{"error":""}';
        echo $retVal;
    }
    else
    {
        returnWithError("Failed to insert user into database.");
    }

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
        $retVal = '{"error":"' . $err . '"}';
        sentResultInfoAsJson($retVal);
    }
?>
