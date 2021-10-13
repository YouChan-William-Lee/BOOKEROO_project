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

    @NotBlank(message = "Book ISBN is required")
    private Long bookISBN;

    @NotNull(message = "Shared date is required")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date sharedDate;

    @Min(0)
    private int numOfOldBook;

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
        this.donatorUsername = donatorUsername;
    }

    public Long getBookISBN() {
        return bookISBN;
    }

    public void setBookISBN(Long bookISBN) {
        this.bookISBN = bookISBN;
    }

    public Date getSharedDate() {
        return sharedDate;
    }

    public void setSharedDate(Date sharedDate) {
        this.sharedDate = sharedDate;
    }

    public int getNumOfOldBook() {
        return numOfOldBook;
    }

    public void setNumOfOldBook(int numOfOldBook) {
        this.numOfOldBook = numOfOldBook;
    }
}
