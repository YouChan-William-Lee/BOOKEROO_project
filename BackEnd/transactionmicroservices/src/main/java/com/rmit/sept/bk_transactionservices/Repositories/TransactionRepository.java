package com.rmit.sept.bk_transactionservices.Repositories;

import com.rmit.sept.bk_transactionservices.model.Transaction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends CrudRepository<Transaction, Long> {

    List<Transaction> findAllByBookISBN(Long bookISBN);
    List<Transaction> findAllBySellerUsername(String sellerUsername);
    List<Transaction> findAllByBuyerUsername(String buyerUsername);
}
