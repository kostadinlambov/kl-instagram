package com.instagram.domain.entities;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "comments")
public class Comment extends BaseEntity{
    private Post post;
    private User creator;
    private User receiver;
    private String content;
    private LocalDateTime time;
    private List<Like> likes;

    public Comment() {
    }

    @Column(name = "content",nullable = false, columnDefinition = "TEXT")
    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Column(name = "time",nullable = false)
    public LocalDateTime getTime() {
        return this.time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    @ManyToOne(optional = false, targetEntity = Post.class)
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    public Post getPost() {
        return this.post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    @ManyToOne(optional = false, targetEntity = User.class)
    @JoinColumn(name = "creator_id", referencedColumnName = "id")
    public User getCreator() {
        return this.creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    @OneToOne(optional = false, targetEntity = User.class)
    @JoinColumn(name = "receiver", referencedColumnName = "id")
    public User getReceiver() {
        return this.receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    @OneToMany(targetEntity = Like.class, mappedBy = "comment", cascade = CascadeType.ALL)
    public List<Like> getLikes() {
        return this.likes;
    }

    public void setLikes(List<Like> likes) {
        this.likes = likes;
    }
}
