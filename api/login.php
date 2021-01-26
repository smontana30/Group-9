<?php
    // This code is copied and modified from the LAMP Stack Example uploaded to
    // webcourses. This does not represent the final API source.
    
    // TODO:
    // Figure out how to test API using postman, swagger, etc..

    $inData = getRequestInfo();

    $id = 0;
    $firstName = "";
    $lastName = "";

    // Change this to match our DB login.
    // !!! FIGURE OUT HOW TO DO THIS WITHOUT UPLOADING PASSWORD TO GITHUB !!!
    $conn = new mysqli("localhost", "username", "password", "database");

    if ($conn->connect_error)
    {
        returnWithError($conn->connect_error);
    }
    else
    {
        // SQL command to pull login data (get DB people on this)
        $sql = "SELECT ID,firstName,lastName FROM Users where Login='" . 
                $inData["login"] . "' and Password='" . $inData["password"] . "'";   
        $result = $conn->query($sql);
        if ($result->numrows > 0)
        {
            $row = $result->fetch_assoc();
            $firstName = $row["firstName"];
            $lastName = $row["lastName"];
            $id = $row["ID"];
            returnWithInfo($firstName, $lastName, $id);
        }
        else
        {
            returnWithError("No records found.");
        }

        $conn->close();
    }

    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
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
