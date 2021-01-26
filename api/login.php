<?php
    // - Mike 1/19/21
    // This is an updated comment. I am updating it to get the remote server
    // updating correctly. Please ignore.
    // !!! THIS CODE DOES NOT WORK YET !!!

    // It is copied from the LAMP Stack Example uploaded to webcourses. This does
    // not represent the final API source. This is an example.

    $inData = getRequestInfo();

    $id = 0;
    $firstName = "";
    $lastName = "";

    // Change this to match our DB login
    $conn = new mysqli("localhost", "username", "password", "database");

    // TODO (From LAMP Stack Notes):
    // 1) From cPanel select File Manager
    // 2) Find public_html directory
    // 3) Create API directory
    // 4) Upload API endpoint files into the directory
    // 5) Use ARC, Postman, CURL, or Swagger to test the api 

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
        header('Conent-type: application/json');
        echo $obj;
    }

    function returnWithError($err)
    {
        $retVal = '{"id":0,"firstName":"","lastName":"","error:"' . $err . '">';
    }

    function returnWithInfo($firstName, $lastName, $id)
    {
        $retVal = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":'
                   . $lastName . '","error":""}';
    }
?>
