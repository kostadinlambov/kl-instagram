package com.instagram.domain.models.bindingModels.comment;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class CommentCreateBindingModel {
    private String postId;
    private String loggedInUserId;
    private String content;

    @NotNull
    @NotEmpty
    public String getPostId() {
        return this.postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    @NotNull
    @NotEmpty
    public String getLoggedInUserId() {
        return this.loggedInUserId;
    }

    public void setLoggedInUserId(String loggedInUserId) {
        this.loggedInUserId = loggedInUserId;
    }

    @NotNull
    @NotEmpty
    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
