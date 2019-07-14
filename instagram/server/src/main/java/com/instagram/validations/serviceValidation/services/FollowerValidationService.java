package com.instagram.validations.serviceValidation.services;

import com.instagram.domain.entities.Follower;

public interface FollowerValidationService {
    boolean isValid(Follower follower);
}
