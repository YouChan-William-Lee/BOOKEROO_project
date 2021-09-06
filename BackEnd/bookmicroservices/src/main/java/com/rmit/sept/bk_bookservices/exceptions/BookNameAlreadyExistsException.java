package com.rmit.sept.bk_bookservices.exceptions;

import org.omg.SendingContext.RunTime;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BookNameAlreadyExistsException extends RuntimeException {
    public BookNameAlreadyExistsException(String message) {
        super(message);
    }

}
