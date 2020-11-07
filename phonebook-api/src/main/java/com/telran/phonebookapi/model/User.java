package com.telran.phonebookapi.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity(name = "Users")
@NoArgsConstructor
@Getter
public class User {
    @Id
    private String email;
    @Setter
    private String password;
    @ElementCollection(fetch = FetchType.EAGER)
    private final Set<UserRole> roles = new HashSet<>();
    @Setter
    private boolean isActive;
    @OneToOne
    @Setter
    private Contact myProfile;

    @Setter
    private LocalDateTime activatedAt;
    @Setter
    private LocalDateTime registeredAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private final List<Contact> contacts = new ArrayList<>();

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public void addContact(Contact contact) {
        contacts.add(contact);
    }

    public void addProfile(Contact contact) {
        this.myProfile = contact;
    }

    public void addRole(UserRole role) {
        roles.add(role);
    }

    public void removeRole(UserRole role) {
        roles.remove(role);
    }

    public List<Contact> getContacts() {
        return contacts;
    }

}
