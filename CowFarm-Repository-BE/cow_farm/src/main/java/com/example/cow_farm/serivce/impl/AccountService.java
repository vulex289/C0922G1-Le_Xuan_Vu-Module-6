package com.example.cow_farm.serivce.impl;


import com.example.cow_farm.model.account.Account;
import com.example.cow_farm.repository.IAccountRepository;
import com.example.cow_farm.serivce.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class AccountService implements IAccountService {
   @Autowired
   private IAccountRepository accountRepository;

    @Override
    public Account findAccountByEmail(String email) {
        return accountRepository.findAccountByEmail(email);
    }

    @Override
    public Account findAccountById(Long accountId) {
        return accountRepository.findById(accountId).orElse(null);
    }

    @Override
    public boolean checkOldPassword(String oldPassword, String password) {
        return BCrypt.checkpw(oldPassword,password);
    }

}
