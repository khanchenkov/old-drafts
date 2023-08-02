<?php 

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$set = $_POST['user_select'];


require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'walkerdeth@mail.ru';                 // Наш логин
$mail->Password = 'skilledmaster321';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('walkerdeth@mail.ru', 'VR Box Bot');   // От кого письмо 
$mail->addAddress('daniilhanchenkov@yandex.ru');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Пришла заявка с сайта!';
$mail->Body    = '
	Пользователь оставил свои данные: <br> 
	Имя: ' . $name . ' <br>
	Телефон: ' . $phone . ' <br>
	Комплектация: ' . $set . '
	';
$mail->AltBody = 'Что-то пошло не так';

if(!$mail->send()) {
    return false;
} else {
		header('Location: ../thankyou.html');
}

?>