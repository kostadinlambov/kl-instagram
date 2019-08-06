package com.instagram.services;


import com.instagram.domain.entities.User;
import com.instagram.domain.models.serviceModels.UserServiceModel;
import com.instagram.domain.models.viewModels.user.UserCreateViewModel;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    UserCreateViewModel createUser(UserServiceModel userServiceModel);

    boolean demoteUser(String id) throws Exception;

    User getByUsernameValidation(String username);

    User getByEmailValidation(String email);

    List<UserServiceModel> getAllUsers(String userId) throws Exception;

    boolean promoteUser(String id) throws Exception;
}
