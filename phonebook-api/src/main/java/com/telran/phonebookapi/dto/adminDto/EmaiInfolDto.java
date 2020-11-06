package com.telran.phonebookapi.dto.adminDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmaiInfolDto {
    public int id;
    public String email;
    public int contactId;
    public String userId;

    public EmaiInfolDto(int id, String userId) {
        this.id = id;
        this.userId = userId;
    }
}
