package com.instagram.web.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.instagram.domain.models.bindingModels.comment.CommentCreateBindingModel;
import com.instagram.domain.models.viewModels.comment.CommentViewModel;
import com.instagram.domain.models.viewModels.post.PostAllViewModel;
import com.instagram.services.CommentService;
import com.instagram.services.LikeService;
import com.instagram.utils.responseHandler.exceptions.CustomException;
import com.instagram.utils.responseHandler.successResponse.SuccessResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;

import static com.instagram.utils.constants.ResponseMessageConstants.*;

@RestController
@RequestMapping(value = "/comment")
public class CommentController {
    private final CommentService commentService;
    private final ObjectMapper objectMapper;

    @Autowired
    public CommentController( CommentService commentService, ObjectMapper objectMapper) {
        this.commentService = commentService;
        this.objectMapper = objectMapper;
    }

    @PostMapping(value = "/create")
    public ResponseEntity<Object> createComment(@RequestBody @Valid CommentCreateBindingModel commentCreateBindingModel) throws Exception {
        CommentViewModel comment = this.commentService.createComment(commentCreateBindingModel);
        if (comment != null) {
            SuccessResponse successResponse = new SuccessResponse(LocalDateTime.now(), SUCCESSFUL_CREATE_COMMENT_MESSAGE, comment, true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }
        throw new CustomException(SERVER_ERROR_MESSAGE);
    }

    @GetMapping(value = "/last/{postId}")
    public ResponseEntity<Object> getLastByPostId(@PathVariable(value = "postId") String postId) throws Exception {

        CommentViewModel lastComment = this.commentService.getLastByPostId(postId);

        if (lastComment != null) {
            SuccessResponse successResponse = new SuccessResponse(LocalDateTime.now(), SUCCESSFUL_GET_LAST_COMMENT_MESSAGE, lastComment, true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }else{
            SuccessResponse successResponse = new SuccessResponse(LocalDateTime.now(), FAILURE_GET_LAST_COMMENT_MESSAGE, "", true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }

    }
}
