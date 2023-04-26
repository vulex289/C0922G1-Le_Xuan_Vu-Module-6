package com.example.cow_farm.controller;


import com.example.cow_farm.model.account.Account;
import com.example.cow_farm.serivce.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class AccountController {
    @Autowired
    private IAccountService accountService;
    @GetMapping("api/account/{email}")
    public ResponseEntity<Account>findUserByEmail(@PathVariable String email){
        Account account = accountService.findAccountByEmail(email);
        if (account == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else {
            return new ResponseEntity<>(account,HttpStatus.OK);
        }
    }
}
