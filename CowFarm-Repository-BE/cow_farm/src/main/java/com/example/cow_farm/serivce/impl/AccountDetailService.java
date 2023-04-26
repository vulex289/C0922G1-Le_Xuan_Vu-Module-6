package com.example.cow_farm.serivce.impl;


import com.example.cow_farm.model.account.Account;
import com.example.cow_farm.repository.IAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by: Phạm Tiến
 * Date: 29/03/2023
 * Class: AccountDetailService
 */
@Service
public class AccountDetailService implements UserDetailsService {

    @Autowired
    private IAccountRepository accountRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) {
        Account account = accountRepository.findAccountByEmail(username);
        if (account == null) {
            throw new UsernameNotFoundException("User " + username + " was not found in the database");
        }
        return AccountDetails.build(account);
    }
}
