package com.telran.phonebookapi.persistance;

import com.telran.phonebookapi.model.ActivationToken;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface IActivationTokenRepository extends CrudRepository<ActivationToken, String> {

    void deleteByUserEmail(String email);

    List<ActivationToken> findAll();

    Optional<ActivationToken> findByUserEmail(String userEmail);
}
