package com.rmit.sept.bk_transactionservices.Repositories;

import com.rmit.sept.bk_transactionservices.model.Share;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShareRepository extends CrudRepository<Share, Long> {

    List<Share> findAllByBookISBN(Long bookISBN);
    List<Share> findAllByDonatorUsername(String donatorUsername);
}
