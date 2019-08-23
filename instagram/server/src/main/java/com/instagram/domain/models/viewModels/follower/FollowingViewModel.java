package com.instagram.domain.models.viewModels.follower;

import java.time.LocalDateTime;

public class FollowingViewModel {
    private String id;
    private String userId;
    private String userUsername;
    private String userFirstName;
    private String userLastName;
    private String userProfilePicUrl;
    private Integer userProfilePicWidth;
    private Integer userProfilePicHeight;
    private Boolean isActive;
    private LocalDateTime time;

    public FollowingViewModel() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserUsername() {
        return this.userUsername;
    }

    public void setUserUsername(String userUsername) {
        this.userUsername = userUsername;
    }

    public String getUserFirstName() {
        return this.userFirstName;
    }

    public void setUserFirstName(String userFirstName) {
        this.userFirstName = userFirstName;
    }

    public String getUserLastName() {
        return this.userLastName;
    }

    public void setUserLastName(String userLastName) {
        this.userLastName = userLastName;
    }

    public String getUserProfilePicUrl() {
        return this.userProfilePicUrl;
    }

    public void setUserProfilePicUrl(String userProfilePicUrl) {
        this.userProfilePicUrl = userProfilePicUrl;
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
