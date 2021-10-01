package com.rmit.sept.bk_transactionservices.validator;

import com.rmit.sept.bk_transactionservices.Repositories.SellRepository;
import com.rmit.sept.bk_transactionservices.model.Sell;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Date;

@Component
public class SellValidator implements Validator {

    @Autowired
    private SellRepository sellRepository;

    @Override
    public boolean supports(Class<?> aClass) {
        return Sell.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        Sell sell = (Sell) object;

        // Make sure that newbook + old book > 0
        if (sell.getNumOfBook() <= 0) {
            errors.rejectValue("numOfBook", "Zero", "Number of Books should be at least 1");
        }

        // Release date cannot be a date in the future
        Date currentDate = new Date(System.currentTimeMillis());

        if (sell.getOnSaleDate().after(currentDate) && !sell.getOnSaleDate().equals(currentDate)) {
            errors.rejectValue("sellDate", "Date", "Date must be before the current date");
        }
    }
}
