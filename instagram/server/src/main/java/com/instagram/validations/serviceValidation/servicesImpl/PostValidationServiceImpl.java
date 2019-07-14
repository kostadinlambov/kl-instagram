package com.instagram.validations.serviceValidation.servicesImpl;

import com.instagram.domain.entities.Post;
import com.instagram.validations.serviceValidation.services.PostValidationService;
import org.springframework.stereotype.Component;

@Component
public class PostValidationServiceImpl implements PostValidationService {
    @Override
    public boolean isValid(Post post) {
        return post != null;
    }

}
