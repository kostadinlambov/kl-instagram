package com.instagram.domain.models.viewModels.comment;

import java.time.LocalDateTime;

public class CommentViewModel {
    private String id;
    private String postId;
    private String content;
    private String creatorId;
    private String creatorUsername;
    private String creatorProfilePicUrl;
    private Integer creatorImageWidth;
    private Integer creatorImageHeight;
    private LocalDateTime time;

    private int likeCount;
    private boolean hasUserLikedComment;

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPostId() {
        return this.postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCreatorId() {
        return this.creatorId;
    }

    public void setCreatorId(String creatorId) {
        this.creatorId = creatorId;
    }

    public String getCreatorUsername() {
        return this.creatorUsername;
    }

    public void setCreatorUsername(String creatorUsername) {
        this.creatorUsername = creatorUsername;
    }

    public String getCreatorProfilePicUrl() {
        return this.creatorProfilePicUrl;
    }

    public void setCreatorProfilePicUrl(String creatorProfilePicUrl) {
        this.creatorProfilePicUrl = creatorProfilePicUrl;
    }

    public Integer getCreatorImageWidth() {
        return this.creatorImageWidth;
    }

    public void setCreatorImageWidth(Integer creatorImageWidth) {
        this.creatorImageWidth = creatorImageWidth;
    }

    public Integer getCreatorImageHeight() {
        return this.creatorImageHeight;
    }

    public void setCreatorImageHeight(Integer creatorImageHeight) {
        this.creatorImageHeight = creatorImageHeight;
    }

    public LocalDateTime getTime() {
        return this.time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public int getLikeCount() {
        return this.likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    public boolean isHasUserLikedComment() {
        return this.hasUserLikedComment;
    }

    public void setHasUserLikedComment(boolean hasUserLikedComment) {
        this.hasUserLikedComment = hasUserLikedComment;
    }
}
