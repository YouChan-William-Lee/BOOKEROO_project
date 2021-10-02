package com.rmit.sept.bk_transactionservices.validator;

import com.rmit.sept.bk_transactionservices.Repositories.ShareRepository;
import com.rmit.sept.bk_transactionservices.model.Share;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Date;

@Component
public class ShareValidator implements Validator {

    @Autowired
    private ShareRepository shareRepository;

    @Override
    public boolean supports(Class<?> aClass) {
        return Share.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        Share share = (Share) object;

        // Make sure that newbook + old book > 0
        if (share.getNumOfOldBook() <= 0) {
            errors.rejectValue("numOfOldBook", "Zero", "Number of old Books should be at least 1");
        }

        // Release date cannot be a date in the future
        Date currentDate = new Date(System.currentTimeMillis());

        if (share.getSharedDate().after(currentDate) && !share.getSharedDate().equals(currentDate)) {
            errors.rejectValue("sharedDate", "Date", "Date must be before the current date");
        }
    }

}
