package com.instagram.web.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.instagram.domain.models.viewModels.post.PostAllViewModel;
import com.instagram.services.PostService;
import com.instagram.utils.constants.ResponseMessageConstants;
import com.instagram.utils.responseHandler.exceptions.CustomException;
import com.instagram.utils.responseHandler.successResponse.SuccessResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

import static com.instagram.utils.constants.ResponseMessageConstants.SUCCESSFUL_CREATE_POST_MESSAGE;

@RestController
@RequestMapping(value = "/post")
public class PostController {
    private final PostService postService;
    private final ModelMapper modelMapper;
    private final ObjectMapper objectMapper;

    @Autowired
    public PostController(PostService postService, ModelMapper modelMapper, ObjectMapper objectMapper) {
        this.postService = postService;
        this.modelMapper = modelMapper;
        this.objectMapper = objectMapper;
    }


    @GetMapping(value = "/all/{username}")
    public List<PostAllViewModel> getAllPosts(@PathVariable(value = "username") String username) throws Exception {

        List<PostAllViewModel> postAllViewModels = this.postService.getAll(username);

        System.out.println();

        return postAllViewModels;
    }

    @PostMapping(value = "/create")
    public ResponseEntity createPost(
            @RequestParam(name = "loggedInUserId") String loggedInUserId,
            @RequestParam(name = "caption") String caption,
            @RequestParam(name = "location") String location,
            @RequestParam(name = "file") MultipartFile file) throws Exception {

        boolean result = this.postService.createPost(file, loggedInUserId,location, caption);

        if (result) {
            SuccessResponse successResponse = new SuccessResponse(LocalDateTime.now(), SUCCESSFUL_CREATE_POST_MESSAGE, "", true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }

        throw new CustomException(ResponseMessageConstants.SERVER_ERROR_MESSAGE);

    }
}
