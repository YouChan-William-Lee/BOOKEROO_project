package com.rmit.sept.bk_bookservices.web;

import com.rmit.sept.bk_bookservices.Repositories.BookRepository;
import com.rmit.sept.bk_bookservices.model.Book;
import com.rmit.sept.bk_bookservices.model.BookId;
import com.rmit.sept.bk_bookservices.payload.BookUpdateRequest;
import com.rmit.sept.bk_bookservices.services.BookService;
import com.rmit.sept.bk_bookservices.services.MapValidationErrorService;
import com.rmit.sept.bk_bookservices.validator.BookValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    @GetMapping("/{user}/{id}")
    public ResponseEntity<?> getBook(@PathVariable(value = "id") Long isbn, @PathVariable(value = "user") String username) {


        Book book = bookRepository.getById(new BookId(isbn, username));
        if (book == null) {
            return new ResponseEntity<Book>(book, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Book>(book, HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping("/update/{user}/{id}")
    public ResponseEntity<?> updateBook(@PathVariable(value = "id") Long isbn, @PathVariable(value = "user") String username, @RequestBody BookUpdateRequest bookUpdate, BindingResult result) {
        System.out.println("TEST BOOK controller");
        Book book = bookRepository.getById(new BookId(isbn, username));
        if (book == null) {
            return new ResponseEntity<Book>(book, HttpStatus.BAD_REQUEST);
        }
        book.setNumOfNewBook(book.getNumOfNewBook() - bookUpdate.getNumOfNewBook());
        book.setNumOfOldBook(book.getNumOfOldBook() - bookUpdate.getNumOfOldBook());
        Book NEWBook = bookService.saveBook(book);
        return new ResponseEntity<Book>(NEWBook, HttpStatus.OK);
    }
}
