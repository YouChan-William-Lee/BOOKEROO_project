package com.rmit.sept.bk_adminservices.web;

import com.rmit.sept.bk_adminservices.Repositories.UserRepository;
import com.rmit.sept.bk_adminservices.model.Book;
import com.rmit.sept.bk_adminservices.model.User;
import com.rmit.sept.bk_adminservices.model.UserRole;
import com.rmit.sept.bk_adminservices.services.MapValidationErrorService;
import com.rmit.sept.bk_adminservices.services.UserService;
import com.rmit.sept.bk_adminservices.services.BookService;
import com.rmit.sept.bk_adminservices.validator.BookValidator;
import com.rmit.sept.bk_adminservices.validator.UserValidator;
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
    private UserService userService;

    @Autowired
    private BookService bookService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private BookValidator bookValidator;

    @Autowired
    private UserRepository userRepository;

    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {

        // Validate passwords match
        userValidator.validate(user, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null)
            return errorMap;
        User newUser = userService.saveUser(user);
        return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }

    @GetMapping("/allusers")
    public @ResponseBody ResponseEntity<?> getAllNonAdminNonPendingUsers() {
        return new ResponseEntity<>(userService.getAllNonAdminPendingUsers(false), HttpStatus.OK);
    }

    @GetMapping("/allpendingusers")
    public @ResponseBody ResponseEntity<?> getAllNonAdminPendingUsers() {
        return new ResponseEntity<>(userService.getAllNonAdminPendingUsers(true), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/user/{username}")
    public  ResponseEntity<?> getUserByUsername(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return new ResponseEntity<User>(user, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping("/approveuser")
    public ResponseEntity<?> approvePendingUser(@Valid @RequestBody User user, BindingResult result) {
        userValidator.validateForApprove(user, result);
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null)
            return errorMap;
        user = userService.approvePendingUser(user.getUsername());
        if (user == null) {
            return new ResponseEntity<User>(user, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("/rejectuser/{id}")
    public ResponseEntity<?> rejectPendingUser(@PathVariable(value = "id") Long userID) {
        User user = userRepository.getById(userID);
        if (user == null || user.getUserRole() == UserRole.ADMIN || !user.isPending()) {
            return new ResponseEntity<String>("Not Deleted", HttpStatus.BAD_REQUEST);
        }
        userService.rejectPendingUser(user);
        return new ResponseEntity<String>("Deleted", HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping("/blockuser")
    public ResponseEntity<?> blockUser(@Valid @RequestBody User user, BindingResult result) {
        userValidator.validateForBlock(user, result);
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null)
            return errorMap;
        userService.blockUser(user.getUsername());

        return null;
    }

    @CrossOrigin
    @PostMapping("/editbook/{id}")
    public ResponseEntity<?> editBook(@Valid @RequestBody Book book, BindingResult result) {
        bookValidator.validate(book, result);

        Book editedBook = bookService.saveBook(book);
        return new ResponseEntity<Book>(editedBook, HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/edituser")
    public ResponseEntity<?> editUser(@Valid @RequestBody User user, BindingResult result) {
        userValidator.validate(user, result);

        User editedUser = userService.editUser(user);
        return new ResponseEntity<User>(editedUser, HttpStatus.OK);
    }
}