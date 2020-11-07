package com.telran.phonebookapi.model;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class ActivationToken {

    @Id
    private String uuid;
    @OneToOne
    private User user;

    private final LocalDateTime createdAt = LocalDateTime.now();

    public ActivationToken(String uuid, User user) {
        this.uuid = uuid;
        this.user = user;
    }
}
