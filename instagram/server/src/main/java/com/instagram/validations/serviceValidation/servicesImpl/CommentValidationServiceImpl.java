package com.instagram.validations.serviceValidation.servicesImpl;

import com.instagram.domain.entities.Comment;
import com.instagram.validations.serviceValidation.services.CommentValidationService;
import org.springframework.stereotype.Component;

@Component
public class CommentValidationServiceImpl implements CommentValidationService {
    @Override
    public boolean isValid(Comment comment) {
        return comment != null;
    }
}
