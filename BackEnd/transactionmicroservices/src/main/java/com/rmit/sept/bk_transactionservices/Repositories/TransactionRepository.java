package com.rmit.sept.bk_transactionservices.Repositories;

import com.rmit.sept.bk_transactionservices.model.Transaction;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends CrudRepository<Transaction, Long> {

    List<Transaction> findAllByBookISBN(Long bookISBN);
    List<Transaction> findAllBySellerORdonatorUsername(String sellerORdonatorUsername);
    List<Transaction> findAllByBuyerORgrantorUsername(String buyerORgrantorUsername);

    List<Transaction> findAll(Sort transactionDate);
}
