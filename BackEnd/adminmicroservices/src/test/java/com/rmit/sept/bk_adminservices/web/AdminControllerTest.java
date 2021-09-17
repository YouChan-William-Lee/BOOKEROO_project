package com.rmit.sept.bk_adminservices.web;


import com.rmit.sept.bk_adminservices.Repositories.UserRepository;
import com.rmit.sept.bk_adminservices.TestUtil;
import com.rmit.sept.bk_adminservices.model.User;
import com.rmit.sept.bk_adminservices.services.AdminService;
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

    private final String GET_ALL_NON_PENDING_USERS_API = "/api/admin/allusers";
    private final String GET_ALL_PENDING_USERS_API =  "/api/admin/allpendingusers";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminService adminService;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @BeforeEach
    public void cleanup() {
        userRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void getAllNonAdminNonPendingUsers_whenZeroUserExists_receiveZeroUsers() {
        List<User> users = (List<User>) allNonAdminNonPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(0);
    }

    @Test
    public void getAllNonAdminNonPendingUsers_whenNoPublicPublisherUserExists_receiveZeroUsers() {
        adminService.saveUser(TestUtil.getValidAdminUser());
        List<User> users = (List<User>) allNonAdminNonPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(0);
    }

    @Test
    public void getAllNonAdminNonPendingUsers_whenOnePublicUserExists_receiveOneUsers() {
        adminService.saveUser(TestUtil.getValidPublicUser());
        List<User> users = (List<User>) allNonAdminNonPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(1);
    }

    @Test
    public void getAllNonAdminNonPendingUsers_whenOnePendingPublisherUserExists_receiveZeroUsers() {
        adminService.saveUser(TestUtil.getValidPublisherUser());
        List<User> users = (List<User>) allNonAdminNonPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(0);
    }

    @Test
    public void getAllNonAdminNonPendingUsers_whenOneNonPendingPublisherUserExists_receiveOneUsers() {
        User user = TestUtil.getValidPublisherUser();
        user.setPending(false);
        adminService.saveUser(user);
        List<User> users = (List<User>) allNonAdminNonPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(1);
    }

    @Test
    public void getAllNonAdminNonPendingUsers_whenMultiplePublicUsers_receiveMultipleUsers() {
        User user = TestUtil.getValidPublicUser();
        adminService.saveUser(user);
        user = TestUtil.getValidPublicUser();
        user.setUsername("public2@gmail.com");
        adminService.saveUser(user);
        user = TestUtil.getValidPublicUser();
        user.setUsername("public3@gmail.com");
        adminService.saveUser(user);
        user = TestUtil.getValidPublicUser();
        user.setUsername("public4@gmail.com");
        adminService.saveUser(user);
        List<User> users = (List<User>) allNonAdminNonPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(4);
    }

    @Test
    public void getAllNonAdminNonPendingUsers_whenMultiplePendingPublisherUsers_receiveZeroUsers() {
        User user = TestUtil.getValidPublisherUser();
        adminService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public2@gmail.com");
        adminService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public3@gmail.com");
        adminService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public4@gmail.com");
        adminService.saveUser(user);
        List<User> users = (List<User>) allNonAdminNonPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(0);
    }

    @Test
    public void getAllNonAdminNonPendingUsers_whenMultipleNonPendingPublisherUsers_receiveMultipleUsers() {
        User user = TestUtil.getValidPublisherUser();
        user.setPending(false);
        adminService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public2@gmail.com");
        user.setPending(false);
        adminService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public3@gmail.com");
        user.setPending(false);
        adminService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setPending(false);
        user.setUsername("public4@gmail.com");
        adminService.saveUser(user);
        List<User> users = (List<User>) allNonAdminNonPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(4);
    }

    @Test
    public void getAllNonAdminNonPendingUsers_whenMultipleMixedPendingPublisherUsers_receiveMultipleNonPendingUsers() {
        User user = TestUtil.getValidPublisherUser();
        user.setPending(false);
        adminService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public2@gmail.com");
        user.setPending(false);
        adminService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public3@gmail.com");
        adminService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public4@gmail.com");
        adminService.saveUser(user);
        List<User> users = (List<User>) allNonAdminNonPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(2);
    }

    @Test
    public void getAllNonAdminNonPendingUsers_whenMultipleMixedUsers_receiveMultipleUsers() {
        User user = TestUtil.getValidPublisherUser();
        user.setPending(false);
        adminService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public2@gmail.com");
        user.setPending(false);
        adminService.saveUser(user);
        user = TestUtil.getValidPublicUser();
        user.setUsername("public3@gmail.com");
        adminService.saveUser(user);
        user = TestUtil.getValidPublicUser();
        user.setUsername("public4@gmail.com");
        adminService.saveUser(user);
        List<User> users = (List<User>) allNonAdminNonPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(4);
    }

    @Test
    public void getAllNonAdminPendingUsers_whenOneAdminUserExists_receiveZeroUsers() {
        adminService.saveUser(TestUtil.getValidAdminUser());
        List<User> users = (List<User>) allNonAdminPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(0);
    }

    @Test
    public void getAllNonAdminPendingUsers_whenOnePublicUserExists_receiveZeroUsers() {
        adminService.saveUser(TestUtil.getValidPublicUser());
        List<User> users = (List<User>) allNonAdminPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(0);
    }

    @Test
    public void getAllNonAdminPendingUsers_whenOnePendingPublisherUserExists_receiveAllUsers() {
        adminService.saveUser(TestUtil.getValidPublisherUser());
        List<User> users = (List<User>) allNonAdminPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(1);
    }

    @Test
    public void getAllNonAdminPendingUsers_whenMultiplePendingPublisherUsers_receiveAllUsers() {
        User user = TestUtil.getValidPublisherUser();
        adminService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public2@gmail.com");
        adminService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public3@gmail.com");
        adminService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public4@gmail.com");
        adminService.saveUser(user);
        List<User> users = (List<User>) allNonAdminPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(4);
    }

    @Test
    public void getAllNonAdminPendingUsers_whenMultipleNonPendingPublisherUsers_receiveZeroUsers() {
        User user = TestUtil.getValidPublisherUser();
        user.setPending(false);
        adminService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public2@gmail.com");
        user.setPending(false);
        adminService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public3@gmail.com");
        user.setPending(false);
        adminService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setPending(false);
        user.setUsername("public4@gmail.com");
        adminService.saveUser(user);
        List<User> users = (List<User>) allNonAdminPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(0);
    }

    @Test
    public void getAllNonAdminPendingUsers_whenMultipleMixedUsers_receiveMultiplePublisherUsers() {
        User user = TestUtil.getValidPublisherUser();
        adminService.saveUser(user);
        user = TestUtil.getValidPublisherUser();
        user.setUsername("public2@gmail.com");
        adminService.saveUser(user);
        user = TestUtil.getValidPublicUser();
        user.setUsername("public3@gmail.com");
        adminService.saveUser(user);
        user = TestUtil.getValidPublicUser();
        user.setUsername("public4@gmail.com");
        adminService.saveUser(user);
        List<User> users = (List<User>) allNonAdminPendingUsers(Object.class).getBody();
        assertThat(users.size()).isEqualTo(2);
    }

//    @Test
//    public void approvePendingUser_whenUserAlreadyNotPending_receiveUserHasApproved() {
//        adminService.saveUser()
//    }

    private <T> ResponseEntity<T> allNonAdminNonPendingUsers(Class<T> response) {
        return testRestTemplate.getForEntity(GET_ALL_NON_PENDING_USERS_API, response);
    }

    private <T> ResponseEntity<T> allNonAdminPendingUsers(Class<T> response) {
        return testRestTemplate.getForEntity(GET_ALL_PENDING_USERS_API, response);
    }

}
