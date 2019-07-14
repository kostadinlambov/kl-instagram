package com.instagram.servicesImpl;

import com.instagram.repositories.PostRepository;
import com.instagram.services.PostService;
import com.instagram.validations.serviceValidation.services.PostValidationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final ModelMapper modelMapper;
    private final PostValidationService postValidation;

    @Autowired
    public PostServiceImpl(PostRepository postRepository, ModelMapper modelMapper, PostValidationService postValidation) {
        this.postRepository = postRepository;
        this.modelMapper = modelMapper;
        this.postValidation = postValidation;
    }



}
