package com.rmit.sept.bk_bookservices.validator;

import com.rmit.sept.bk_bookservices.Repositories.BookRepository;
import com.rmit.sept.bk_bookservices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class BookValidator implements Validator {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public boolean supports(Class<?> aClass) {
        return Book.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        Book book = (Book) object;

        if (bookRepository.existsById(book.getId())) {
           errors.rejectValue("isbn", "Exists", "This book is already in database");
        }

    }
}
