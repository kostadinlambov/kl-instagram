package com.instagram.services;

public interface FollowerService {
    boolean follow(String loggedInUserId, String userToFollowId) throws Exception;
}
