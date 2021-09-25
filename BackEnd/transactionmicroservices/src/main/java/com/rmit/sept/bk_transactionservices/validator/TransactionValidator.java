package com.rmit.sept.bk_transactionservices.validator;

import com.rmit.sept.bk_transactionservices.Repositories.TransactionRepository;
import com.rmit.sept.bk_transactionservices.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Date;

@Component
public class TransactionValidator implements Validator {

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public boolean supports(Class<?> aClass) {
        return Transaction.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        Transaction transaction = (Transaction) object;

        if(transaction.getNumOfBook() <= 0) {
            errors.rejectValue("numOfBook", "Zero", "Number of new or old Books should be at least 1");
        }

        Date currentDate = new Date(System.currentTimeMillis());

        if (transaction.getTransactionDate().after(currentDate) && !transaction.getTransactionDate().equals(currentDate)) {
            errors.rejectValue("transactionDate", "Date", "Date must be before the current date");
        }
    }
}
