<?php
// Deps
use PHPMailer\PHPMailer\PHPMailer;
require "phpmailer/src/PHPMailer.php";

// Vars
$statusMessages = [
	"sent" => "Успешно отправлено.",
	"invalid" => "Ошибка ввода.",
	"error" => "Ошибка отправки.",
];

// Utilities
function checkUserContacts($contacts) {
	$string = trim($contacts);
	if (empty(trim($string))) {
		return false;
	}
	if (preg_match("/[A-Za-zА-Я-а-я]/", $string)) {
		return filter_var($string, FILTER_VALIDATE_EMAIL);
	} else {
		$onlyDigits = preg_replace("/[()\s\-+]/", "", $string);
		return !!preg_match("/^\d{11}$/", $onlyDigits);
	}
}

// Form validation
$userForm = [$_POST["first-name"], $_POST["second-name"], $_POST["message"]];
$userContacts = $_POST["contacts"];

if (!checkUserContacts($userContacts) ) {
	$message = $statusMessages["invalid"];
	$response = ["message" => $message];
	header("Content-type: application/json");
	echo json_encode($response);
}

foreach ($userForm as $item) {
	if (empty(trim($item))) {
		$message = $statusMessages["invalid"];
		$response = ["message" => $message];
		header("Content-type: application/json");
		echo json_encode($response);
		break;
	}
}

// PHPMailer config
$mail = new PHPMailer(true);
$mail->CharSet = "UTF-8";
$mail->IsHTML(true);
$mail->setFrom("spacex-trip2024@gmail.com", "SpaceX заявка");
$mail->addAddress("dan.hanchenkov@sagirov.com");
$mail->Subject = "Заявка на Spacex.";

// Letter content
$body = "<h1>Заявка на SpaceX</h1>";
$body.= "<p><strong>Имя:</strong> " . $_POST["first-name"] . "</p>";
$body.= "<p><strong>Фамилия:</strong> " . $_POST["second-name"] . "</p>";
$body.= "<p><strong>Контакты:</strong> " . $_POST["contacts"] . "</p>";
$body.= "<p><strong>Сообщение:</strong> " . $_POST["message"] . "</p>";
$mail->Body = $body;

// Is letter sent
if (!$mail->send()) {
	$message = $statusMessages["error"];
} else {
	$message = $statusMessages["sent"];
}

$response = ["message" => $message];

// Sending letter
header("Content-type: application/json");
echo json_encode($response);
?>