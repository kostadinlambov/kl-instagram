package com.instagram.web.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.instagram.domain.models.bindingModels.user.UserRegisterBindingModel;
import com.instagram.domain.models.bindingModels.user.UserUpdateBindingModel;
import com.instagram.domain.models.serviceModels.UserServiceModel;
import com.instagram.domain.models.viewModels.follower.FollowingViewModel;
import com.instagram.domain.models.viewModels.user.UserAllViewModel;
import com.instagram.domain.models.viewModels.user.UserCreateViewModel;
import com.instagram.domain.models.viewModels.user.UserDetailsViewModel;
import com.instagram.domain.models.viewModels.user.UserPeopleViewModel;
import com.instagram.services.UserService;
import com.instagram.utils.responseHandler.exceptions.BadRequestException;
import com.instagram.utils.responseHandler.exceptions.CustomException;
import com.instagram.utils.responseHandler.successResponse.SuccessResponse;
import com.instagram.validations.serviceValidation.services.UserValidationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static com.instagram.utils.constants.ResponseMessageConstants.*;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    private final UserService userService;
    private final ModelMapper modelMapper;
    private final ObjectMapper objectMapper;
    private final UserValidationService userValidationService;

    @Autowired
    public UserController(UserService userService, ModelMapper modelMapper, ObjectMapper objectMapper, UserValidationService userValidationService) {
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.objectMapper = objectMapper;
        this.userValidationService = userValidationService;
    }


    @PostMapping(value = "/register")
    public ResponseEntity<Object> registerUser(@RequestBody @Valid UserRegisterBindingModel userRegisterBindingModel) throws Exception {
        if (!userValidationService.isValid(userRegisterBindingModel.getPassword(), userRegisterBindingModel.getConfirmPassword())) {
            throw new BadRequestException(PASSWORDS_MISMATCH_ERROR_MESSAGE);
        }

        if (!userValidationService.isValid(userRegisterBindingModel)) {
            throw new Exception(SERVER_ERROR_MESSAGE);
        }

        UserServiceModel user = modelMapper.map(userRegisterBindingModel, UserServiceModel.class);
        UserCreateViewModel savedUser = this.userService.createUser(user);

        SuccessResponse successResponse = successResponseBuilder(LocalDateTime.now(), SUCCESSFUL_REGISTER_MESSAGE, savedUser, true);

        return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
    }


    @GetMapping(value = "/admin/all/{id}")
    public List<UserAllViewModel> getAllUsersAdmin(@PathVariable(value = "id") String userId) throws Exception {
        List<UserServiceModel> allUsers = this.userService.getAllUsersAdmin(userId);

        return allUsers.stream()
                .map(x -> {
                    UserAllViewModel userAllViewModel = this.modelMapper.map(x, UserAllViewModel.class);
                    userAllViewModel.setRole(x.extractAuthority());
                    return userAllViewModel;
                })
                .collect(Collectors.toList());
    }

    @GetMapping(value = "/all/{id}")
    public List<UserPeopleViewModel> getAllUsersFollowersInfo(@PathVariable(value = "id") String userId) throws Exception {
        List<UserPeopleViewModel> allUsers = this.userService.getAllUsersWithFollowersInfo(userId);

        return allUsers;
    }

    @GetMapping(value = "/followingCandidates/{username}")
    public List<UserPeopleViewModel> getAllFollowingCandidates(@PathVariable(value = "username") String username) throws Exception {
        List<UserPeopleViewModel> allFollowingCandidates = this.userService.getAllNotFollowers(username);

        return allFollowingCandidates;
    }


//    @GetMapping(value = "/notFollowers/{id}")
//    public List<UserAllViewModel> getAllUsersNotFollowers(@PathVariable(value = "id") String userId) throws Exception {
//        List<UserPeopleViewModel> allUsers = this.userService.getAllUsersWithFollowersInfo(userId);
//
//        return allUsers.stream()
//                .map(x -> {
//                    UserAllViewModel userAllViewModel = this.modelMapper.map(x, UserAllViewModel.class);
//                    userAllViewModel.setRole(x.extractAuthority());
//                    return userAllViewModel;
//                })
//                .collect(Collectors.toList());
//    }

//    @GetMapping(value = "/all/{id}")
//    public List<UserAllViewModel> getAllUsers(@PathVariable(value = "id") String userId) throws Exception {
//        List<UserServiceModel> allUsers = this.userService.getAllUsers(userId);
//
//        return allUsers.stream()
//                .map(x -> {
//                    UserAllViewModel userAllViewModel = this.modelMapper.map(x, UserAllViewModel.class);
//                    userAllViewModel.setRole(x.extractAuthority());
//                    return userAllViewModel;
//                })
//                .collect(Collectors.toList());
//    }


    @PostMapping(value = "/promote")
    public ResponseEntity promoteUser(@RequestParam(name = "id") String id) throws Exception {
        boolean resultOfPromoting = this.userService.promoteUser(id);

        if (resultOfPromoting) {
            SuccessResponse successResponse = successResponseBuilder(LocalDateTime.now(), SUCCESSFUL_USER_PROMOTED_MESSAGE, "", true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }

        throw new CustomException(USER_FAILURE_PROMOTING_MESSAGE);
    }

    private SuccessResponse successResponseBuilder(LocalDateTime timestamp, String message, Object payload, boolean success) {
        return new SuccessResponse(timestamp, message, payload, success);
    }

    @PostMapping(value = "/demote")
    public ResponseEntity demoteUser(@RequestParam(name = "id") String id) throws Exception {
        boolean resultOfDemoting = this.userService.demoteUser(id);

        if (resultOfDemoting) {

            SuccessResponse successResponse = successResponseBuilder(LocalDateTime.now(), SUCCESSFUL_USER_DEMOTED_MESSAGE, "", true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }
        throw new CustomException(USER_FAILURE_DEMOTING_MESSAGE);
    }

    @GetMapping(value = "/details/id/{id}")
    public ResponseEntity getDetails(@PathVariable String id) throws Exception {
        UserDetailsViewModel user = this.userService.getUserById(id);
        return new ResponseEntity<>(this.objectMapper.writeValueAsString(user), HttpStatus.OK);

    }

    @GetMapping(value = "/details/username/{username}")
    public ResponseEntity getDetailsUsername(@PathVariable String username) throws Exception {
        UserDetailsViewModel user = this.userService.getUserByUsername(username);
        return new ResponseEntity<>(this.objectMapper.writeValueAsString(user), HttpStatus.OK);

    }

    @GetMapping(value = "/details/postId/{postId}")
    public ResponseEntity getDetailsPostId(@PathVariable String postId) throws Exception {
        UserDetailsViewModel user = this.userService.getUserByPostId(postId);
        System.out.println();
        return new ResponseEntity<>(this.objectMapper.writeValueAsString(user), HttpStatus.OK);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity updateUser(@RequestBody @Valid UserUpdateBindingModel userUpdateBindingModel,
                                     @PathVariable(value = "id") String loggedInUserId) throws Exception {

        if(!userValidationService.isValid(userUpdateBindingModel)){
            throw new Exception(SERVER_ERROR_MESSAGE);
        }

        UserServiceModel userServiceModel = this.modelMapper.map(userUpdateBindingModel, UserServiceModel.class);
        boolean result = this.userService.updateUser(userServiceModel, loggedInUserId);

        if (result) {
            SuccessResponse successResponse = successResponseBuilder(LocalDateTime.now(), SUCCESSFUL_USER_PROFILE_EDIT_MESSAGE, "", true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }

        throw new CustomException(SERVER_ERROR_MESSAGE);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable(value = "id") String id) throws Exception {
        boolean result = this.userService.deleteUserById(id );

        if(result){
            SuccessResponse successResponse = successResponseBuilder(LocalDateTime.now(), SUCCESSFUL_USER_DELETE_MESSAGE, "", true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }

        throw new CustomException(SERVER_ERROR_MESSAGE);
    }





}
