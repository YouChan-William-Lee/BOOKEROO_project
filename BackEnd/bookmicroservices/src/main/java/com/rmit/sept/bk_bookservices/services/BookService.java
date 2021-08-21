package com.rmit.sept.bk_bookservices.services;

import com.rmit.sept.bk_bookservices.Repositories.BookRepository;
import com.rmit.sept.bk_bookservices.exceptions.BooknameAlreadyExistsException;
import com.rmit.sept.bk_bookservices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public Book saveBook (Book newBook){
        try{
            newBook.setBookName((newBook.getBookName()));
            return bookRepository.save(newBook);

        }catch (Exception e){
            throw new BooknameAlreadyExistsException("Bookname '"+newBook.getBookName()+"' already exists");
        }
    }
}
