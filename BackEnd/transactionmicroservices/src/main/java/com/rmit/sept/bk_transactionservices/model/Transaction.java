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
    private String sellerORdonatorUsername;

    @NotBlank(message = "Buyer username is required")
    private String buyerORgrantorUsername;

    @NotBlank(message = "Book ISBN is required")
    private Long bookISBN;

    @NotNull(message = "Book state must be defined")
    @Enumerated(EnumType.STRING)
    private BookState bookState;

    @NotNull(message = "Transaction type must be defined")
    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;

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

    public String getSellerORdonatorUsername() {
        return sellerORdonatorUsername;
    }

    public void setSeller_or_donatorUsernamee(String seller_or_donatorUsername) {
        seller_or_donatorUsername = seller_or_donatorUsername;
    }

    public String getBuyerORgrantorUsername() {
        return buyerORgrantorUsername;
    }

    public void setBuyerORgrantorUsername(String buyer_or_grantorUsername) {
        buyer_or_grantorUsername = buyer_or_grantorUsername;
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

    public TransactionType getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
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
