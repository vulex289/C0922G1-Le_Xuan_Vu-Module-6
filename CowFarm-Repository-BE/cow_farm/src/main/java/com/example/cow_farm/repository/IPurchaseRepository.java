package com.example.cow_farm.repository;

import com.example.cow_farm.model.order.PurchaseHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IPurchaseRepository extends JpaRepository<PurchaseHistory,Long> {
    @Query(value = "select * from purchase_history p where p.account_account_id = :id order by p.purchase_history_id desc ",nativeQuery = true)
    List<PurchaseHistory> findAllByVAccountId(@Param("id") Long accountId);
}
