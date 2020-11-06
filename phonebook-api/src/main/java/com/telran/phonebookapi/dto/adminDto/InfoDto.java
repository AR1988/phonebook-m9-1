package com.telran.phonebookapi.dto.adminDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InfoDto {
    public long users;
    public long contacts;
    public long phones;
    public long emails;
    public long addresses;
    public long recoveryTokens;
    public long activateTokens;
    public long activatedUsers;
}
