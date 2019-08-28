package com.instagram.servicesImpl;

import com.instagram.domain.entities.Post;
import com.instagram.domain.entities.User;
import com.instagram.domain.entities.UserRole;
import com.instagram.domain.models.serviceModels.UserServiceModel;
import com.instagram.domain.models.viewModels.user.UserCreateViewModel;
import com.instagram.domain.models.viewModels.user.UserDetailsViewModel;
import com.instagram.domain.models.viewModels.user.UserPeopleViewModel;
import com.instagram.repositories.PostRepository;
import com.instagram.repositories.RoleRepository;
import com.instagram.repositories.UserRepository;
import com.instagram.services.UserService;
import com.instagram.utils.responseHandler.exceptions.CustomException;
import com.instagram.validations.serviceValidation.services.PostValidationService;
import com.instagram.validations.serviceValidation.services.UserValidationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

import static com.instagram.utils.constants.ResponseMessageConstants.*;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final UserValidationService userValidation;
    private final PostValidationService postValidation;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final RoleRepository roleRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PostRepository postRepository, UserValidationService userValidation, PostValidationService postValidation, ModelMapper modelMapper, BCryptPasswordEncoder bCryptPasswordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.userValidation = userValidation;
        this.postValidation = postValidation;
        this.modelMapper = modelMapper;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.roleRepository = roleRepository;
    }

    @Override
    public UserCreateViewModel createUser(UserServiceModel userServiceModel) {
//        this.loggerService.createLog("POST", userServiceModel.getUsername(), "users", "register");

        if (!userValidation.isValid(userServiceModel)) {
            throw new CustomException(SERVER_ERROR_MESSAGE);
        }

        User userEntity = this.modelMapper.map(userServiceModel, User.class);

        userEntity.setPassword(this.bCryptPasswordEncoder.encode(userEntity.getPassword()));

        UserRole userRole = this.roleRepository.findByAuthority("USER");
        UserRole rootRole = this.roleRepository.findByAuthority("ROOT");

        Set<UserRole> roles = new HashSet<>();

        if (this.userRepository.findAll().isEmpty()) {
            roles.add(rootRole);
        } else {
            roles.add(userRole);
        }

        userEntity.setAuthorities(roles);
        User user = this.userRepository.saveAndFlush(userEntity);

        if (user != null) {
            return this.modelMapper.map(userEntity, UserCreateViewModel.class);
        }

        throw new CustomException(SERVER_ERROR_MESSAGE);
    }

    @Override
    public List<UserServiceModel> getAllUsers(String userId) throws Exception {
        User userById = this.userRepository.findById(userId).orElse(null);

        if (!userValidation.isValid(userById)) {
            throw new Exception(SERVER_ERROR_MESSAGE);
        }

        return this.userRepository.findAll().stream()
                .map(x -> this.modelMapper.map(x, UserServiceModel.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<UserPeopleViewModel> getAllNotFollowers(String username) throws Exception {
        User userById = this.userRepository.findByUsername(username).orElse(null);

        if (!userValidation.isValid(userById)) {
            throw new Exception(SERVER_ERROR_MESSAGE);
        }

        List<User> allNotFollowers = this.userRepository.getAllNotFollowers(userById.getId());

        return allNotFollowers.stream()
                .map(user -> this.modelMapper
                        .map(user, UserPeopleViewModel.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<UserPeopleViewModel> getAllUsersWithFollowersInfo(String userId) throws Exception {
        User userById = this.userRepository.findById(userId).orElse(null);

        if (!userValidation.isValid(userById)) {
            throw new Exception(SERVER_ERROR_MESSAGE);
        }

        List<Object[]> allUsers = this.userRepository.getAllUsersWithFollowersInfo(userId);
        List<UserPeopleViewModel> userPeopleViewModels = new ArrayList<>();

        for (Object[] currentUser : allUsers) {
            UserPeopleViewModel userPeopleViewModel = new UserPeopleViewModel();
            userPeopleViewModel.setId((String) currentUser[0]);
            userPeopleViewModel.setUsername((String) currentUser[1]);
            userPeopleViewModel.setFirstName((String) currentUser[2]);
            userPeopleViewModel.setLastName((String) currentUser[3]);
            userPeopleViewModel.setProfilePicUrl((String) currentUser[4]);
            userPeopleViewModel.setActive((Boolean) currentUser[5]);

            userPeopleViewModels.add(userPeopleViewModel);
        }

        return userPeopleViewModels;
    }

    @Override
    public UserDetailsViewModel getUserById(String id) throws Exception {
        User user = this.userRepository.findById(id)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);

        String userAuthority = this.getUserAuthority(id);
        UserDetailsViewModel userFromDb = this.modelMapper.map(user, UserDetailsViewModel.class);
        userFromDb.setRole(userAuthority);

        return userFromDb;
    }

    @Override
    public UserDetailsViewModel getUserByUsername(String username) throws Exception {
        User user = this.userRepository.findByUsername(username)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);

        String userAuthority = this.getUserAuthority(user.getId());
        UserDetailsViewModel userFromDb = this.modelMapper.map(user, UserDetailsViewModel.class);
        userFromDb.setRole(userAuthority);

        return userFromDb;
    }

    @Override
    public UserDetailsViewModel getUserByPostId(String postId) throws Exception {
        Post post = this.postRepository
                .findById(postId)
                .filter(postValidation::isValid)
                .orElseThrow(Exception::new);

        User user = this.userRepository.findById(post.getCreator().getId())
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);

        String userAuthority = this.getUserAuthority(user.getId());
        UserDetailsViewModel userFromDb = this.modelMapper.map(user, UserDetailsViewModel.class);
        userFromDb.setRole(userAuthority);

        return userFromDb;
    }

    @Override
    public boolean updateUser(UserServiceModel userServiceModel, String loggedInUserId) throws Exception {
        if (!userValidation.isValid(userServiceModel)) {
            throw new Exception(SERVER_ERROR_MESSAGE);
        }

        User userToEdit = this.userRepository.findById(userServiceModel.getId()).orElse(null);
        User loggedInUser = this.userRepository.findById(loggedInUserId).orElse(null);

        if (!userValidation.isValid(userToEdit) || !userValidation.isValid(loggedInUser)) {
            throw new Exception(SERVER_ERROR_MESSAGE);
        }

        if (!userServiceModel.getId().equals(loggedInUserId)) {
            String userAuthority = this.getUserAuthority(loggedInUserId);
            if (!("ROOT").equals(userAuthority) && !("ADMIN").equals(userAuthority)) {
                throw new CustomException(UNAUTHORIZED_SERVER_ERROR_MESSAGE);
            }
        }

        User userEntity = this.modelMapper.map(userServiceModel, User.class);
        userEntity.setPassword(userToEdit.getPassword());
        userEntity.setAuthorities(userToEdit.getAuthorities());

        return this.userRepository.save(userEntity) != null;
    }

    @Override
    public boolean deleteUserById(String id) throws Exception {
        this.userRepository.findById(id)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);

        try {
            this.userRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(SERVER_ERROR_MESSAGE);
        }
    }



    @Override
    public List<UserServiceModel> getAllUsersAdmin(String userId) throws Exception {
        User userById = this.userRepository.findById(userId).orElseThrow(Exception::new);

        if (!userValidation.isValid(userById)) {
            throw new Exception(SERVER_ERROR_MESSAGE);
        }

        List<UserRole> userRoles = this.getUserRoles(userById);

        if (userRoles.size() > 0) {
            return this.userRepository
                    .findAll()
                    .stream()
                    .map(x -> this.modelMapper.map(x, UserServiceModel.class))
                    .collect(Collectors.toList());
        }

        throw new CustomException(UNAUTHORIZED_SERVER_ERROR_MESSAGE);
    }

    @Override
    public boolean promoteUser(String id) throws Exception {
        User user = this.userRepository.findById(id)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);

        String userAuthority = this.getUserAuthority(user.getId());

        switch (userAuthority) {
            case "USER":
                user.setAuthorities(this.getAuthorities("ADMIN"));
                break;
            case "ROOT":
                throw new CustomException(USER_FAILURE_CHANGING_ROOT_AUTHORITY_MESSAGE);
            default:
                throw new CustomException(USER_FAILURE_PROMOTING_ADMIN_MESSAGE);
        }

        return this.userRepository.save(user) != null;
    }

    @Override
    public boolean demoteUser(String id) throws Exception {
        User user = this.userRepository.findById(id)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);

        String userAuthority = this.getUserAuthority(user.getId());

        switch (userAuthority) {
            case "ADMIN":
                user.setAuthorities(this.getAuthorities("USER"));
                break;
            case "ROOT":
                throw new CustomException(USER_FAILURE_CHANGING_ROOT_AUTHORITY_MESSAGE);
            case "USER":
                throw new CustomException(USER_FAILURE_DEMOTING_USER_MESSAGE);
        }

        return this.userRepository.save(user) != null;
    }

    private Set<UserRole> getAuthorities(String authority) {
        Set<UserRole> userAuthorities = new HashSet<>();
        userAuthorities.add(this.roleRepository.getByAuthority(authority));

        return userAuthorities;
    }

    private String getUserAuthority(String id) {
        return this.userRepository
                .findById(id)
                .get()
                .getAuthorities()
                .stream()
                .findFirst()
                .get()
                .getAuthority();
    }

    private List<UserRole> getUserRoles(User userById) {
        return userById.getAuthorities().stream().filter(userRole ->
                userRole.getAuthority().equals("ROOT")
                        || userRole.getAuthority().equals("ADMIN"))
                .collect(Collectors.toList());
    }


    @Override
    public User getByUsernameValidation(String username) {
        return this.userRepository.findByUsername(username).orElse(null);
    }

    @Override
    public User getByEmailValidation(String email) {
        return this.userRepository.findByEmail(email);
    }


//    @Override
//    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
//        return null;
//    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.userRepository
                .findByUsername(username)
                .filter(userValidation::isValid)
                .orElseThrow(() -> new UsernameNotFoundException(USER_NOT_FOUND_ERROR_MESSAGE));
    }
}
