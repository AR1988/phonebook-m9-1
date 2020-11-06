package com.telran.phonebookapi.persistance;

import com.telran.phonebookapi.model.RecoveryToken;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IRecoveryTokenRepository extends CrudRepository<RecoveryToken, String> {

    void deleteByUserEmail(String email);

    List<RecoveryToken> findAll();
}
