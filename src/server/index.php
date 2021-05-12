<?php

//echo die(json_decode(data));

header("Acess-Control-Allow-Origin:*");
header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");

//$entityBody = file_get_contents('php://input');
include "conexao.php";

$teste_uri=$_POST['avatar.uri'];
$teste_type=$_POST['avatar.type'];


$teste = "INSERT INTO `teste` (`cd_img`, `uri`, `type`) VALUES (NULL, '$teste_uri', '$teste_type')";
mysqli_query($conn,$teste);
 
die(json_encode($data));

?>