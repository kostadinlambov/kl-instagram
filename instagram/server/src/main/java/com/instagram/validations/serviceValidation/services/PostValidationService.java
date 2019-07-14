package com.instagram.validations.serviceValidation.services;

import com.instagram.domain.entities.Post;

public interface PostValidationService {
    boolean isValid(Post post);
}
