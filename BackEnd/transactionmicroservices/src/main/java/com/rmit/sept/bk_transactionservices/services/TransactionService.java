package com.rmit.sept.bk_transactionservices.services;

import com.rmit.sept.bk_transactionservices.Repositories.TransactionRepository;
import com.rmit.sept.bk_transactionservices.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction saveTransaction (Transaction newTransaction) {
        try {
            return transactionRepository.save(newTransaction);
        } catch (Exception e) {
            return null;
        }
    }

    public List<Transaction> getAllTransactions () {
        List<Transaction> transactions = new ArrayList<Transaction>();
        for (Transaction transaction : transactionRepository.findAll()) {
            transactions.add(transaction);
        }
        return transactions;
    }
}
