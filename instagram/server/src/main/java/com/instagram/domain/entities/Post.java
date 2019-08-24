package com.instagram.domain.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
//@Table(name = "posts")
@Table(name = "posts", uniqueConstraints = {@UniqueConstraint(columnNames = {"id"})})
public class Post extends BaseEntity {
    private String caption;
    private String imageUrl;
    private Integer imageWidth;
    private Integer imageHeight;
    private String location;
    private LocalDateTime time;
    private User creator;
//    private User timelineUser;
    private String cloudinaryPublicId;
    private List<Like> likes;
    private List<Comment> comments;

    public Post() {
    }

    @Column(name = "caption", nullable = false, columnDefinition = "TEXT")
    public String getCaption() {
        return this.caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }


    @Column(name = "image_url", nullable = false)
    public String getImageUrl() {
        return this.imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Column(name = "image_width")
    public Integer getImageWidth() {
        return this.imageWidth;
    }
    public void setImageWidth(Integer imageWidth) {
        this.imageWidth = imageWidth;
    }

    @Column(name = "image_height")
    public Integer getImageHeight() {
        return this.imageHeight;
    }

    public void setImageHeight(Integer imageHeight) {
        this.imageHeight = imageHeight;
    }

    @Column(name = "location")
    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Column(name = "time", nullable = false)
    public LocalDateTime getTime() {
        return this.time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    @ManyToOne(targetEntity = User.class, optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    public User getCreator() {
        return this.creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

//    @ManyToOne(targetEntity = User.class, optional = false)
//    @JoinColumn(name = "timeline_user_id", referencedColumnName = "id")
//    public User getTimelineUser() {
//        return this.timelineUser;
//    }
//
//    public void setTimelineUser(User timelineUser) {
//        this.timelineUser = timelineUser;
//    }

    @OneToMany(mappedBy = "post", targetEntity = Like.class, cascade = CascadeType.ALL)
    @JsonManagedReference
    public List<Like> getLikes() {
        return this.likes;
    }

    public void setLikes(List<Like> likes) {
        this.likes = likes;
    }

    @OneToMany(mappedBy = "post", targetEntity = Comment.class, cascade = CascadeType.ALL)
    @JsonManagedReference
    public List<Comment> getComments() {
        return this.comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    @Column(name = "cloudinary_public_id")
    public String getCloudinaryPublicId() {
        return this.cloudinaryPublicId;
    }

    public void setCloudinaryPublicId(String cloudinaryPublicId) {
        this.cloudinaryPublicId = cloudinaryPublicId;
    }
}
