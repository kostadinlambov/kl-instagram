package com.instagram.validations.serviceValidation.servicesImpl;

import com.instagram.domain.entities.Follower;
import com.instagram.validations.serviceValidation.services.FollowerValidationService;
import org.springframework.stereotype.Component;

@Component
public class FollowerValidationServiceImpl implements FollowerValidationService {
    @Override
    public boolean isValid(Follower follower) {
        return follower != null;
    }
}
