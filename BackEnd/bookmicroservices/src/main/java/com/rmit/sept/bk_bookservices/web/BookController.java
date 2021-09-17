package com.rmit.sept.bk_bookservices.web;

import com.rmit.sept.bk_bookservices.Repositories.BookRepository;
import com.rmit.sept.bk_bookservices.model.Book;
import com.rmit.sept.bk_bookservices.services.BookService;
import com.rmit.sept.bk_bookservices.services.MapValidationErrorService;
import com.rmit.sept.bk_bookservices.validator.BookValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private BookService bookService;

    @Autowired
    private BookValidator bookValidator;

    @Autowired
    private BookRepository bookRepository;

    @CrossOrigin
    @PostMapping("/registerBook")
    public ResponseEntity<?> registerBook(@Valid @RequestBody Book book, BindingResult result) {
        bookValidator.validate(book, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;

        Book newBook = bookService.saveBook(book);

        return new ResponseEntity<Book>(newBook, HttpStatus.CREATED);
    }

    @CrossOrigin
    @GetMapping("/allbooks")
    public @ResponseBody ResponseEntity<?> getAllBooks() {
        return new ResponseEntity<>(bookService.getAllBooks(), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<?> getBook(@PathVariable(value = "id") Long bookIsbn) {
        Book book = bookRepository.getByIsbn(bookIsbn);
        if (book == null) {
            return new ResponseEntity<Book>(book, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Book>(book, HttpStatus.OK);
    }
}
