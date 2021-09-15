package com.rmit.sept.bk_loginservices;

import com.rmit.sept.bk_loginservices.model.User;
import com.rmit.sept.bk_loginservices.model.UserRole;

public class TestUtil {

    public static User createValidUser() {
        User user = new User();
        user.setUsername("testemail@gmail.com");
        user.setFullName("test-display");
        user.setPassword("123456");
        user.setConfirmPassword("123456");
        user.setPhoneNumber("123456789");
        user.setUserRole(UserRole.PUBLIC);
        user.setAddress("melbourne Australia");
        return user;
    }
}
