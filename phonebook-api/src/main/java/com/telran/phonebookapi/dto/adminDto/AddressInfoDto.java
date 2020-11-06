package com.telran.phonebookapi.dto.adminDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddressInfoDto {
    public int id;
    public String city;
    public String country;
    public String street;
    public String zip;
    public int contactId;
    public String userId;

    public AddressInfoDto(int id, int contactId, String userId) {
        this.id = id;
        this.contactId = contactId;
        this.userId = userId;
    }
}
