package com.telran.phonebookapi.persistance;

import com.telran.phonebookapi.model.ActivationToken;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IActivationTokenRepository extends CrudRepository<ActivationToken, String> {

    List<ActivationToken> findAll();

    ActivationToken findByUserEmail(String userEmail);
}
