package com.instagram.domain.models.serviceModels;

import com.instagram.domain.entities.*;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

public class UserServiceModel implements Serializable {
    private String id;
    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String profilePicUrl;
    private String bio;
    private String website;
    private boolean isDeleted;
    private boolean isOnline;
    private Set<UserRole> authorities;

    private boolean isAccountNonExpired;
    private boolean isAccountNonLocked;
    private boolean isCredentialsNonExpired;
    private boolean isEnabled;

    private List<Post> userPostList;
//    private List<Post> userTimelineAllPosts;

    private List<Comment> createdCommentsList;
    private List<Comment> userTimelineAllComments;

    private List<Like> likeList;

    private List<Follower> followedUserList;
    private List<Follower> followerList;

    public UserServiceModel() {
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

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public boolean isDeleted() {
        return this.isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public boolean isOnline() {
        return this.isOnline;
    }

    public void setOnline(boolean online) {
        isOnline = online;
    }

    public Set<UserRole> getAuthorities() {
        return this.authorities;
    }

    public void setAuthorities(Set<UserRole> authorities) {
        this.authorities = authorities;
    }

    public boolean isAccountNonExpired() {
        return this.isAccountNonExpired;
    }

    public void setAccountNonExpired(boolean accountNonExpired) {
        isAccountNonExpired = accountNonExpired;
    }

    public boolean isAccountNonLocked() {
        return this.isAccountNonLocked;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        isAccountNonLocked = accountNonLocked;
    }

    public boolean isCredentialsNonExpired() {
        return this.isCredentialsNonExpired;
    }

    public void setCredentialsNonExpired(boolean credentialsNonExpired) {
        isCredentialsNonExpired = credentialsNonExpired;
    }

    public boolean isEnabled() {
        return this.isEnabled;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }

    public String getBio() {
        return this.bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getWebsite() {
        return this.website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public List<Post> getUserPostList() {
        return this.userPostList;
    }

    public void setUserPostList(List<Post> userPostList) {
        this.userPostList = userPostList;
    }

    public List<Comment> getCreatedCommentsList() {
        return this.createdCommentsList;
    }

    public void setCreatedCommentsList(List<Comment> createdCommentsList) {
        this.createdCommentsList = createdCommentsList;
    }

    public List<Comment> getUserTimelineAllComments() {
        return this.userTimelineAllComments;
    }

    public void setUserTimelineAllComments(List<Comment> userTimelineAllComments) {
        this.userTimelineAllComments = userTimelineAllComments;
    }

    public List<Like> getLikeList() {
        return this.likeList;
    }

    public void setLikeList(List<Like> likeList) {
        this.likeList = likeList;
    }

    public List<Follower> getFollowedUserList() {
        return this.followedUserList;
    }

    public void setFollowedUserList(List<Follower> followedUserList) {
        this.followedUserList = followedUserList;
    }

    public List<Follower> getFollowerList() {
        return this.followerList;
    }

    public void setFollowerList(List<Follower> followerList) {
        this.followerList = followerList;
    }

    public String extractAuthority() {
        return this.getAuthorities()
                .stream()
                .findFirst()
                .orElse(null)
                .getAuthority();
    }
}
