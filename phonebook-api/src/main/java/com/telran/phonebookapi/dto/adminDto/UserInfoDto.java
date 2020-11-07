package com.telran.phonebookapi.dto.adminDto;

import com.telran.phonebookapi.model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDto {
    public String email;
    public Set<UserRole> roles;
    public boolean isActivated;
    public int myProfileId;
    public LocalDateTime registeredAt;
    public LocalDateTime activateAt;
}
