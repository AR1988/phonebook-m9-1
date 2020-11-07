package com.telran.phonebookapi.service;

import com.telran.phonebookapi.dto.adminDto.InfoDto;
import com.telran.phonebookapi.model.*;
import com.telran.phonebookapi.persistance.*;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

import static com.telran.phonebookapi.service.UserService.USER_DOES_NOT_EXIST;

@Service
public class AdminService {

    IActivationTokenRepository activationTokenRepository;
    IAddressRepository addressRepository;
    IContactRepository contactRepository;
    IEmailRepository emailRepository;
    IPhoneRepository phoneRepository;
    IRecoveryTokenRepository recoveryTokenRepository;
    IUserRepository userRepository;

    public AdminService(IActivationTokenRepository activationTokenRepository,
                        IAddressRepository addressRepository,
                        IContactRepository contactRepository,
                        IEmailRepository emailRepository,
                        IPhoneRepository phoneRepository,
                        IRecoveryTokenRepository recoveryTokenRepository,
                        IUserRepository userRepository) {
        this.activationTokenRepository = activationTokenRepository;
        this.addressRepository = addressRepository;
        this.contactRepository = contactRepository;
        this.emailRepository = emailRepository;
        this.phoneRepository = phoneRepository;
        this.recoveryTokenRepository = recoveryTokenRepository;
        this.userRepository = userRepository;
    }

    public InfoDto getInfo() {
        return new InfoDto(
                userRepository.count(),
                contactRepository.count(),
                phoneRepository.count(),
                emailRepository.count(),
                addressRepository.count(),
                recoveryTokenRepository.count(),
                activationTokenRepository.count(),
                userRepository.countByIsActiveIsTrue());
    }

    public List<RecoveryToken> getAllRecoveryToken() {
        return recoveryTokenRepository.findAll();
    }

    public List<ActivationToken> getAllActivationToken() {
        return activationTokenRepository.findAll();
    }

    public void removeActivationToken(String id) {
        if (activationTokenRepository.findById(id).isPresent())
            activationTokenRepository.deleteById(id);
    }

    public void removeRecoveryToken(String id) {
        recoveryTokenRepository.deleteById(id);
    }

    @Transactional
    public void activateUser(String userEmail) {
        if (activationTokenRepository.findByUserEmail(userEmail).isPresent())
            activationTokenRepository.deleteByUserEmail(userEmail);

        User user = userRepository.findById(userEmail).orElseThrow(() -> new EntityNotFoundException(USER_DOES_NOT_EXIST));
        user.setActive(true);
        user.setActivatedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    public List<Address> getAllAddresses() {
        return addressRepository.findAll();
    }

    public List<Email> getAllEmails() {
        return emailRepository.findAll();
    }

    public List<Phone> getAllPhones() {
        return phoneRepository.findAll();
    }

    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    public List<User> getUserAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public void removeUser(String userEmail) {
        User user = userRepository.findById(userEmail)
                .orElseThrow(() -> new EntityNotFoundException(USER_DOES_NOT_EXIST));

        activationTokenRepository.deleteByUserEmail(user.getEmail());
        recoveryTokenRepository.deleteByUserEmail(user.getEmail());

        contactRepository.deleteByUserEmail(user.getEmail());
        userRepository.deleteById(user.getEmail());
    }
}
