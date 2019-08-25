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

import static com.instagram.utils.constants.ResponseMessageConstants.*;

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
        return this.postService.getAll(username);
    }

    @GetMapping(value = "/all/{username}/{pageNumber}")
    public List<PostAllViewModel> getAllUserPosts(@PathVariable(value = "username") String username, @PathVariable(value = "pageNumber") int pageNumber) throws Exception {
        return this.postService.getOnePageUserPostsByUsername(username, pageNumber);
    }

    @GetMapping(value = "/notMy/{id}/{pageNumber}")
    public List<PostAllViewModel> getAllForeignPosts(@PathVariable(value = "id") String id, @PathVariable(value = "pageNumber") int pageNumber) throws Exception {
        return this.postService.getOnePageForeignPostsByUserId(id, pageNumber);
    }

    @GetMapping(value = "/following/{id}/{pageNumber}")
    public List<PostAllViewModel> getAllFollowingPosts(@PathVariable(value = "id") String id, @PathVariable(value = "pageNumber") int pageNumber) throws Exception {
        return this.postService.getOnePageFollowingPostsByUserId(id, pageNumber);
    }

    @GetMapping(value = "/details/{postId}/{loggedInUserId}")
    public ResponseEntity getPostDetails(@PathVariable(value = "postId") String postId, @PathVariable(value = "loggedInUserId") String loggedInUserId ) throws Exception {

        PostAllViewModel postViewModel = this.postService.getPostDetails(postId, loggedInUserId);

        if(postViewModel != null){
            SuccessResponse successResponse =
                    new SuccessResponse(LocalDateTime.now(), SUCCESSFUL_FETCH_POST_MESSAGE, postViewModel, true);

            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }

        throw new CustomException(SERVER_ERROR_MESSAGE);
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
