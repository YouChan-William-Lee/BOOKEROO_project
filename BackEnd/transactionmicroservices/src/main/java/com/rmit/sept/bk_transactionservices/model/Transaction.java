package com.rmit.sept.bk_transactionservices.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Seller username is required")
    private String sellerUsername;

    @NotBlank(message = "Buyer username is required")
    private String buyerUsername;

    @NotBlank(message = "Book ISBN is required")
    private Long bookISBN;

    @NotNull(message = "Book state must e defined")
    @Enumerated(EnumType.STRING)
    private BookState bookState;

    @NotNull(message = "Transaction date is required")
    @JsonFormat(pattern="yyyy-MM=dd")
    private Date transactionDate;

    @Min(value = 1, message = "Price must be greater than 0")
    private float totalPrice;

    @Min(0)
    private int numOfBook;

    public Transaction() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSellerUsername() {
        return sellerUsername;
    }

    public void setSellerUsername(String sellerUsername) {
        sellerUsername = sellerUsername;
    }

    public String getBuyerUsername() {
        return buyerUsername;
    }

    public void setBuyerUsername(String buyerUsername) {
        buyerUsername = buyerUsername;
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

    public Date getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(Date transactionDate) {
        this.transactionDate = transactionDate;
    }

    public float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public int getNumOfBook() {
        return numOfBook;
    }

    public void setNumOfBook(int numOfBook) {
        this.numOfBook = numOfBook;
    }

    @PrePersist
    protected void onCreate() {
        this.transactionDate = new Date();
    }
}
