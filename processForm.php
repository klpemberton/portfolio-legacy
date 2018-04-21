<?php
 
 // TODO: switch to PHPMailer

// Clean up the input values
foreach($_POST as $key => $value) {
  if(ini_get('magic_quotes_gpc'))
    $_POST[$key] = stripslashes($_POST[$key]);
 
  $_POST[$key] = htmlspecialchars(strip_tags($_POST[$key]));
}
 
// Assign the input values to variables for easy reference
$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];
  
// Send the email
$to = "kristine@kristinepemberton.com";
$subject = "Inquiry from $name, $email via KristinePemberton.com";
$message = "Name: $name\rEmail: $email\rMessage: \"$message\"";
$headers = "From: $name $email";
 
mail($to, $subject, $message, $headers);
 
// Die with a success message

die("<p class='success'>Message received! I'll get back with you shortly.</p>");
 
?>