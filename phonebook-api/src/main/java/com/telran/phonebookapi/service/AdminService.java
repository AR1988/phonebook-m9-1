package com.telran.phonebookapi.service;

import com.telran.phonebookapi.dto.adminDto.InfoDto;
import com.telran.phonebookapi.model.*;
import com.telran.phonebookapi.persistance.*;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
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

    public List<RecoveryToken> getAllRecoveryTokens() {
        return recoveryTokenRepository.findAll();
    }

    public List<ActivationToken> getAllActivationTokens() {
        return activationTokenRepository.findAll();
    }

    public void removeActivationToken(String id) {
        if (activationTokenRepository.findById(id).isPresent())
            activationTokenRepository.deleteById(id);
    }

    public void removeRecoveryToken(String id) {
        if (recoveryTokenRepository.findById(id).isPresent())
            recoveryTokenRepository.deleteById(id);
    }

    public void activateUser(String userEmail) {
        ActivationToken activationToken = activationTokenRepository.findByUserEmail(userEmail);
        if (activationToken != null)
            removeActivationToken(activationToken.getUuid());

        User user = userRepository.findById(userEmail)
                .orElseThrow(() -> new EntityNotFoundException(USER_DOES_NOT_EXIST));
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

    public List<User> geAllUsers() {
        return userRepository.findAll();
    }

    public void removeUser(String userEmail) {

        User user = userRepository.findById(userEmail).orElseThrow(EntityNotFoundException::new);
        ActivationToken activationToken = activationTokenRepository.findByUserEmail(userEmail);
        if (activationToken != null)
            removeActivationToken(activationToken.getUuid());

        List<RecoveryToken> recoveryTokenList = recoveryTokenRepository.findAllByUserEmail(userEmail);
        if (recoveryTokenList.size() > 0)
            for (RecoveryToken token : recoveryTokenList)
                recoveryTokenRepository.deleteById(token.getId());

        userRepository.deleteById(user.getEmail());
    }
}
