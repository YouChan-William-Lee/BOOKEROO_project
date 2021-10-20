package com.rmit.sept.bk_transactionservices;

import com.rmit.sept.bk_transactionservices.model.Transaction;
import com.rmit.sept.bk_transactionservices.model.TransactionState;

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
}
