package com.rmit.sept.bk_transactionservices.Repositories;

import com.rmit.sept.bk_transactionservices.model.Transaction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends CrudRepository<Transaction, Long> {

    List<Transaction> findAllByBookISBN(Long bookISBN);
    List<Transaction> findAllBySeller_or_donatorUsername(String seller_or_donatorUsername);
    List<Transaction> findAllByBuyer_or_grantorUsername(String buyer_or_grantorUsername);
}
