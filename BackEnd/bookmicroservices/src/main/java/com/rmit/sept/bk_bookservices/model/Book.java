package com.rmit.sept.bk_bookservices.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "book name is required")
    private String bookName;
    @NotBlank(message = "author is required")
    private String author;
    @NotBlank(message = "category is required")
    private String category;
    @NotNull(message = "release date is required")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date releaseDate;
    @NotNull(message = "page is required")
    private int page;
    @NotNull(message = "isbn is required")
    @Column(unique = true)
    private Long isbn;
    @NotBlank(message = "book cover URL is required")
    private String bookCoverURL;
    @NotNull(message = "number of new book is required")
    private int numOfNewBook;
    @NotNull(message = "number of old book is required")
    private int numOfOldBook;

    public Book(Long id, String bookName, String author, String category, Date releaseDate, int page, Long isbn, String bookCoverURL, int numOfNewBook, int numOfOldBook) {
        this.id = id;
        this.bookName = bookName;
        this.author = author;
        this.category = category;
        this.releaseDate = releaseDate;
        this.page = page;
        this.isbn = isbn;
        this.bookCoverURL = bookCoverURL;
        this.numOfNewBook = numOfNewBook;
        this.numOfOldBook = numOfOldBook;
    }

    public Book() {

    }

    public long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getIsbn() {
        return isbn;
    }

    public void setIsbn(Long isbn) {
        this.isbn = isbn;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public String getBookCoverURL() {
        return bookCoverURL;
    }

    public void setBookCoverURL(String bookCoverURL) {
        this.bookCoverURL = bookCoverURL;
    }

    public int getNumOfNewBook() {
        return numOfNewBook;
    }

    public void setNumOfNewBook(int numOfNewBook) {
        this.numOfNewBook = numOfNewBook;
    }

    public int getNumOfOldBook() {
        return numOfOldBook;
    }

    public void setNumOfOldBook(int numOfOldBook) {
        this.numOfOldBook = numOfOldBook;
    }
}