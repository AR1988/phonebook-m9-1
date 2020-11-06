package com.telran.phonebookapi.persistance;

import com.telran.phonebookapi.model.Contact;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
class IContactRepositoryTest {

    @Autowired
    TestEntityManager entityManager;

    @Autowired
    IContactRepository contactRepository;

    @Test
    public void testFindAll_noContactsExist_emptyList() {
        List<Contact> foundContacts = contactRepository.findAll();
        assertEquals(0, foundContacts.size());
    }
}
