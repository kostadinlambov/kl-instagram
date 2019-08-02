package com.instagram.services;


import com.instagram.domain.entities.User;
import com.instagram.domain.models.serviceModels.UserServiceModel;
import com.instagram.domain.models.viewModels.user.UserCreateViewModel;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    UserCreateViewModel createUser(UserServiceModel userServiceModel);

    User getByUsernameValidation(String username);

    User getByEmailValidation(String email);
}
