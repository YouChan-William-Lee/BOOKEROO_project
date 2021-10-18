package com.rmit.sept.bk_transactionservices.web;

import com.rmit.sept.bk_transactionservices.Repositories.TransactionRepository;
import com.rmit.sept.bk_transactionservices.model.Transaction;
import com.rmit.sept.bk_transactionservices.model.TransactionState;
import com.rmit.sept.bk_transactionservices.services.MapValidationErrorService;
import com.rmit.sept.bk_transactionservices.services.TransactionService;
import com.rmit.sept.bk_transactionservices.validator.TransactionValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private TransactionValidator transactionValidator;

    @Autowired
    private TransactionRepository transactionRepository;


    // Already on the /transactions so no need to repeat naming
    @CrossOrigin
    @PostMapping("/registertransaction")
    public ResponseEntity<?> registerTransaction(@Valid @RequestBody Transaction transaction, BindingResult result) {
        Date currentDate = new Date(System.currentTimeMillis());

        transaction.setTransactionDate(currentDate);
        transaction.setTransactionState(TransactionState.APPROVED);

        transactionValidator.validate(transaction, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null)
            return errorMap;
        Transaction newTransaction = transactionService.saveTransaction(transaction);
        return new ResponseEntity<Transaction>(newTransaction, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public @ResponseBody ResponseEntity<?> getAllTransactions() {
        return new ResponseEntity<>(transactionService.getAllTransactions(), HttpStatus.OK);
    }

    @GetMapping("/allonlyuser/{username}")
    public @ResponseBody ResponseEntity<?> getTransactionsFor(@PathVariable String username) {
        return new ResponseEntity<>(transactionService.getTransactionsFor(username), HttpStatus.OK);
    }

    @GetMapping("/alllatestfirst")
    public @ResponseBody ResponseEntity<?> getLatestTransactionsFirst() {
        return new ResponseEntity<>(transactionService.getLatestTransactionsFirst(), HttpStatus.OK);
    }

    @GetMapping("/alloldestfirst")
    public @ResponseBody ResponseEntity<?> getOldestTransactionsFirst() {
        return new ResponseEntity<>(transactionService.getOldestTransactionsFirst(), HttpStatus.OK);
    }

    @GetMapping("/allsold")
    public @ResponseBody ResponseEntity<?> getAllSold() {
        return new ResponseEntity<>(transactionService.getAllSold(), HttpStatus.OK);
    }
}
