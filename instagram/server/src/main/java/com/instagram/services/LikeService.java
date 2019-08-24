package com.instagram.services;

public interface LikeService {
    String changeLikePost(String postId, String loggedInUserId) throws Exception;
}
