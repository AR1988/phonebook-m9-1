package com.telran.phonebookapi.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;

@Component
@EnableAsync
public class EmailSender {

    @Value("${com.telran.phonebook.email.from}")
    String fromMail;

    private final JavaMailSender javaMailSender;

    public EmailSender(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Async
    public void sendMail(String toEmail, String subject, String message, String url) {
        String email = toEmail.toLowerCase().trim();

        MimeMessagePreparator messagePreparator = mimeMessage -> {

            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
            messageHelper.setFrom(fromMail);
            messageHelper.setTo(email);
            messageHelper.setSubject(subject);
            String msg = "<a href=\"" + url + "\">" + message + "</a> ";
            messageHelper.setText(msg, true);
        };

        javaMailSender.send(messagePreparator);
    }

    @Async
    public void sendMail(String toEmail, String subject, String message) {
        String email = toEmail.toLowerCase().trim();

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(toEmail);
        mailMessage.setTo(email);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);

        mailMessage.setFrom(fromMail);

        javaMailSender.send(mailMessage);
    }
}
