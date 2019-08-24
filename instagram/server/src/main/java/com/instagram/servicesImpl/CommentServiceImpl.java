package com.instagram.servicesImpl;

import com.instagram.domain.entities.Comment;
import com.instagram.domain.entities.Post;
import com.instagram.domain.entities.User;
import com.instagram.domain.models.bindingModels.comment.CommentCreateBindingModel;
import com.instagram.domain.models.serviceModels.CommentServiceModel;
import com.instagram.domain.models.viewModels.comment.CommentViewModel;
import com.instagram.domain.models.viewModels.post.PostAllViewModel;
import com.instagram.repositories.CommentRepository;
import com.instagram.repositories.PostRepository;
import com.instagram.repositories.UserRepository;
import com.instagram.services.CommentService;
import com.instagram.validations.serviceValidation.services.CommentValidationService;
import com.instagram.validations.serviceValidation.services.PostValidationService;
import com.instagram.validations.serviceValidation.services.UserValidationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import static com.instagram.utils.constants.ResponseMessageConstants.SERVER_ERROR_MESSAGE;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final ModelMapper modelMapper;
    private final CommentValidationService commentValidation;
    private final UserValidationService userValidation;
    private final PostValidationService postValidation;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, ModelMapper modelMapper, CommentValidationService commentValidation, UserValidationService userValidation, PostValidationService postValidation, UserRepository userRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.modelMapper = modelMapper;
        this.commentValidation = commentValidation;
        this.userValidation = userValidation;
        this.postValidation = postValidation;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    @Override
    public CommentViewModel createComment(CommentCreateBindingModel commentCreateBindingModel) throws Exception {
        if (!commentValidation.isValid(commentCreateBindingModel)) {
            throw new Exception(SERVER_ERROR_MESSAGE);
        }

        User creator = this.userRepository
                .findById(commentCreateBindingModel.getLoggedInUserId())
                .orElse(null);

        Post post = this.postRepository
                .findById(commentCreateBindingModel.getPostId())
                .orElse(null);

        if (!userValidation.isValid(creator) || !postValidation.isValid(post)) {
            throw new Exception(SERVER_ERROR_MESSAGE);
        }

        CommentServiceModel commentServiceModel = new CommentServiceModel();
        commentServiceModel.setPost(post);
        commentServiceModel.setCreator(creator);
        commentServiceModel.setContent(commentCreateBindingModel.getContent());
        commentServiceModel.setTime(LocalDateTime.now());

        Comment comment = this.modelMapper.map(commentServiceModel, Comment.class);

        Comment savedComment = this.commentRepository.save(comment);

        CommentViewModel commentViewModel = this.modelMapper.map(savedComment, CommentViewModel.class);
        commentViewModel.setLikeCount(0);
        commentViewModel.setHasUserLikedComment(false);

        return commentViewModel;
    }

    @Override
    public CommentViewModel getLastByPostId(String postId) {
        List<Comment> commentByPostIdOrderByTimeDesc = this.commentRepository.getCommentByPostIdOrderByTimeDesc(postId);

        Comment comment = commentByPostIdOrderByTimeDesc.stream().findFirst().orElse(null);

        if(comment != null){
            return this.modelMapper.map(comment, CommentViewModel.class);
        }

        return null;
    }
}
