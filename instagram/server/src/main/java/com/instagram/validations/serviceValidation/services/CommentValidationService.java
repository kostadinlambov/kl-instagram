package com.instagram.validations.serviceValidation.services;

import com.instagram.domain.entities.Comment;
import com.instagram.domain.models.bindingModels.comment.CommentCreateBindingModel;

public interface CommentValidationService {
    boolean isValid(Comment comment);

    boolean isValid(CommentCreateBindingModel comment);
}
