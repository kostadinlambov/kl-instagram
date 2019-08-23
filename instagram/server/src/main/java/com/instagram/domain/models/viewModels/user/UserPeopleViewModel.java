package com.instagram.domain.models.viewModels.user;

public class UserPeopleViewModel {
    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String profilePicUrl;
    private Integer profilePicWidth;
    private Integer profilePicHeight;
    private Boolean isActive;

    public UserPeopleViewModel() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getProfilePicUrl() {
        return this.profilePicUrl;
    }

    public void setProfilePicUrl(String profilePicUrl) {
        this.profilePicUrl = profilePicUrl;
    }

    public Boolean getActive() {
        return this.isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public Integer getProfilePicWidth() {
        return this.profilePicWidth;
    }

    public void setProfilePicWidth(Integer profilePicWidth) {
        this.profilePicWidth = profilePicWidth;
    }

    public Integer getProfilePicHeight() {
        return this.profilePicHeight;
    }

    public void setProfilePicHeight(Integer profilePicHeight) {
        this.profilePicHeight = profilePicHeight;
    }

    //    public Boolean isActive() {
//        return this.isActive;
//    }

}
