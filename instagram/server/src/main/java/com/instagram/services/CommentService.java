package com.instagram.services;

import com.instagram.domain.models.bindingModels.comment.CommentCreateBindingModel;
import com.instagram.domain.models.viewModels.comment.CommentViewModel;
import com.instagram.domain.models.viewModels.post.PostAllViewModel;

import java.util.List;

public interface CommentService {
    CommentViewModel createComment(CommentCreateBindingModel commentCreateBindingModel) throws Exception;

    CommentViewModel getLastByPostId(String postId);
}
