package com.instagram.repositories;

import com.instagram.domain.entities.Follower;
import com.instagram.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowerRepository extends JpaRepository<Follower, String> {
//    Follower findByFollowerAndUserAndActive(User follower, User user, boolean active);
//    Follower findByUserAndFollowerAndActive( User user,User follower, boolean active);
    Follower findByUserAndFollower( User user,User follower);

    Follower findFirstByUserAndFollower(User user,User follower);

//    Follower findRelationship(User loggedInUser, String userToFollowId);
}