package com.instagram.repositories;

import com.instagram.domain.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {
    List<Comment> getCommentByPostIdOrderByTimeDesc(String postId);
}
