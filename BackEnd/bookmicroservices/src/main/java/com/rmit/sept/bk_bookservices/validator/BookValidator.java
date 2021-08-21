package com.rmit.sept.bk_bookservices.validator;

import com.rmit.sept.bk_bookservices.model.Book;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class BookValidator implements Validator {
    @Override
    public boolean supports(Class<?> aClass) {
        return Book.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        Book book = (Book) object;

        //To do
    }
}
