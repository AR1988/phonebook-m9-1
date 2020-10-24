package com.telran.phonebookapi.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.test.util.ReflectionTestUtils;

import javax.mail.internet.MimeMessage;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
class EmailSenderTest {

    @InjectMocks
    EmailSender emailSender;

    @Mock
    JavaMailSender javaMailSender;

    @Captor
    ArgumentCaptor<MimeMessagePreparator> preparatorArgumentCaptor;
    @Captor
    ArgumentCaptor<SimpleMailMessage> simpleMailMessageArgumentCaptor;
    private MimeMessage mimeMessage;

    @Test
    public void testSendMail_mailSender_sendsEmail() throws Exception {
        String from = "springangular98@gmail.com";
        String toEmail = "janedoe@example.com";
        String subject = "Test subject";
        String message = "Test text";
        String url = "TestUrl";

        ReflectionTestUtils.setField(emailSender, "fromMail",from);

        emailSender.sendMail(toEmail, subject, message, url);

        Mockito.verify(javaMailSender, times(1)).send(preparatorArgumentCaptor.capture());

        mimeMessage = new JavaMailSenderImpl().createMimeMessage();
        preparatorArgumentCaptor.getValue().prepare(mimeMessage);

        assertEquals(from, mimeMessage.getFrom()[0].toString());
        assertEquals(toEmail, mimeMessage.getAllRecipients()[0].toString());
        assertEquals(subject, mimeMessage.getSubject());
        assertEquals(url, mimeMessage.getContent().toString());
    }

    @Test
    public void testSendMailUpperCase_mailSender_sendsEmail() {
        String toEmail = "jAneDoe@example.com";
        String subject = "Test subject";
        String message = "Test text";
        String url = "TestUrl";

        emailSender.sendMail(toEmail, subject, message);

        Mockito.verify(javaMailSender, times(1)).send(simpleMailMessageArgumentCaptor.capture());
        SimpleMailMessage capturedMessage = simpleMailMessageArgumentCaptor.getValue();

        assertEquals("janedoe@example.com", Objects.requireNonNull(capturedMessage.getTo())[0]);
        assertEquals("Test subject", capturedMessage.getSubject());
        assertEquals("Test text", capturedMessage.getText());
    }
}
