package com.instagram.servicesImpl;

import com.instagram.domain.entities.Comment;
import com.instagram.domain.entities.Post;
import com.instagram.domain.entities.User;
import com.instagram.domain.models.serviceModels.PostServiceModel;
import com.instagram.domain.models.viewModels.post.PostAllViewModel;
import com.instagram.repositories.PostRepository;
import com.instagram.repositories.UserRepository;
import com.instagram.services.PostService;
import com.instagram.validations.serviceValidation.services.PostValidationService;
import com.instagram.validations.serviceValidation.services.UserValidationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PostValidationService postValidation;
    private final UserValidationService userValidation;

    @Autowired
    public PostServiceImpl(PostRepository postRepository, UserRepository userRepository, ModelMapper modelMapper, PostValidationService postValidation, UserValidationService userValidation) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.postValidation = postValidation;
        this.userValidation = userValidation;
    }


    @Override
    public List<PostAllViewModel> getAll(String id) throws Exception {
        User user = this.userRepository.findById(id)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);


        List<Post> posts = this.postRepository.findAllByUserIdOrderByTimeDesc(id);

        List<PostServiceModel> postServiceModels = posts.stream().map(post -> this.modelMapper.map(post, PostServiceModel.class))
                .peek(postServiceModel -> {
                    List<Comment> commentList = postServiceModel.getComments()
                            .stream().sorted((comment1, comment2) -> {
                                if (comment1.getTime().isAfter(comment2.getTime())) {
                                    return 1;
                                } else if (comment1.getTime().isBefore(comment2.getTime())) {
                                    return -1;
                                }
                                return 0;
                            }).collect(Collectors.toList());
                    postServiceModel.setComments(commentList);
                })
                . collect(Collectors.toList());

        List<PostAllViewModel> postAllViewModels = postServiceModels.stream().map(postServiceModel -> {
            PostAllViewModel postAllViewModel = this.modelMapper.map(postServiceModel, PostAllViewModel.class);
            postAllViewModel.setLikeCount((int) postServiceModel
                    .getLikes()
                    .stream()
                    .filter(like -> like.getLikeType().name().equals("POST")).count());
            return postAllViewModel;
        }).collect(Collectors.toList());

        return postAllViewModels;
    }
}
