package com.telran.phonebookapi.dto.adminDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactInfoDto {
    public int id;
    public String firstName;
    public String lastName;
    public String description;
    public String userId;

    public ContactInfoDto(int id, String userId) {
        this.id = id;
        this.userId = userId;
    }
}
