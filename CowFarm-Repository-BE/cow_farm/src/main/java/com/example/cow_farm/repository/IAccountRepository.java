package com.example.cow_farm.repository;

import com.example.cow_farm.model.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IAccountRepository extends JpaRepository<Account,Long> {
    @Query(value = "select a.* from  account as a where a.username= :email", nativeQuery = true)
    Account findAccountByEmail(@Param("email") String email);
}
