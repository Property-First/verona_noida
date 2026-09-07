<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get form data
    $name  = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';

    // Your email where you want to receive enquiries
    $to = "your@email.com";  // 🔴 CHANGE THIS

    $subject = "New Enquiry from - Adarsh Palm";

    // Email message
    $message = "
    Godrej Trilogy Details:

    Name: $name
    Phone: $phone
    Email: $email
    ";

    // Headers
    $headers = "From: noreply@yourdomain.com\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send mail
    if (mail($to, $subject, $message, $headers)) {
        echo "<script>
                
                window.location.href='thank_you.html';
              </script>";
    } else {
        echo "Something went wrong. Please try again.";
    }

} else {
    echo "Invalid Request";
}

?>