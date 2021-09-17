package com.rmit.sept.bk_adminservices.services;




import com.rmit.sept.bk_adminservices.Repositories.AdminRepository;
import com.rmit.sept.bk_adminservices.exceptions.UsernameAlreadyExistsException;
import com.rmit.sept.bk_adminservices.model.User;
import com.rmit.sept.bk_adminservices.model.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser (User newUser) {

      /*  newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        //Username has to be unique (exception)
        // Make sure that password and confirmPassword match
        // We don't persist or show the confirmPassword
        return userRepository.save(newUser);
       */
        try {
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            //Username has to be unique (exception)
            newUser.setUsername(newUser.getUsername());
            // Make sure that password and confirmPassword match
            // We don't persist or show the confirmPassword
            newUser.setConfirmPassword("");
            return adminRepository.save(newUser);

        } catch (Exception e) {
            throw new UsernameAlreadyExistsException("Username '" + newUser.getUsername() + "' already exists");
        }
    }

    public List<User> getAllNonAdminPendingUsers(Boolean pending) {
        List<User> users = new ArrayList<User>();
        for (User user : adminRepository.findAll()) {
            if(!user.getUserRole().equals(UserRole.ADMIN) && user.isPending() == pending) {
                users.add(user);
            }
        }
        return users;
    }

    public User findByusername(String username) {
        return adminRepository.findByUsername(username);
    }

    public User approvePendingUser(String username) {
        User user = adminRepository.findByUsername(username);
        user.setPending(false);
        adminRepository.save(user);
        return user;
    }

    public void rejectPendingUser(User user) {
        adminRepository.delete(user);
    }

    public void blockUser(String username) {
        User user = adminRepository.findByUsername(username);
        user.setPending(true);
        adminRepository.save(user);
    }
}
