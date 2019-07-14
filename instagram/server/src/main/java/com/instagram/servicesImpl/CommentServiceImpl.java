package com.instagram.servicesImpl;

import com.instagram.repositories.CommentRepository;
import com.instagram.services.CommentService;
import com.instagram.validations.serviceValidation.services.CommentValidationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final ModelMapper modelMapper;
    private final CommentValidationService commentValidation;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, ModelMapper modelMapper, CommentValidationService commentValidation) {
        this.commentRepository = commentRepository;
        this.modelMapper = modelMapper;
        this.commentValidation = commentValidation;
    }
}
