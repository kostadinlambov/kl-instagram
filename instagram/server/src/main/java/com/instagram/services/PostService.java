package com.instagram.services;

import com.instagram.domain.models.viewModels.post.PostAllViewModel;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostService {
    List<PostAllViewModel> getAll(String id) throws Exception;

    boolean createPost(MultipartFile file, String loggedInUserId, String location, String caption) throws Exception;
}
