package com.rmit.sept.bk_adminservices.web;

import com.rmit.sept.bk_adminservices.Repositories.AdminRepository;
import com.rmit.sept.bk_adminservices.model.User;
import com.rmit.sept.bk_adminservices.payload.JWTLoginSucessReponse;
import com.rmit.sept.bk_adminservices.payload.LoginRequest;
import com.rmit.sept.bk_adminservices.security.JwtTokenProvider;
import com.rmit.sept.bk_adminservices.services.MapValidationErrorService;
import com.rmit.sept.bk_adminservices.services.AdminService;
import com.rmit.sept.bk_adminservices.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.validation.Valid;

import static com.rmit.sept.bk_adminservices.security.SecurityConstant.TOKEN_PREFIX;

@RestController
@RequestMapping("/api/users")
public class AdminController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private AdminService adminService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private AdminRepository adminRepository;

    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {

        // Validate passwords match
        userValidator.validate(user, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null)
            return errorMap;

        User newUser = adminService.saveUser(user);

        return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/addUser")
    @CrossOrigin
    public ResponseEntity<?> addNewUser(@Valid @RequestBody User user, BindingResult result) {

        // Validate passwords match
        userValidator.validate(user, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null)
            return errorMap;

        User newUser = adminService.saveUser(user);

        return new ResponseEntity<User>(newUser, HttpStatus.CREATED);

    }

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    @CrossOrigin
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null)
            return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);


        return ResponseEntity.ok(new JWTLoginSucessReponse(true, jwt, adminRepository.findByUsername(loginRequest.getUsername()).isPending()));
    }

    @GetMapping("/allusers")
    public @ResponseBody ResponseEntity<?> getAllUsers() {
        return new ResponseEntity<>(adminService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/allpendingusers")
    public @ResponseBody ResponseEntity<?> getAllPendingUsers() {
        return new ResponseEntity<>(adminService.getAllPendingUsers(), HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/approveuser")
    public ResponseEntity<?> approvePendingUser(@Valid @RequestBody User user, BindingResult result) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null)
            return errorMap;
        User approvedUser = adminService.approvePendingUser(user.getUsername());

        return new ResponseEntity<User>(approvedUser, HttpStatus.CREATED);
    }

    @CrossOrigin
    @PostMapping("/rejectuser")
    public ResponseEntity<?> rejectPendingUser(@Valid @RequestBody User user, BindingResult result) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null)
            return errorMap;
        adminService.rejectPendingUser(user.getUsername());

        return null;
    }

    @CrossOrigin
    @PostMapping("/blockuser")
    public ResponseEntity<?> blockUser(@Valid @RequestBody User user, BindingResult result) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null)
            return errorMap;
        adminService.blockUser(user.getUsername());

        return null;
    }
}