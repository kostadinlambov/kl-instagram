package com.instagram.servicesImpl;

import com.instagram.repositories.FollowerRepository;
import com.instagram.services.FollowerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FollowerServiceImpl implements FollowerService {
    private final FollowerRepository followerRepository;

    @Autowired
    public FollowerServiceImpl(FollowerRepository followerRepository) {
        this.followerRepository = followerRepository;
    }
}
