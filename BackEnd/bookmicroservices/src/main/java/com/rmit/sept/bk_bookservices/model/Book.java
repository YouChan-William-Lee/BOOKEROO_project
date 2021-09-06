package com.rmit.sept.bk_bookservices.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class Book {

    @NotBlank(message = "book name is required")
    private String bookName;

    @NotBlank(message = "author is required")
    private String author;

    @NotBlank(message = "category is required")
    private String category;

    @NotNull(message = "release date is required")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date releaseDate;

    @Min(1)
    private int page;

    @NotNull(message = "isbn is required")
    @Id
    private Long isbn;

    @Column(columnDefinition="TEXT")
    @NotBlank(message = "book cover URL is required")
    private String bookCoverURL;

    @Min(0)
    private int numOfNewBook;

    @Min(0)
    private int numOfOldBook;

    private Date create_At;
    private Date update_At;

    public Book(String bookName, String author, String category, Date releaseDate, int page, Long isbn, String bookCoverURL, int numOfNewBook, int numOfOldBook) {
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

    public Date getCreate_At() {
        return create_At;
    }

    public void setCreate_At(Date create_At) {
        this.create_At = create_At;
    }

    public Date getUpdate_At() {
        return update_At;
    }

    public void setUpdate_At(Date update_At) {
        this.update_At = update_At;
    }

    public long getId() {
        return this.isbn;
    }

    public void setId(Long id) {
        this.isbn = id;
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

    @PrePersist
    protected void onCreate() {
        this.create_At = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.update_At = new Date();
    }
}