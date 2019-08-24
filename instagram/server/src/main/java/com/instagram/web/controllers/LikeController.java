package com.instagram.web.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.instagram.services.LikeService;
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

import static com.instagram.utils.constants.ResponseMessageConstants.SUCCESSFUL_DISLIKE_POST_MESSAGE;
import static com.instagram.utils.constants.ResponseMessageConstants.SUCCESSFUL_LIKE_POST_MESSAGE;

@RestController
@RequestMapping(value = "/like")
public class LikeController {
    private final LikeService likeService;
    private final ObjectMapper objectMapper;

    @Autowired
    public LikeController(LikeService likeService, ObjectMapper objectMapper) {
        this.likeService = likeService;
        this.objectMapper = objectMapper;
    }

    @PostMapping(value = "/changePostLike")
    public ResponseEntity addLike(@RequestBody Map<String, Object> body) throws Exception {
        String postId = (String) body.get("postId");
        String loggedInUserId = (String) body.get("userId");

        String result = this.likeService.changeLikePost(postId, loggedInUserId);

        String message = "";
        if ("add".equals(result)) {
            message = SUCCESSFUL_LIKE_POST_MESSAGE;
        }else{
            message = SUCCESSFUL_DISLIKE_POST_MESSAGE;
        }

        SuccessResponse successResponse = new SuccessResponse(LocalDateTime.now(), message, result, true);
        return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
    }
}
