package com.instagram.validations.serviceValidation.servicesImpl;

import com.instagram.domain.entities.Like;
import com.instagram.validations.serviceValidation.services.LikeValidationService;
import org.springframework.stereotype.Component;

@Component
public class LikeValidationServiceImpl implements LikeValidationService {
    @Override
    public boolean isValid(Like like) {
        return like != null;
    }
}
