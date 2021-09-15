package com.rmit.sept.bk_adminservices.web;

import com.rmit.sept.bk_adminservices.Repositories.AdminRepository;
import com.rmit.sept.bk_adminservices.model.User;
import com.rmit.sept.bk_adminservices.services.MapValidationErrorService;
import com.rmit.sept.bk_adminservices.services.AdminService;
import com.rmit.sept.bk_adminservices.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.validation.Valid;


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

    @GetMapping("/allusers")
    public @ResponseBody ResponseEntity<?> getAllNonAdminNonPendingUsers() {
        return new ResponseEntity<>(adminService.getAllNonAdminPendingUsers(false), HttpStatus.OK);
    }

    @GetMapping("/allpendingusers")
    public @ResponseBody ResponseEntity<?> getAllNonAdminPendingUsers() {
        return new ResponseEntity<>(adminService.getAllNonAdminPendingUsers(true), HttpStatus.OK);
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