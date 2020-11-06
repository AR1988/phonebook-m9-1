package com.telran.phonebookapi.controller;

import com.telran.phonebookapi.dto.UserEmailDto;
import com.telran.phonebookapi.dto.adminDto.*;
import com.telran.phonebookapi.service.AdminService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminController {

    AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/users")
    public List<UserInfoDto> getAllUsers() {
        return adminService.getUserAllUsers().stream()
                .map(user -> new UserInfoDto(
                        user.getEmail(),
                        user.getRoles(),
                        user.isActive(),
                        user.getMyProfile().getId()))
                .collect(Collectors.toList());
    }

    @GetMapping("/contacts")
    public List<ContactInfoDto> getAllContacts() {
        return adminService.getAllContacts().stream()
                .map(contact -> new ContactInfoDto(
                        contact.getId(),
                        contact.getFirstName(),
                        contact.getLastName(),
                        contact.getDescription(),
                        contact.getUser().getEmail()))
                .collect(Collectors.toList());
    }

    @GetMapping("/phones")
    public List<PhoneInfoDto> getAllPhones() {
        return adminService.getAllPhones().stream()
                .map(phone -> new PhoneInfoDto(
                        phone.getId(),
                        phone.getCountryCode(),
                        phone.getPhoneNumber(),
                        phone.getContact().getId(),
                        phone.getContact().getUser().getEmail()))
                .collect(Collectors.toList());
    }

    @GetMapping("/emails")
    public List<EmaiInfolDto> getAllEmails() {
        return adminService.getAllEmails().stream()
                .map(email -> new EmaiInfolDto(
                        email.getId(),
                        email.getEmail(),
                        email.getContact().getId(),
                        email.getContact().getUser().getEmail()))
                .collect(Collectors.toList());
    }

    @GetMapping("/addresses")
    public List<AddressInfoDto> getAllAddresses() {
        return adminService.getAllAddresses().stream()
                .map(addresses -> new AddressInfoDto(
                        addresses.getId(),
                        addresses.getCity(),
                        addresses.getCountry(),
                        addresses.getStreet(),
                        addresses.getZip(),
                        addresses.getContact().getId(),
                        addresses.getContact().getUser().getEmail()))
                .collect(Collectors.toList());
    }

    @GetMapping("/recovery-token")
    public List<RecoveryTokenDto> getAllRecoveryPasswordTokens() {
        return adminService.getAllRecoveryToken().stream()
                .map(activationToken -> new RecoveryTokenDto(
                        activationToken.getUser().getEmail(),
                        activationToken.getId()))
                .collect(Collectors.toList());
    }

    @GetMapping("/info")
    public InfoDto getInfo() {
        return adminService.getInfo();
    }


    @GetMapping("/activation-token")
    public List<ActivationTokenDto> getAllActivationTokens() {
        return adminService.getAllActivationToken().stream()
                .map(activationToken -> new ActivationTokenDto(
                        activationToken.getUser().getEmail(),
                        activationToken.getUuid()))
                .collect(Collectors.toList());
    }

    @PatchMapping("/activate")
    public void activateUser(@RequestBody UserEmailDto userEmailDto) {
        adminService.activateUser(userEmailDto.email);
    }

    @DeleteMapping("/{id}")
    public void removeUser(@PathVariable String id) {
        adminService.removeUser(id);
    }

    @DeleteMapping("/recovery-token/{id}")
    public void deleteRecoveryPasswordToken(@PathVariable String id) {
        adminService.removeRecoveryToken(id);
    }

    @DeleteMapping("/activation-token/{id}")
    public void deleteActivationToken(@PathVariable String id) {
        adminService.removeActivationToken(id);
    }
}
