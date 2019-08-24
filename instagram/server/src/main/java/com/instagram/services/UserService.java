package com.instagram.services;


import com.instagram.domain.entities.User;
import com.instagram.domain.models.serviceModels.UserServiceModel;
import com.instagram.domain.models.viewModels.user.UserCreateViewModel;
import com.instagram.domain.models.viewModels.user.UserDetailsViewModel;
import com.instagram.domain.models.viewModels.user.UserPeopleViewModel;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    UserCreateViewModel createUser(UserServiceModel userServiceModel);

    boolean demoteUser(String id) throws Exception;

    User getByUsernameValidation(String username);

    User getByEmailValidation(String email);

    List<UserServiceModel> getAllUsers(String userId) throws Exception;

    List<UserServiceModel> getAllUsersAdmin(String userId) throws Exception;

    boolean promoteUser(String id) throws Exception;

    List<UserPeopleViewModel> getAllNotFollowers(String userId) throws Exception;

    List<UserPeopleViewModel> getAllUsersWithFollowersInfo(String userId) throws Exception;

    UserDetailsViewModel getUserById(String id) throws Exception;

    UserDetailsViewModel getUserByUsername(String username) throws Exception;

    boolean updateUser(UserServiceModel userServiceModel, String loggedInUserId) throws Exception;

    boolean deleteUserById(String id) throws Exception;
}
