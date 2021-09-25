package com.rmit.sept.bk_transactionservices.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class Share {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Donator username is required")
    private String donatorUsername;

    @NotBlank(message = "Grantor username is required")
    private String grantorUsername;

    @NotBlank(message = "Book ISBN is required")
    private Long bookISBN;

    @NotNull(message = "Book state must e defined")
    @Enumerated(EnumType.STRING)
    private BookState bookState;

    @NotNull(message = "Shared date is required")
    @JsonFormat(pattern="yyyy-MM=dd")
    private Date sharedDate;

    @Min(0)
    private int numOfBook;

    public Share() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDonatorUsername() {
        return donatorUsername;
    }

    public void setDonatorUsername(String donatorUsername) {
        donatorUsername = donatorUsername;
    }

    public String getGrantorUsername() {
        return grantorUsername;
    }

    public void setGrantorUsername(String grantorUsername) {
        grantorUsername = grantorUsername;
    }

    public Long getBookISBN() {
        return bookISBN;
    }

    public void setBookISBN(Long bookISBN) {
        bookISBN = bookISBN;
    }

    public BookState getBookState() {
        return bookState;
    }

    public void setBookState(BookState bookState) {
        this.bookState = bookState;
    }

    public Date getSharedDate() {
        return sharedDate;
    }

    public void setSharedDate(Date sharedDate) {
        this.sharedDate = sharedDate;
    }

    public int getNumOfBook() {
        return numOfBook;
    }

    public void setNumOfBook(int numOfBook) {
        this.numOfBook = numOfBook;
    }

    @PrePersist
    protected void onCreate() {
        this.sharedDate = new Date();
    }
}
