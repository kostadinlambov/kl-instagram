package com.instagram.services;

import com.instagram.domain.models.viewModels.post.PostAllViewModel;

import java.util.List;

public interface PostService {
    List<PostAllViewModel> getAll(String id) throws Exception;
}
