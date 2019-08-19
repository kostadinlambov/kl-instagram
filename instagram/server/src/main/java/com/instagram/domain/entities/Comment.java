package com.instagram.domain.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
//@Table(name = "comments")
@Table(name = "comments", uniqueConstraints = {@UniqueConstraint(columnNames = {"id"})})
public class Comment extends BaseEntity{
    private Post post;
    private User creator;
    private User timelineUser;
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
    @JsonBackReference
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

    @ManyToOne(optional = false, targetEntity = User.class)
    @JoinColumn(name = "timeline_user_id", referencedColumnName = "id")
    public User getTimelineUser() {
        return this.timelineUser;
    }

    public void setTimelineUser(User timelineUser) {
        this.timelineUser = timelineUser;
    }

    //    @OneToOne(optional = false, targetEntity = User.class)
//    @JoinColumn(name = "receiver", referencedColumnName = "id")
//    public User getReceiver() {
//        return this.receiver;
//    }
//
//    public void setReceiver(User receiver) {
//        this.receiver = receiver;
//    }

    @OneToMany(targetEntity = Like.class, mappedBy = "comment", cascade = CascadeType.ALL)
    @JsonManagedReference
    public List<Like> getLikes() {
        return this.likes;
    }

    public void setLikes(List<Like> likes) {
        this.likes = likes;
    }
}
