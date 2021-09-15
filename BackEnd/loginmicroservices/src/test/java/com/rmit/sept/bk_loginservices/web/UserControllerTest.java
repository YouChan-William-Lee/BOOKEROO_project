package com.rmit.sept.bk_loginservices.web;

import com.rmit.sept.bk_loginservices.Repositories.UserRepository;
import com.rmit.sept.bk_loginservices.TestUtil;
import com.rmit.sept.bk_loginservices.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserControllerTest {

    private final String REGISTER_API = "/api/users/register";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestRestTemplate testRestTemplate;
    
    @BeforeEach
    public void cleanup() {
        userRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void postUser_whenPublicUserIsValid_receiveCreated() {
        User user = TestUtil.createValidUser();
        ResponseEntity<User> response = postSignup(user, User.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    }

    @Test
    public void postUser_whenPublicUserIsValid_receiveUsername() {
        User user = TestUtil.createValidUser();
        ResponseEntity<User> response = postSignup(user, User.class);
        assertThat(response.getBody().getUsername()).isEqualTo(user.getUsername());
    }

    @Test
    public void postUser_whenPublicUserIsValid_passwordIsHashed() {
        User user = TestUtil.createValidUser();
        ResponseEntity<User> response = postSignup(user, User.class);
        assertThat(response.getBody().getPassword()).isNotEqualTo(user.getPassword());
    }

    public <T> ResponseEntity<T> postSignup(Object request, Class<T> response){
        return testRestTemplate.postForEntity(REGISTER_API, request, response);
    }

}
