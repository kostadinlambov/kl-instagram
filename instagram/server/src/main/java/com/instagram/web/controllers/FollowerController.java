package com.instagram.web.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.instagram.domain.models.viewModels.follower.FollowerViewModel;
import com.instagram.domain.models.viewModels.follower.FollowingViewModel;
import com.instagram.domain.models.viewModels.user.UserPeopleViewModel;
import com.instagram.services.FollowerService;
import com.instagram.utils.responseHandler.exceptions.CustomException;
import com.instagram.utils.responseHandler.successResponse.SuccessResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import static com.instagram.utils.constants.ResponseMessageConstants.*;

@RestController
@RequestMapping(value = "/follower")
public class FollowerController {
    private final FollowerService followerService;
    private final ObjectMapper objectMapper;


    @Autowired
    public FollowerController(FollowerService followerService, ObjectMapper objectMapper) {
        this.followerService = followerService;
        this.objectMapper = objectMapper;
    }


    @PostMapping(value = "/follow")
    public ResponseEntity followUser(@RequestBody Map<String, Object> body) throws Exception {
        String loggedInUserId = (String) body.get("loggedInUserId");
        String userToFollowId = (String) body.get("userToFollowId");

        boolean result = this.followerService.follow(loggedInUserId, userToFollowId);

        if(result){
            SuccessResponse successResponse = new SuccessResponse(LocalDateTime.now(), SUCCESSFUL_FOLLOW_USER_REQUEST_MESSAGE, "", true);

            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }

        throw new CustomException(FAILURE_FOLLOW_USER_MESSAGE);
    }

    @PostMapping(value = "/unFollow")
    public ResponseEntity unFollowUser(@RequestBody Map<String, Object> body) throws Exception {
        String loggedInUserId = (String) body.get("loggedInUserId");
        String userToUnFollowId = (String) body.get("userToUnFollowId");

        boolean result = this.followerService.unFollow(loggedInUserId, userToUnFollowId);

        if(result){
            SuccessResponse successResponse = new SuccessResponse(LocalDateTime.now(), SUCCESSFUL_UNFOLLOW_USER_REQUEST_MESSAGE, "", true);

            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }

        throw new CustomException(FAILURE_UNFOLLOW_USER_MESSAGE);
    }

    @GetMapping(value = "/getFollowers/{username}")
    public List<FollowerViewModel> getAllFollowers(@PathVariable(value = "username") String username) throws Exception {
        List<FollowerViewModel> allFollowers = this.followerService.getAllFollowers(username);

        return allFollowers;
    }

    @GetMapping(value = "/getFollowing/{username}")
    public List<FollowingViewModel> getAllFollowing(@PathVariable(value = "username") String username) throws Exception {
        List<FollowingViewModel> allFollowing = this.followerService.getAllFollowing(username);

        return allFollowing;
    }


}
