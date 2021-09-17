package com.rmit.sept.bk_adminservices.Repositories;


import com.rmit.sept.bk_adminservices.model.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface BookRepository extends CrudRepository<Book, Long> {

    List<Book> findAllByBookName(String bookname);
    Book getByIsbn(Long isbn);
    List<Book> findAllByAuthor(String author);
    List<Book> findAllByCategory(String category);
}
