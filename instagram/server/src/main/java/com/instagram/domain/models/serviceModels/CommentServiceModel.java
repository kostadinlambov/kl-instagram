package com.instagram.domain.models.serviceModels;

import com.instagram.domain.entities.Like;
import com.instagram.domain.entities.Post;
import com.instagram.domain.entities.User;

import java.time.LocalDateTime;
import java.util.List;

public class CommentServiceModel {
    private String id;
    private Post post;
    private User creator;
    //    private User timelineUser;
    private String content;
    private LocalDateTime time;
    private List<Like> likes;

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Post getPost() {
        return this.post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public User getCreator() {
        return this.creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTime() {
        return this.time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public List<Like> getLikes() {
        return this.likes;
    }

    public void setLikes(List<Like> likes) {
        this.likes = likes;
    }
}
