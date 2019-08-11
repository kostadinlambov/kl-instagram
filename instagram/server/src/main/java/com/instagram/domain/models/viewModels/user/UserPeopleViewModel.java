package com.instagram.domain.models.viewModels.user;

public class UserPeopleViewModel {
    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String profilePicUrl;
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

    public Boolean isActive() {
        return this.isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }
}
