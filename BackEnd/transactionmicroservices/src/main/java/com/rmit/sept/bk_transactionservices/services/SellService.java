package com.rmit.sept.bk_transactionservices.services;

import com.rmit.sept.bk_transactionservices.Repositories.SellRepository;
import com.rmit.sept.bk_transactionservices.Repositories.ShareRepository;
import com.rmit.sept.bk_transactionservices.model.Sell;
import com.rmit.sept.bk_transactionservices.model.Share;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SellService {

    @Autowired
    private SellRepository sellRepository;

    public Sell saveSell (Sell newSell) {
        try {
            return sellRepository.save(newSell);
        } catch (Exception e) {
            return null;
        }
    }
}
