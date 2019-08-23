package com.instagram.domain.models.viewModels.post;

import com.instagram.domain.entities.Comment;

import java.time.LocalDateTime;
import java.util.List;

public class PostAllViewModel {
    private String id;
    private String caption;
    private String imageUrl;
    private Integer imageWidth;
    private Integer imageHeight;
    private String location;
    private LocalDateTime time;
    private String creatorId;
    private String creatorUsername;
    private String creatorFirstName;
    private String creatorLastName;
    private String creatorProfilePicUrl;
    private Integer creatorImageWidth;
    private Integer creatorImageHeight;
    private int likeCount;
    private List<Comment> comments;

    private int totalPages;
    private int currentPageNumber;

    public PostAllViewModel() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCaption() {
        return this.caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getImageUrl() {
        return this.imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getImageWidth() {
        return this.imageWidth;
    }

    public void setImageWidth(Integer imageWidth) {
        this.imageWidth = imageWidth;
    }

    public Integer getImageHeight() {
        return this.imageHeight;
    }

    public void setImageHeight(Integer imageHeight) {
        this.imageHeight = imageHeight;
    }

    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getTime() {
        return this.time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
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

    public String getCreatorFirstName() {
        return this.creatorFirstName;
    }

    public void setCreatorFirstName(String creatorFirstName) {
        this.creatorFirstName = creatorFirstName;
    }

    public String getCreatorLastName() {
        return this.creatorLastName;
    }

    public void setCreatorLastName(String creatorLastName) {
        this.creatorLastName = creatorLastName;
    }

    public String getCreatorProfilePicUrl() {
        return this.creatorProfilePicUrl;
    }

    public void setCreatorProfilePicUrl(String creatorProfilePicUrl) {
        this.creatorProfilePicUrl = creatorProfilePicUrl;
    }

    public int getLikeCount() {
        return this.likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    public int getTotalPages() {
        return this.totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public int getCurrentPageNumber() {
        return this.currentPageNumber;
    }

    public void setCurrentPageNumber(int currentPageNumber) {
        this.currentPageNumber = currentPageNumber;
    }

    public List<Comment> getComments() {
        return this.comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
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
}
