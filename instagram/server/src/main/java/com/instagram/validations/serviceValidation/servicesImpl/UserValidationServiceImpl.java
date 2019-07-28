package com.instagram.validations.serviceValidation.servicesImpl;


import com.instagram.domain.entities.User;
import com.instagram.domain.models.bindingModels.user.UserRegisterBindingModel;
import com.instagram.domain.models.serviceModels.UserServiceModel;
import com.instagram.validations.serviceValidation.services.UserValidationService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class UserValidationServiceImpl implements UserValidationService {

    @Override
    public boolean isValid(User user) {
        return user != null;
    }

    @Override
    public boolean isValid(UserServiceModel userServiceModel) {
        return userServiceModel != null;
    }

    @Override
    public boolean isValid(UserRegisterBindingModel userRegisterBindingModel) {
        return userRegisterBindingModel != null && isValid(userRegisterBindingModel.getPassword(), userRegisterBindingModel.getConfirmPassword());
    }

    @Override
    public boolean isValid(String firstParam, String secondParam) {
        return firstParam.equals(secondParam);
    }

//    @Override
//    public boolean isValid(UserUpdateBindingModel userUpdateBindingModel) {
//        return userUpdateBindingModel != null;
//    }

    @Override
    public boolean isValid(UserDetails userData) {
        return userData != null;
    }

}
