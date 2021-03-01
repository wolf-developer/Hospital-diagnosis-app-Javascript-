<?php
if (isset($_POST['treatment_code']) && isset($_POST['patient_code']) && isset($_POST['reason'])) {
    $patientCode = $_POST['patient_code'];
    $doctorCode = $_POST['doctor_code'];
    $reason = $_POST['reason'];
    
    $emailMessage = "New code was request for patient '$patientCode' by doctor '$doctorCode'";
    
    foreach ($_POST['treatment_code'] as &$treatment) {
        $code = $treatment['code'];
        $drugs = join(", ", $treatment['drugs']);
        $emailMessage = "$emailMessage\nCode $code for drugs $drugs";
    }

    $emailMessage = "$emailMessage\n\nChoices picked to get to this recommendation: \n$reason";
    
    $emailAddress = "c3046763@gmail.com";
    $emailSubject = "WAAMS code history";
    mail($emailAddress,$emailSubject,$emailMessage,"");

    echo "sent email";
}
?>