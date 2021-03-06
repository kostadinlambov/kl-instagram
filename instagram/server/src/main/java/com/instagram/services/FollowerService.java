package com.instagram.services;

import com.instagram.domain.models.viewModels.follower.FollowerViewModel;
import com.instagram.domain.models.viewModels.follower.FollowingViewModel;

import java.util.List;

public interface FollowerService {
    boolean follow(String loggedInUserId, String userToFollowId) throws Exception;

    boolean unFollow(String loggedInUserId, String userToUnFollowId) throws Exception;

    List<FollowerViewModel> getAllFollowers(String username) throws Exception;

    List<FollowingViewModel> getAllFollowing(String username) throws Exception;

    List<FollowingViewModel> getAllFollowingCandidates(String username) throws Exception;
}
