package com.instagram.web.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.instagram.services.FollowerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/follower")
public class FollowerController {
    private final FollowerService followerService;
    private final ObjectMapper objectMapper;


    @Autowired
    public FollowerController(FollowerService followerService, ObjectMapper objectMapper) {
        this.followerService = followerService;
        this.objectMapper = objectMapper;
    }
}
