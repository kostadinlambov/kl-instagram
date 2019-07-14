package com.instagram.validations.serviceValidation.services;

import com.instagram.domain.entities.Like;

public interface LikeValidationService {
    boolean isValid(Like like);
}
