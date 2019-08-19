package com.instagram.domain.entities;

import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
public class User extends BaseEntity implements UserDetails {
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

    public User() {
        this.authorities = new HashSet<>();
    }

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    public List<Follower> getFollowedUserList() {
        return this.followedUserList;
    }

    public void setFollowedUserList(List<Follower> followedUserList) {
        this.followedUserList = followedUserList;
    }

    @OneToMany(mappedBy = "follower", cascade = CascadeType.ALL)
    public List<Follower> getFollowerList() {
        return this.followerList;
    }

    public void setFollowerList(List<Follower> followerList) {
        this.followerList = followerList;
    }

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    public List<Like> getLikeList() {
        return this.likeList;
    }

    public void setLikeList(List<Like> likeList) {
        this.likeList = likeList;
    }

    @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL)
    public List<Post> getUserPostList() {
        return this.userPostList;
    }

    public void setUserPostList(List<Post> userPostList) {
        this.userPostList = userPostList;
    }

//    @OneToMany(mappedBy = "timelineUser", cascade = CascadeType.ALL)
//    public List<Post> getUserTimelineAllPosts() {
//        return this.userTimelineAllPosts;
//    }
//
//    public void setUserTimelineAllPosts(List<Post> userTimelineAllPosts) {
//        this.userTimelineAllPosts = userTimelineAllPosts;
//    }

    @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL)
    public List<Comment> getCreatedCommentsList() {
        return this.createdCommentsList;
    }

    public void setCreatedCommentsList(List<Comment> createdCommentsList) {
        this.createdCommentsList = createdCommentsList;
    }

    @OneToMany(mappedBy = "timelineUser", cascade = CascadeType.ALL)
    public List<Comment> getUserTimelineAllComments() {
        return this.userTimelineAllComments;
    }

    public void setUserTimelineAllComments(List<Comment> userTimelineAllComments) {
        this.userTimelineAllComments = userTimelineAllComments;
    }

    @Override
    @Column(name = "username", nullable = false, unique = true, columnDefinition = "VARCHAR(50) BINARY")
    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Column(name = "email", nullable = false, unique = true, columnDefinition = "VARCHAR(50) BINARY")
    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    @Column(name = "password", nullable = false)
    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Column(name = "first_name", nullable = false)
    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Column(name = "last_name", nullable = false)
    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Column(name = "profile_pic_url", columnDefinition = "TEXT")
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

    @Column(name = "is_online", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    public boolean isOnline() {
        return this.isOnline;
    }

    public void setOnline(boolean online) {
        isOnline = online;
    }

    @Column(name = "bio", columnDefinition = "TEXT")
    public String getBio() {
        return this.bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    @Column(name = "website")
    public String getWebsite() {
        return this.website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    @Override
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(name = "users_roles",
    joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
    inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    public Set<UserRole> getAuthorities() {
        return this.authorities;
    }

    public void setAuthorities(Set<UserRole> authorities) {
        this.authorities = authorities;
    }

    @Override
    @Column(name = "is_account_non_expired", nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
    public boolean isAccountNonExpired() {
        return true;
    }

    public void setAccountNonExpired(boolean accountNonExpired) {
        isAccountNonExpired = accountNonExpired;
    }

    @Override
    @Column(name = "is_account_non_locked", nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
    public boolean isAccountNonLocked() {
        return true;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        isAccountNonLocked = accountNonLocked;
    }

    @Override
    @Column(name = "is_credentials_non_expired", nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
    public boolean isCredentialsNonExpired() {
        return true;
    }

    public void setCredentialsNonExpired(boolean credentialsNonExpired) {
        isCredentialsNonExpired = credentialsNonExpired;
    }

    @Override
    @Column(name = "is_enabled", nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
    public boolean isEnabled() {
        return true;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }

}
