package com.instagram.servicesImpl;

import com.instagram.domain.entities.Comment;
import com.instagram.domain.entities.Like;
import com.instagram.domain.entities.Post;
import com.instagram.domain.entities.User;
import com.instagram.domain.models.serviceModels.PostServiceModel;
import com.instagram.domain.models.viewModels.post.PostAllViewModel;
import com.instagram.repositories.PostRepository;
import com.instagram.repositories.UserRepository;
import com.instagram.services.CloudinaryService;
import com.instagram.services.PostService;
import com.instagram.validations.serviceValidation.services.CloudinaryValidationService;
import com.instagram.validations.serviceValidation.services.PostValidationService;
import com.instagram.validations.serviceValidation.services.UserValidationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.instagram.utils.constants.ResponseMessageConstants.SERVER_ERROR_MESSAGE;

@Service
@Transactional
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PostValidationService postValidation;
    private final UserValidationService userValidation;
    private final CloudinaryService cloudinaryService;
    private final CloudinaryValidationService cloudinaryValidation;

    @Autowired
    public PostServiceImpl(PostRepository postRepository, UserRepository userRepository, ModelMapper modelMapper, PostValidationService postValidation, UserValidationService userValidation, CloudinaryService cloudinaryService, CloudinaryValidationService cloudinaryValidation) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.postValidation = postValidation;
        this.userValidation = userValidation;
        this.cloudinaryService = cloudinaryService;
        this.cloudinaryValidation = cloudinaryValidation;
    }


    @Override
    public List<PostAllViewModel> getAll(String username) throws Exception {
        User user = this.userRepository.findByUsername(username)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);


        List<Post> posts = this.postRepository.findAllByCreatorIdOrderByTimeDesc(user.getId());

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
                .collect(Collectors.toList());

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


    @Override
    public boolean createPost(MultipartFile file, String loggedInUserId, String location, String caption) throws Exception {
        User user = this.userRepository.findById(loggedInUserId).orElse(null);

        if (!userValidation.isValid(user)) {
            throw new Exception(SERVER_ERROR_MESSAGE);
        }


        String cloudinaryPublicId = UUID.randomUUID().toString();
        Map uploadMap = this.cloudinaryService.uploadImage(file, cloudinaryPublicId);

        if (!cloudinaryValidation.isValid(uploadMap)) {
            throw new Exception(SERVER_ERROR_MESSAGE);
        }

        Post post = new Post();

        post.setImageUrl(uploadMap.get("url").toString());
        post.setCloudinaryPublicId(uploadMap.get("public_id").toString());
        post.setImageWidth(Integer.parseInt(uploadMap.get("width").toString()));
        post.setImageHeight(Integer.parseInt(uploadMap.get("height").toString()));
        post.setCreator(user);
        post.setTime(LocalDateTime.now());
        post.setCaption(caption);
        post.setLocation(location);

        return this.postRepository.save(post) != null;
    }

    // Get Post from loggedIn User. Post are ordered descending by publishing time.
    @Override
    public List<PostAllViewModel> getOnePageUserPostsByUsername(String username, int pageNumber) throws Exception {
        User user = this.userRepository.findByUsername(username)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);

        Pageable pageable = PageRequest.of(pageNumber, 3, Sort.by("time").descending());
        Page<Post> currentPage = this.postRepository.findAllByCreatorIdOrderByTimeDesc(user.getId(), pageable);
//        List<Post> posts = this.postRepository.findAllByCreatorIdOrderByTimeDesc(id, pageable);

        return this.getCurrentPagePosts(currentPage, user.getId());
    }

    // Get Posts from Users that we are following. Post are ordered descending by publishing time.
    @Override
    public List<PostAllViewModel> getOnePageFollowingPostsByUserId(String id, int pageNumber) throws Exception {
        this.userRepository.findById(id)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);

        Pageable pageable = PageRequest.of(pageNumber, 2, Sort.by("time").descending());
        Page<Post> currentPage = this.postRepository.getAllFollowingPosts(id, pageable);

        return this.getCurrentPagePosts(currentPage, id);
    }

    // Get Post from all other users( except posts from loggedIn user). Post are ordered descending by publishing time.
    @Override
    public List<PostAllViewModel> getOnePageForeignPostsByUserId(String id, int pageNumber) throws Exception {
        User user = this.userRepository.findById(id)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);

        Pageable pageable = PageRequest.of(pageNumber, 3, Sort.by("time").descending());
        Page<Post> currentPage = this.postRepository.findAllByCreatorIdNotOrderByTimeDesc(id, pageable);

        return this.getCurrentPagePosts(currentPage, id);
    }


    private List<PostAllViewModel> getCurrentPagePosts(Page<Post> currentPage, String userId) throws Exception {
        List<Post> currentPagePosts = currentPage.getContent();

        int totalPages = currentPage.getTotalPages();
        int currentPageNumber = currentPage.getPageable().getPageNumber();
        //        long totalElements = currentPage.getTotalElements();

        List<PostServiceModel> postServiceModels = currentPagePosts.stream().map(post -> this.modelMapper.map(post, PostServiceModel.class))
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
                .collect(Collectors.toList());

        List<PostAllViewModel> postAllViewModels = postServiceModels.stream().map(postServiceModel -> {
            PostAllViewModel postAllViewModel = this.modelMapper.map(postServiceModel, PostAllViewModel.class);
            postAllViewModel.setLikeCount((int) postServiceModel
                    .getLikes()
                    .stream()
                    .filter(like -> like.getLikeType().name().equals("POST") && like.isActive()).count());
            postAllViewModel.setCurrentPageNumber(currentPageNumber);
            postAllViewModel.setTotalPages(totalPages);

            Like loggedInUserLike = postServiceModel.getLikes()
                    .stream()
                    .filter(like -> like.getUser().getId()
                            .equals(userId) &&  like.isActive())
                    .findFirst()
                    .orElse(null);
            if(loggedInUserLike == null){
                postAllViewModel.setHasUserLikedPost(false);
            }else{
                postAllViewModel.setHasUserLikedPost(true);
            }

            return postAllViewModel;
        }).collect(Collectors.toList());

        return postAllViewModels;
    }
}
