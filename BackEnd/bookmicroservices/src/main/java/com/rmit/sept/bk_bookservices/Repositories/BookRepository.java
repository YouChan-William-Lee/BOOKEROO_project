package com.rmit.sept.bk_bookservices.Repositories;


import com.rmit.sept.bk_bookservices.model.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface BookRepository extends CrudRepository<Book, Long> {

    List<Book> findAllBybookname(String bookname);
    Book getByisbn(Long isbn);
    List<Book> findAllByauthor(String author);
    List<Book> findAllBycategory(String category);
}
