
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // E-Mail-Adresse aus dem POST-Parameter 'email' abrufen
  $email = $_POST['email'];

  // Hier können Sie den Code zum Versenden der E-Mail einfügen
  // Beispiel: mail($email, 'Betreff', 'Nachricht');

  // Antwort an den Client senden (kann optional verarbeitet werden)
  echo 'E-Mail wurde an ' . $email . ' gesendet.';
} else {
  // Fehlerbehandlung, falls die Anfrage nicht vom Typ POST ist
  http_response_code(405);
  echo 'Method Not Allowed';
}
?>
