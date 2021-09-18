package com.rmit.sept.bk_bookservices.services;

import com.rmit.sept.bk_bookservices.Repositories.BookRepository;
import com.rmit.sept.bk_bookservices.exceptions.BookNameAlreadyExistsException;
import com.rmit.sept.bk_bookservices.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Book saveBook (Book newBook){
        try{
            return bookRepository.save(newBook);

        }catch (Exception e){
            throw new BookNameAlreadyExistsException("Bookname '"+newBook.getBookName()+"' already exists");
        }
    }

    public List<Book> getAllBooks() {
        List<Book> books = new ArrayList<Book>();
        bookRepository.findAll().forEach(books::add);
        return books;
    }

    public List<Book> findBybookname(String bookname) {
        List<Book> books = new ArrayList<Book>();
        return bookRepository.findAllByBookName(bookname);
    }

    public Book getByisbn(Long isbn) {
        return bookRepository.getByIsbn(isbn);
    }

    public List<Book> findAllByauthor(String author) {
        List<Book> books = new ArrayList<Book>();
        return bookRepository.findAllByAuthor(author);
    }

    public List<Book> findAllBycategory(String category) {
        List<Book> books = new ArrayList<Book>();
        return bookRepository.findAllByCategory(category);
    }
}
