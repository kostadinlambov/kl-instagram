package com.instagram.domain.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
//@Table(name = "likes")
@Table(name = "likes", uniqueConstraints = {@UniqueConstraint(columnNames = {"id"})})
public class Like extends BaseEntity {
    private User user;
    private boolean active;
    private LocalDateTime time;
    private Post post;
    private Comment comment;
    private LikeType likeType = LikeType.POST;

    public Like() {
    }

    @ManyToOne(targetEntity = User.class, optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonBackReference
    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Column(name = "is_active", nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
    public boolean isActive() {
        return this.active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    @Column(name = "time", nullable = false)
    public LocalDateTime getTime() {
        return this.time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    @ManyToOne(targetEntity = Post.class)
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    @JsonBackReference
    public Post getPost() {
        return this.post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    @ManyToOne(targetEntity = Comment.class)
    @JoinColumn(name = "comment_id", referencedColumnName = "id")
    @JsonBackReference
    public Comment getComment() {
        return this.comment;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "like_type", columnDefinition = "ENUM('POST','COMMENT') default 'POST'", nullable = false)
    public LikeType getLikeType() {
        return this.likeType;
    }

    public void setLikeType(LikeType likeType) {
        this.likeType = likeType;
    }
}
