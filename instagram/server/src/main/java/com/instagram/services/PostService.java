package com.instagram.services;

import com.instagram.domain.models.viewModels.post.PostAllViewModel;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostService {
    List<PostAllViewModel> getAll(String username) throws Exception;

    boolean createPost(MultipartFile file, String loggedInUserId, String location, String caption) throws Exception;

//    List<PostAllViewModel> getAllById(String id) throws Exception;

//    List<PostAllViewModel> getAllById(String id, int pageNumber) throws Exception;

    List<PostAllViewModel> getOnePageForeignPostsByUserId(String id, int pageNumber) throws Exception;

    List<PostAllViewModel> getOnePageUserPostsByUsername(String username, int pageNumber) throws Exception;

    List<PostAllViewModel> getOnePageFollowingPostsByUserId(String id, int pageNumber) throws Exception;

    PostAllViewModel getPostDetails(String postId, String loggedInUserId) throws Exception;
}
