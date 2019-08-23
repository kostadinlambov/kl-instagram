package com.instagram.repositories;

import com.instagram.domain.entities.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, String> {
    List<Post>findAllByCreatorIdOrderByTimeDesc(String userId);

    Page<Post>findAllByCreatorIdOrderByTimeDesc(String userId, Pageable pageable);

//    Slice<Post> findAllByCreatorIdIsNotOrderByTimeDesc(String userId, Pageable pageable);
    Page<Post> findAllByCreatorIdNotOrderByTimeDesc(String userId, Pageable pageable);

    @Query(value = "SELECT * " +
            "FROM posts as p " +
            "JOIN (SELECT * " +
            "FROM followers as f " +
            "      where f.follower_id = :userId" +
            "        and f.is_active = true) as following " +
            "     on p.user_id = following.user_id", nativeQuery = true)
    Page<Post> getAllFollowingPosts(@Param(value = "userId") String userId, Pageable pageable);
}
