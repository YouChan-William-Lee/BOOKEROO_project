package com.rmit.sept.bk_transactionservices.web;

import com.rmit.sept.bk_transactionservices.Repositories.ShareRepository;
import com.rmit.sept.bk_transactionservices.Repositories.TransactionRepository;
import com.rmit.sept.bk_transactionservices.model.Transaction;
import com.rmit.sept.bk_transactionservices.services.MapValidationErrorService;
import com.rmit.sept.bk_transactionservices.services.ShareService;
import com.rmit.sept.bk_transactionservices.services.TransactionService;
import com.rmit.sept.bk_transactionservices.validator.ShareValidator;
import com.rmit.sept.bk_transactionservices.validator.TransactionValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private ShareService shareService;

    @Autowired
    private TransactionValidator transactionValidator;

    @Autowired
    private ShareValidator shareValidator;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private ShareRepository shareRepository;

    // Already on the /transactions so no need to repeat naming
    @CrossOrigin
    @PostMapping("/new")
    public ResponseEntity<?> registerUser(@Valid @RequestBody Transaction transaction, BindingResult result) {

        // Validate passwords match
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

    @GetMapping("/alltransactions")
    public @ResponseBody ResponseEntity<?> getLatestTransactionsFirst() {
        return new ResponseEntity<>(transactionService.getLatestTransactionsFirst(), HttpStatus.OK);
    }

    @GetMapping("/alltransactions")
    public @ResponseBody ResponseEntity<?> getOldestTransactionsFirst() {
        return new ResponseEntity<>(transactionService.getOldestTransactionsFirst(), HttpStatus.OK);
    }
}
