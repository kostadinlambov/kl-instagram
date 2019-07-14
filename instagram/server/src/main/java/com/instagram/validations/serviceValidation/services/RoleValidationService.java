package com.instagram.validations.serviceValidation.services;

import com.instagram.domain.entities.UserRole;

public interface RoleValidationService {
    boolean isValid(UserRole role);
}
