package com.instagram.web.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.instagram.services.FollowerService;
import com.instagram.utils.responseHandler.exceptions.CustomException;
import com.instagram.utils.responseHandler.successResponse.SuccessResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
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
}
