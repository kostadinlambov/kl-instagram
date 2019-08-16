package com.instagram.domain.models.serviceModels;

import com.instagram.domain.entities.Comment;
import com.instagram.domain.entities.Like;
import com.instagram.domain.entities.User;

import java.time.LocalDateTime;
import java.util.List;

public class PostServiceModel {
    private String id;
    private String content;
    private String imageUrl;
    private String location;
    private LocalDateTime time;
    private User user;
    private List<Like> likes;
    private List<Comment> comments;

    public PostServiceModel() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImageUrl() {
        return this.imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
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

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Like> getLikes() {
        return this.likes;
    }

    public void setLikes(List<Like> likes) {
        this.likes = likes;
    }

    public List<Comment> getComments() {
        return this.comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
