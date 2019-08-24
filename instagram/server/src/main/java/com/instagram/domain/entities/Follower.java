package com.instagram.domain.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "followers", uniqueConstraints = {@UniqueConstraint(columnNames = {"id"})})
public class Follower extends BaseEntity {
    private User user;
    private User follower;
    private boolean active;
    private LocalDateTime time;

    public Follower() {
    }

    @ManyToOne(optional = false, targetEntity = User.class)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonBackReference
    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @ManyToOne(optional = false, targetEntity = User.class)
    @JoinColumn(name = "follower_id", referencedColumnName = "id")
    @JsonBackReference
    public User getFollower() {
        return this.follower;
    }

    public void setFollower(User follower) {
        this.follower = follower;
    }

    @Column(name = "is_active",nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
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
}
