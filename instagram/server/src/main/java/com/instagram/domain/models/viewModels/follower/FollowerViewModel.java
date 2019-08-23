package com.instagram.domain.models.viewModels.follower;

import java.time.LocalDateTime;

public class FollowerViewModel {
    private String id;
    private String followerId;
    private String followerUsername;
    private String followerFirstName;
    private String followerLastName;
    private String followerProfilePicUrl;
    private Integer followerProfilePicWidth;
    private Integer followerProfilePicHeight;
    private Boolean isActive;
    private LocalDateTime time;

    public FollowerViewModel() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFollowerId() {
        return this.followerId;
    }

    public void setFollowerId(String followerId) {
        this.followerId = followerId;
    }

    public String getFollowerUsername() {
        return this.followerUsername;
    }

    public void setFollowerUsername(String followerUsername) {
        this.followerUsername = followerUsername;
    }

    public String getFollowerFirstName() {
        return this.followerFirstName;
    }

    public void setFollowerFirstName(String followerFirstName) {
        this.followerFirstName = followerFirstName;
    }

    public String getFollowerLastName() {
        return this.followerLastName;
    }

    public void setFollowerLastName(String followerLastName) {
        this.followerLastName = followerLastName;
    }

    public String getFollowerProfilePicUrl() {
        return this.followerProfilePicUrl;
    }

    public void setFollowerProfilePicUrl(String followerProfilePicUrl) {
        this.followerProfilePicUrl = followerProfilePicUrl;
    }

    public Integer getFollowerProfilePicWidth() {
        return this.followerProfilePicWidth;
    }

    public void setFollowerProfilePicWidth(Integer followerProfilePicWidth) {
        this.followerProfilePicWidth = followerProfilePicWidth;
    }

    public Integer getFollowerProfilePicHeight() {
        return this.followerProfilePicHeight;
    }

    public void setFollowerProfilePicHeight(Integer followerProfilePicHeight) {
        this.followerProfilePicHeight = followerProfilePicHeight;
    }

    public Boolean getActive() {
        return this.isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public LocalDateTime getTime() {
        return this.time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }
}
