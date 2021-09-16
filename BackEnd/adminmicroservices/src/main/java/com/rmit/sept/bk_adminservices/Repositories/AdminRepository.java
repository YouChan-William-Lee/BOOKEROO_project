package com.rmit.sept.bk_adminservices.Repositories;

import com.rmit.sept.bk_adminservices.model.User;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// All database queries including all crud queries

@Repository
public interface AdminRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);
    User getById(Long id);
}
