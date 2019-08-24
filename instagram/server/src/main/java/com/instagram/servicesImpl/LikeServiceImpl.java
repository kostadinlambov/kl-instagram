package com.instagram.servicesImpl;


import com.instagram.domain.entities.Like;
import com.instagram.domain.entities.LikeType;
import com.instagram.domain.entities.Post;
import com.instagram.domain.entities.User;
import com.instagram.repositories.LikeRepository;
import com.instagram.repositories.PostRepository;
import com.instagram.repositories.UserRepository;
import com.instagram.services.LikeService;
import com.instagram.utils.responseHandler.exceptions.CustomException;
import com.instagram.validations.serviceValidation.services.PostValidationService;
import com.instagram.validations.serviceValidation.services.UserValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static com.instagram.utils.constants.ResponseMessageConstants.FAILURE_POST_LIKE_MESSAGE;
import static com.instagram.utils.constants.ResponseMessageConstants.SERVER_ERROR_MESSAGE;


@Service
@Transactional
public class LikeServiceImpl implements LikeService {
    private final LikeRepository likeRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final UserValidationService userValidation;
    private final PostValidationService postValidation;

    @Autowired
    public LikeServiceImpl(LikeRepository likeRepository, PostRepository postRepository, UserRepository userRepository, UserValidationService userValidation, PostValidationService postValidation) {
        this.likeRepository = likeRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.userValidation = userValidation;
        this.postValidation = postValidation;
    }

    @Override
    public String changeLikePost(String postId, String loggedInUserId) throws Exception {
        Post post = this.postRepository.findById(postId).orElse(null);
        User user = this.userRepository.findById(loggedInUserId).orElse(null);

        if (!postValidation.isValid(post) || !userValidation.isValid(user)) {
            throw new Exception(SERVER_ERROR_MESSAGE);
        }

        Like likeByUserAndPost = this.likeRepository.findByUserAndPost(user, post);

        if (likeByUserAndPost == null) {
            Like like = new Like();
            like.setUser(user);
            like.setPost(post);
            like.setActive(true);
            like.setLikeType(LikeType.POST);
            like.setTime(LocalDateTime.now());

            this.likeRepository.save(like);
            return "add";
        } else if(likeByUserAndPost.isActive()) {
//            this.likeRepository.delete(likeByUserAndPost);
            likeByUserAndPost.setActive(false);
            return "subtract";
        }else{
            likeByUserAndPost.setActive(true);
            return "add";
        }

//        throw new CustomException(FAILURE_POST_LIKE_MESSAGE);

    }
}
