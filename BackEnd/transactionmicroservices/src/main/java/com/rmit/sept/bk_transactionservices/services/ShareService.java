package com.rmit.sept.bk_transactionservices.services;

import com.rmit.sept.bk_transactionservices.Repositories.ShareRepository;
import com.rmit.sept.bk_transactionservices.model.Share;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShareService {

    @Autowired
    private ShareRepository shareRepository;

    public Share saveShare (Share newShare) {
        try {
            return shareRepository.save(newShare);
        } catch (Exception e) {
            return null;
        }
    }
}
