package com.rmit.sept.bk_loginservices.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ISBN;

    @NotBlank(message = "book name is required")
    @Column(unique = true)
    private String bookName;
    @NotBlank(message = "author is required")
    private String author;
    @NotBlank(message = "category is required")
    private String category;
    @NotBlank(message = "release date is required")
    private Date releaseDate;
    @NotBlank(message = "page is required")
    private int page;
    @NotBlank(message = "book cover URL is required")
    private String bookCoverURL;
    @NotBlank(message = "number of new book is required")
    private int numOfNewBook;
    @NotBlank(message = "number of old book is required")
    private int numOfOldBook;

//    public Book(long ISBN, String bookName, String author, String category, Date releaseDate, int page, String bookCoverURL, int numOfNewBook, int numOfOldBook) {
//        this.ISBN = ISBN;
//        this.bookName = bookName;
//        this.author = author;
//        this.category = category;
//        this.releaseDate = releaseDate;
//        this.page = page;
//        this.bookCoverURL = bookCoverURL;
//        this.numOfNewBook = numOfNewBook;
//        this.numOfOldBook = numOfOldBook;
//    }

    public Book() {

    }

    public long getISBN() {
        return ISBN;
    }

    public void setISBN(long ISBN) {
        this.ISBN = ISBN;
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
