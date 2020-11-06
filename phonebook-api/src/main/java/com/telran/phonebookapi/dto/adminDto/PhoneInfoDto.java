package com.telran.phonebookapi.dto.adminDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PhoneInfoDto {
    public int id;
    public String countryCode;
    public String phoneNumber;
    public int contactId;
    public String userId;

    public PhoneInfoDto(int id, int contactId, String userId) {
        this.id = id;
        this.contactId = contactId;
        this.userId = userId;
    }
}
