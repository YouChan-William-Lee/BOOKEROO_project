package com.rmit.sept.bk_loginservices.services;




import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.exceptions.UsernameAlreadyExistsException;
import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.model.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser (User newUser){

      /*  newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        //Username has to be unique (exception)
        // Make sure that password and confirmPassword match
        // We don't persist or show the confirmPassword
        return userRepository.save(newUser);
       */
        try{
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            //Username has to be unique (exception)
            newUser.setUsername(newUser.getUsername());
            // Make sure that password and confirmPassword match
            // We don't persist or show the confirmPassword
            newUser.setConfirmPassword("");
            return userRepository.save(newUser);

        }catch (Exception e){
            throw new UsernameAlreadyExistsException("Username '"+newUser.getUsername()+"' already exists");
        }

    }

    public User addNewUser (User addNewUser){

      /*  newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        //Username has to be unique (exception)
        // Make sure that password and confirmPassword match
        // We don't persist or show the confirmPassword
        return userRepository.save(newUser);
       */
        try{
            addNewUser.setPassword(bCryptPasswordEncoder.encode(addNewUser.getPassword()));
            //Username has to be unique (exception)
            addNewUser.setUsername(addNewUser.getUsername());
            //Sets status to true as Admin adds the user
            addNewUser.setPending(true);
            // Make sure that password and confirmPassword match
            // We don't persist or show the confirmPassword
            addNewUser.setConfirmPassword("");
            return userRepository.save(addNewUser);

        }catch (Exception e){
            throw new UsernameAlreadyExistsException("Username '"+addNewUser.getUsername()+"' already exists");
        }

    }

    public List<User> getAllUsers() {
        List<User> users = new ArrayList<User>();
        for (User user : userRepository.findAll()) {
            if(!user.getUserRole().equals(UserRole.ADMIN) && user.isPending() == false) {
                users.add(user);
            }
        }
        return users;
    }

    public List<User> getAllPendingUsers() {
        List<User> users = new ArrayList<User>();
        for (User user : userRepository.findAll()) {
            if(!user.getUserRole().equals(UserRole.ADMIN) && user.isPending() == true) {
                users.add(user);
            }
        }
        return users;
    }

    public User findByusername(String username) {
        return userRepository.findByUsername(username);
    }

    public User approvePendingUser(String username) {
        User user = userRepository.findByUsername(username);
        user.setPending(false);
        userRepository.save(user);
        return user;
    }

    public void rejectPendingUser(String username) {
        User user = userRepository.findByUsername(username);
        userRepository.delete(user);
    }

    public void blockUser(String username) {
        User user = userRepository.findByUsername(username);
        user.setPending(true);
        userRepository.save(user);
    }
}
