package com.instagram.repositories;

import com.instagram.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUsername(String username);

    User findByEmail(String email);

//    @Query(value = "SELECT * FROM users  as u" +
//            " LEFT JOIN" +
//            " (SELECT f.follower_id AS folllowerId, f.user_id AS f_user_id FROM users" +
//            " JOIN followers f on :userId = f.user_id) as followers " +
//            "ON u.id = followers.folllowerId " +
//            "where  followers.folllowerId IS NULL and u.id <> :userId", nativeQuery = true)
//    List<User> getAllNotFollowers(@Param("userId") String loggedInUserId);

    @Query(value = "SELECT * FROM users as u " +
            "LEFT JOIN " +
            "(SELECT f.follower_id AS folllowerId, f.user_id AS f_user_id " +
            "FROM users as u " +
            "JOIN followers f on u.id = f.user_id " +
            "where f.follower_id = :userId) as followers " +
            "ON u.id = followers.f_user_id " +
            "where followers.folllowerId IS NULL " +
            " and u.id <> :userId", nativeQuery = true)
    List<User> getAllNotFollowers(@Param("userId") String loggedInUserId);

    @Query(value = "SELECT u.id, u.username, u.first_name, u.last_name, u.profile_pic_url, followers.is_active  FROM users as u " +
            "LEFT JOIN " +
            "(SELECT f.follower_id AS folllowerId, f.user_id AS f_user_id, f.is_active " +
            "FROM users as u " +
            "JOIN followers f on u.id = f.user_id " +
            "where f.follower_id = :userId) as followers " +
            "ON u.id = followers.f_user_id " +
            "where u.id <> :userId " +
            "order by followers.is_active asc ", nativeQuery = true)
    List<Object[]> getAllUsersWithFollowersInfo(@Param("userId") String loggedInUserId);
}
