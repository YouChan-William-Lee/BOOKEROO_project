package com.rmit.sept.bk_adminservices.web;


import com.rmit.sept.bk_adminservices.Repositories.AdminRepository;
import com.rmit.sept.bk_adminservices.TestUtil;
import com.rmit.sept.bk_adminservices.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class AdminControllerTest {

    private final String GET_ALL_USERS_API = "/api/users/allusers";
    private final String GET_ALL_PENDING_USERS_API =  "/api/users/allpendingusers";

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @BeforeEach
    public void cleanup() {
        adminRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void getAllUsers_whenZeroUserExists_receiveZeroUsers() {
        List<User> users = (List<User>) getAllUser(Object.class).getBody();
        assertThat(users.size()).isEqualTo(0);
    }

    @Test
    public void getAllUsers_whenOneAdminUserExists_receiveZeroUsers() {
        adminRepository.save(TestUtil.getValidAdminUser());
        List<User> users = (List<User>) getAllUser(Object.class).getBody();
        assertThat(users.size()).isEqualTo(0);
    }

    @Test
    public void getAllUsers_whenOnePublicUserExists_receiveOneUsers() {
        adminRepository.save(TestUtil.getValidPublicUser());
        List<User> users = (List<User>) getAllUser(Object.class).getBody();
        assertThat(users.size()).isEqualTo(1);
    }

    @Test
    public void getAllUsers_whenOnePendingPublisherUserExists_receiveZeroUsers() {
        adminRepository.save(TestUtil.getValidPublisherUser());
        List<User> users = (List<User>) getAllUser(Object.class).getBody();
        assertThat(users.size()).isEqualTo(0);
    }

    @Test
    public void getAllUsers_whenOneNonPendingPublisherUserExists_receiveOneUsers() {
        User user = TestUtil.getValidPublisherUser();
        user.setPending(false);
        adminRepository.save(user);
        List<User> users = (List<User>) getAllUser(Object.class).getBody();
        assertThat(users.size()).isEqualTo(1);
    }

    @Test
    public void getAllUsers_whenMultiplePublicUsers_receiveMultipleUsers() {
        User user = TestUtil.getValidPublicUser();
        adminRepository.save(user);
        user = TestUtil.getValidPublicUser();
        user.setUsername("public2@gmail.com");
        adminRepository.save(user);
        user = TestUtil.getValidPublicUser();
        user.setUsername("public3@gmail.com");
        adminRepository.save(user);
        user = TestUtil.getValidPublicUser();
        user.setUsername("public4@gmail.com");
        adminRepository.save(user);
        List<User> users = (List<User>) getAllUser(Object.class).getBody();
        assertThat(users.size()).isEqualTo(4);
    }

    @Test
    public void getAllUsers_whenMultiplePendingPublisherUsers_receiveZeroUsers() {
        User user = TestUtil.getValidPublisherUser();
        adminRepository.save(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public2@gmail.com");
        adminRepository.save(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public3@gmail.com");
        adminRepository.save(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public4@gmail.com");
        adminRepository.save(user);
        List<User> users = (List<User>) getAllUser(Object.class).getBody();
        assertThat(users.size()).isEqualTo(0);
    }

    @Test
    public void getAllUsers_whenMultipleNonPendingPublisherUsers_receiveMultipleUsers() {
        User user = TestUtil.getValidPublisherUser();
        user.setPending(false);
        adminRepository.save(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public2@gmail.com");
        user.setPending(false);
        adminRepository.save(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public3@gmail.com");
        user.setPending(false);
        adminRepository.save(user);
        user = TestUtil.getValidPublisherUser();
        user.setPending(false);
        user.setUsername("public4@gmail.com");
        adminRepository.save(user);
        List<User> users = (List<User>) getAllUser(Object.class).getBody();
        assertThat(users.size()).isEqualTo(4);
    }

    @Test
    public void getAllUsers_whenMultipleMixedPendingPublisherUsers_receiveMultipleNonPendingUsers() {
        User user = TestUtil.getValidPublisherUser();
        user.setPending(false);
        adminRepository.save(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public2@gmail.com");
        user.setPending(false);
        adminRepository.save(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public3@gmail.com");
        adminRepository.save(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public4@gmail.com");
        adminRepository.save(user);
        List<User> users = (List<User>) getAllUser(Object.class).getBody();
        assertThat(users.size()).isEqualTo(2);
    }

    @Test
    public void getAllUsers_whenMultipleMixedUsers_receiveMultipleUsers() {
        User user = TestUtil.getValidPublisherUser();
        user.setPending(false);
        adminRepository.save(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public2@gmail.com");
        user.setPending(false);
        adminRepository.save(user);
        user = TestUtil.getValidPublicUser();
        user.setUsername("public3@gmail.com");
        adminRepository.save(user);
        user = TestUtil.getValidPublicUser();
        user.setUsername("public4@gmail.com");
        adminRepository.save(user);
        List<User> users = (List<User>) getAllUser(Object.class).getBody();
        assertThat(users.size()).isEqualTo(4);
    }

    @Test
    public void getAllPendingUser_whenOneAdminUserExists_receiveZeroUsers() {
        adminRepository.save(TestUtil.getValidAdminUser());
        List<User> users = (List<User>) getAllPendingUser(Object.class).getBody();
        assertThat(users.size()).isEqualTo(0);
    }

    @Test
    public void getAllPendingUser_whenOnePublicUserExists_receiveZeroUsers() {
        adminRepository.save(TestUtil.getValidPublicUser());
        List<User> users = (List<User>) getAllPendingUser(Object.class).getBody();
        assertThat(users.size()).isEqualTo(0);
    }

    @Test
    public void getAllPendingUser_whenOnePendingPublisherUserExists_receiveAllUsers() {
        adminRepository.save(TestUtil.getValidPublisherUser());
        List<User> users = (List<User>) getAllPendingUser(Object.class).getBody();
        assertThat(users.size()).isEqualTo(1);
    }

    private <T> ResponseEntity<T> getAllUser(Class<T> response) {
        return testRestTemplate.getForEntity(GET_ALL_USERS_API, response);
    }

    private <T> ResponseEntity<T> getAllPendingUser(Class<T> response) {
        return testRestTemplate.getForEntity(GET_ALL_PENDING_USERS_API, response);
    }

}
