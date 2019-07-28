package com.instagram.services;


import com.instagram.domain.models.serviceModels.UserServiceModel;
import com.instagram.domain.models.viewModels.user.UserCreateViewModel;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    UserCreateViewModel createUser(UserServiceModel userServiceModel);
}
