package com.instagram.services;

import com.instagram.domain.entities.UserRole;

public interface RoleService {
   boolean persist(UserRole role) throws Exception;

    UserRole getByName(String name);
}
