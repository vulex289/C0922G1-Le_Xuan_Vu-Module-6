package com.example.cow_farm.serivce;

import com.example.cow_farm.model.account.Account;

public interface IAccountService {
    Account findAccountByEmail(String email);
    boolean checkOldPassword(String oldPassword, String password);


}
