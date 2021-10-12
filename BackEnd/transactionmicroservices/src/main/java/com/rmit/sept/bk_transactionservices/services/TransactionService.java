package com.rmit.sept.bk_transactionservices.services;

import com.rmit.sept.bk_transactionservices.Repositories.TransactionRepository;
import com.rmit.sept.bk_transactionservices.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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

    public List<Transaction> getLatestTransactionsFirst() {
        List<Transaction> transactions = new ArrayList<Transaction>();
        for (Transaction transaction : transactionRepository.findAll(Sort.by(Sort.Direction.ASC, "transactionDate"))) {
            transactions.add(transaction);
        }
        return transactions;
    }

    public List<Transaction> getOldestTransactionsFirst() {
        List<Transaction> transactions = new ArrayList<Transaction>();
        for (Transaction transaction : transactionRepository.findAll(Sort.by(Sort.Direction.DESC, "transactionDate"))) {
            transactions.add(transaction);
        }
        return transactions;
    }

    public List<Transaction> getAllSold() {
        List<Transaction> soldBooks = new ArrayList<Transaction>();
        for (Transaction item : transactionRepository.findAll()) {
            soldBooks.add(item);
        }
        return soldBooks;
    }
}
