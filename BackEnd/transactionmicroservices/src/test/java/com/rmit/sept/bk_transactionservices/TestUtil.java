package com.rmit.sept.bk_transactionservices;

import com.rmit.sept.bk_transactionservices.model.Share;
import com.rmit.sept.bk_transactionservices.model.Transaction;

import java.util.Date;

public class TestUtil {

    public static Transaction createValidTransaction() {
        Transaction transaction = new Transaction();
        transaction.setIsbn(12345678912L);
        transaction.setBuyerUsername("buy@gmail.com");
        transaction.setUsername("seller@gmail.com");
        transaction.setNumOfNewBook(1);
        transaction.setNumOfOldBook(0);
        transaction.setTotalPrice(5.69f);
        return transaction;
    }

    public static Share createValidShare() {
        Share share = new Share();
        share.setBookISBN(12345678912L);
        share.setNumOfOldBook(1);
        share.setDonatorUsername("seller@gmail.com");
        return share;
    }
}
