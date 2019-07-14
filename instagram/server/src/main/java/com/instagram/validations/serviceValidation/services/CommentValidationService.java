package com.instagram.validations.serviceValidation.services;

import com.instagram.domain.entities.Comment;

public interface CommentValidationService {
    boolean isValid(Comment comment);
}
