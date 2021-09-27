package com.rmit.sept.bk_transactionservices.Repositories;

import com.rmit.sept.bk_transactionservices.model.Sell;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SellRepository extends CrudRepository<Sell, Long> {
    List<Sell> findAllByBookISBN(Long bookISBN);
    List<Sell> findAllBySellerUsername(Long sellerUsername);
}
