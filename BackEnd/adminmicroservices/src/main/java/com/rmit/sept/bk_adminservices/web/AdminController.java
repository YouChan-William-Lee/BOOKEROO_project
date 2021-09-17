package com.rmit.sept.bk_adminservices.web;

import com.rmit.sept.bk_adminservices.Repositories.UserRepository;
import com.rmit.sept.bk_adminservices.model.Book;
import com.rmit.sept.bk_adminservices.model.User;
import com.rmit.sept.bk_adminservices.model.UserRole;
import com.rmit.sept.bk_adminservices.services.MapValidationErrorService;
import com.rmit.sept.bk_adminservices.services.AdminService;
import com.rmit.sept.bk_adminservices.validator.Validators;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private AdminService adminService;

    @Autowired
    private Validators validators;

    @Autowired
    private UserRepository userRepository;

    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {

        // Validate passwords match
        validators.validate(user, result);

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
    @PutMapping("/approveuser")
    public ResponseEntity<?> approvePendingUser(@Valid @RequestBody User user, BindingResult result) {
        validators.validateForApprove(user, result);
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null)
            return errorMap;
        adminService.approvePendingUser(user.getUsername());

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("/rejectuser/{id}")
    public ResponseEntity<?> rejectPendingUser(@PathVariable(value = "id") Long userID) {
        User user = userRepository.getById(userID);
        if (user == null || user.getUserRole() == UserRole.ADMIN) {
            return new ResponseEntity<String>("Not Deleted", HttpStatus.BAD_REQUEST);
        }
        adminService.rejectPendingUser(user);
        return new ResponseEntity<String>("Deleted", HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping("/blockuser")
    public ResponseEntity<?> blockUser(@Valid @RequestBody User user, BindingResult result) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null)
            return errorMap;
        adminService.blockUser(user.getUsername());

        return null;
    }

    @CrossOrigin
    @PostMapping("/editbook/{id}")
    public ResponseEntity<?> editBook(@Valid @RequestBody Book book, BindingResult result) {

        Book editedBook = adminService.saveBook(book);
        return new ResponseEntity<Book>(editedBook, HttpStatus.OK);
    }
}