package com.instagram.repositories;

import com.instagram.domain.entities.Like;
import com.instagram.domain.entities.Post;
import com.instagram.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, String> {
    Like findByUserAndPost(User user, Post post);
}
