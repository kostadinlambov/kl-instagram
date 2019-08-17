package com.instagram.servicesImpl;

import com.instagram.domain.entities.Follower;
import com.instagram.domain.entities.User;
import com.instagram.domain.models.viewModels.follower.FollowerViewModel;
import com.instagram.domain.models.viewModels.follower.FollowingViewModel;
import com.instagram.repositories.FollowerRepository;
import com.instagram.repositories.UserRepository;
import com.instagram.services.FollowerService;
import com.instagram.utils.responseHandler.exceptions.CustomException;
import com.instagram.validations.serviceValidation.services.UserValidationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static com.instagram.utils.constants.ResponseMessageConstants.*;

@Service
public class FollowerServiceImpl implements FollowerService {
    private final FollowerRepository followerRepository;
    private final UserRepository userRepository;
    private final UserValidationService userValidation;
    private final ModelMapper modelMapper;


    @Autowired
    public FollowerServiceImpl(FollowerRepository followerRepository, UserRepository userRepository, UserValidationService userValidation, ModelMapper modelMapper) {
        this.followerRepository = followerRepository;
        this.userRepository = userRepository;
        this.userValidation = userValidation;
        this.modelMapper = modelMapper;
    }

    @Override
    public boolean follow(String loggedInUserId, String userToFollowId) throws Exception {
        User loggedInUser = this.userRepository.findById(loggedInUserId)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);


        User toBeFollowedUser = this.userRepository.findById(userToFollowId)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);


        Follower followerFromDb = this.followerRepository.findFirstByUserAndFollower(toBeFollowedUser, loggedInUser);

        if(followerFromDb == null) {
            Follower follower = new Follower();
            follower.setUser(toBeFollowedUser);
            follower.setFollower(loggedInUser);
            follower.setActive(true);
            follower.setTime(LocalDateTime.now());

            return this.followerRepository.save(follower) != null;
        }else if(!followerFromDb.isActive()) {
            followerFromDb.setActive(true);
            followerFromDb.setTime(LocalDateTime.now());

            return this.followerRepository.save(followerFromDb) != null;
        }

        throw new CustomException(FAILURE_FOLLOW_USER_MESSAGE);
    }

    @Override
    public boolean unFollow(String loggedInUserId, String userToUnFollowId) throws Exception {
        User loggedInUser = this.userRepository.findById(loggedInUserId)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);


        User toBeFollowedUser = this.userRepository.findById(userToUnFollowId)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);


        Follower followerFromDb = this.followerRepository.findFirstByUserAndFollower(toBeFollowedUser, loggedInUser);

        if(followerFromDb != null && followerFromDb.isActive()) {
            followerFromDb.setActive(false);
            followerFromDb.setTime(LocalDateTime.now());

            return this.followerRepository.save(followerFromDb) != null;
        }

        throw new CustomException(FAILURE_UNFOLLOW_USER_MESSAGE);
    }

    @Override
    public List<FollowerViewModel> getAllFollowers(String userId) throws Exception {
        User user = this.userRepository.findById(userId)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);

        List<Follower> byUserId = this.followerRepository.findByUserId(userId);

        return byUserId.stream()
                .map(follower -> this.modelMapper.map(follower, FollowerViewModel.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<FollowingViewModel> getAllFollowing(String userId) throws Exception {
        User user = this.userRepository.findById(userId)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);

        List<Follower> byUserId = this.followerRepository.findByFollowerIdAndActiveTrue(userId);

        return byUserId.stream()
                .map(follower -> this.modelMapper.map(follower, FollowingViewModel.class))
                .collect(Collectors.toList());
    }
}
