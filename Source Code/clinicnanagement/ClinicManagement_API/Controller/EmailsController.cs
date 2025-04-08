using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;
using API_ClinicManagement.Helper;
using Microsoft.AspNetCore.Authorization;

namespace API_ClinicManagement.Controller
{
    public class EmailsController : ConBase
    {
        [HttpGet("register-confirmed/{toAddress}")]
        public IActionResult Register(string toAddress)
        {
            string randomNumber = RandomHelper.RandomNumber();
            string fromAddress = "hoanglambogini123@gmail.com";
            string fromDisplayName = "Skin Sense";
            string subject = "Confirm Register";
            string body = "Welcome to skinsense. This is your registration verification code. " +
                "Your verification code is: " + randomNumber + ". Thank you!";
            MailAddress fromMailAddress = new MailAddress(fromAddress, fromDisplayName);
            MailMessage message = new MailMessage();
            message.From = fromMailAddress;
            message.To.Add(toAddress);
            message.Subject = subject;
            message.Body = body;
            System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient("smtp.gmail.com");
            smtp.Port = 587;
            smtp.EnableSsl = true;
            smtp.Credentials = new NetworkCredential("hoanglambogini123@gmail.com", "ghripsstcwaqacip");
            smtp.Send(message);
            return Ok(randomNumber);
        }

        [HttpGet("forgotpassword-confirmed/{toAddress}")]
        public IActionResult ForgotPassword(string toAddress)
        {
            string randomNumber = RandomHelper.RandomNumber();
            string fromAddress = "hoanglambogini123@gmail.com";
            string fromDisplayName = "Skin Sense";
            string subject = "Confirm ForgotPassword";
            string body = "Welcome to skinsense. This is your forgotpassword verification code. " +
                "Your verification code is: " + randomNumber + ". Thank you!";
            MailAddress fromMailAddress = new MailAddress(fromAddress, fromDisplayName);
            MailMessage message = new MailMessage();
            message.From = fromMailAddress;
            message.To.Add(toAddress);
            message.Subject = subject;
            message.Body = body;
            System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient("smtp.gmail.com");
            smtp.Port = 587;
            smtp.EnableSsl = true;
            smtp.Credentials = new NetworkCredential("hoanglambogini123@gmail.com", "ghripsstcwaqacip");
            smtp.Send(message);
            return Ok(randomNumber);
        }
        [HttpGet("createEmployee-confirmed/{toAddress}/{password}")]
        public IActionResult AdminCreateEmployee(string toAddress, string password)
        {
            string fromAddress = "hoanglambogini123@gmail.com";
            string fromDisplayName = "Skin Sense";
            string subject = "Well come";
            string body = "Welcome to skin sense here is your account and password. " +
                "Please visit clinicskinsense.com homepage to login and change password. " +
                "Then the process of reviewing the profile information is really accurate. " +
                "If there is a problem, please update the information." + "\r\n" +
                "User name: " + toAddress + "\r\n" +
                "Password: " + password + "\r\n" +
                "This is an automated email.\r\n\r\n" +
                "If you have any problems, please contact us via Email: hieutruonghoang01@gmail.com\r\n\r\n" +
                "" +
                "Best regards,";
            MailAddress fromMailAddress = new MailAddress(fromAddress, fromDisplayName);
            MailMessage message = new MailMessage();
            message.From = fromMailAddress;
            message.To.Add(toAddress);
            message.Subject = subject;
            message.Body = body;
            System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient("smtp.gmail.com");
            smtp.Port = 587;
            smtp.EnableSsl = true;
            smtp.Credentials = new NetworkCredential("hoanglambogini123@gmail.com", "ghripsstcwaqacip");
            smtp.Send(message);
            return Ok("Succes");
        }
        [HttpPost("appointments-confirmed")]
        public IActionResult ConfirmCreateAppointments(EmailSenderAppointments obj)
        {
            string fromAddress = "hoanglambogini123@gmail.com";
            string fromDisplayName = "Skin Sense";
            string subject = "NOTICE OF MEDICAL EXAMINATION SCHEDULE";
            string body = "Dear Patient,\r\n\r\n" +
                "We are pleased to inform you that your request to book an appointment has been successfully processed. " +
                "Below is information about the examination:" +
                "\r\n\r\n" +
                "Examination schedule information:" +
                "\r\n\r\n" +
                "Date of examination: " + obj.Date +
                "\r\n" +
                "Time: " + obj.Time +
                "\r\n" +
                "Specialist doctor: " + obj.Doctor +
                "\r\n" +
                "Hospital/Clinical: " + obj.Hospital +
                "\r\n" +
                "Address: " + obj.Address +
                "\r\n" +
                "Note when visiting:" +
                "\r\n\r\n" +
                "Please arrive at least 15 minutes before the scheduled time to complete the check-in procedures." +
                "\r\n" +
                "Please bring relevant medical documents and test results (if available)." +
                "\r\n" +
                "If you are unable to attend your appointment, please notify us at least 24 hours in advance so we can reschedule." +
                "\r\n" +
                "If you have any questions or need further assistance, please feel free to contact us at " +
                "0987719196" +
                " or email Hieutruonghoang01@gmail.com." +
                "\r\n\r\n" +
                "We look forward to welcoming you at the examination." +
                "\r\n\r\n" +
                "Best regards,";
            MailAddress fromMailAddress = new MailAddress(fromAddress, fromDisplayName);
            MailMessage message = new MailMessage();
            message.From = fromMailAddress;
            message.To.Add(obj.Email);
            message.Subject = subject;
            message.Body = body;
            System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient("smtp.gmail.com");
            smtp.Port = 587;
            smtp.EnableSsl = true;
            smtp.Credentials = new NetworkCredential("hoanglambogini123@gmail.com", "ghripsstcwaqacip");
            smtp.Send(message);
            return Ok("Succes");
        }
        [HttpGet("changeEmail-confirmed/{toAddress}")]
        public IActionResult ChangeEmail(string toAddress)
        {
            string randomNumber = RandomHelper.RandomNumber();
            string fromAddress = "hoanglambogini123@gmail.com";
            string fromDisplayName = "Skin Sense";
            string subject = "Confirm Change Email";
            string body = "Welcome to skinsense. This is your change email verification code. " +
                "Your verification code is: " + randomNumber + ". Thank you!";
            MailAddress fromMailAddress = new MailAddress(fromAddress, fromDisplayName);
            MailMessage message = new MailMessage();
            message.From = fromMailAddress;
            message.To.Add(toAddress);
            message.Subject = subject;
            message.Body = body;
            System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient("smtp.gmail.com");
            smtp.Port = 587;
            smtp.EnableSsl = true;
            smtp.Credentials = new NetworkCredential("hoanglambogini123@gmail.com", "ghripsstcwaqacip");
            smtp.Send(message);
            return Ok(randomNumber);
        }
    }
}
