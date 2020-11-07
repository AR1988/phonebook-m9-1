package com.telran.phonebookapi.config;

import com.telran.phonebookapi.model.Contact;
import com.telran.phonebookapi.model.User;
import com.telran.phonebookapi.model.UserRole;
import com.telran.phonebookapi.persistance.IContactRepository;
import com.telran.phonebookapi.persistance.IUserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;


@Profile(value = "dev")
@Component
public class TestUserRunner implements ApplicationRunner {
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    @Value("${com.telran.testUser.testEmail}")
    String testEmail;
    @Value("${com.telran.testUser.testPassword}")
    String testPassword;
    private final
    IUserRepository userRepository;
    IContactRepository contactRepository;

    public TestUserRunner(IUserRepository userRepository, IContactRepository contactRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.contactRepository = contactRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) {
        LocalDateTime dateTimeNow = LocalDateTime.now();

        if (userRepository.findById(testEmail).isEmpty()) {

            User user = new User(testEmail, bCryptPasswordEncoder.encode(testPassword));
            user.setActive(true);
            user.setRegisteredAt(dateTimeNow);
            user.setActivatedAt(LocalDateTime.now());
            user.addRole(UserRole.USER);

            userRepository.save(user);

            Contact profile = new Contact(null, user);

            user.setMyProfile(profile);
            contactRepository.save(profile);

            userRepository.save(user);
        }

        if (userRepository.findById("admin." + testEmail).isEmpty()) {

            User user = new User("admin." + testEmail, bCryptPasswordEncoder.encode("admin." + testPassword));
            user.setActive(true);
            user.setRegisteredAt(dateTimeNow);
            user.setActivatedAt(dateTimeNow);
            user.addRole(UserRole.USER);
            user.addRole(UserRole.ADMIN);

            userRepository.save(user);

            Contact profile = new Contact(null, user);

            user.setMyProfile(profile);
            contactRepository.save(profile);

            userRepository.save(user);
        }
    }
}
