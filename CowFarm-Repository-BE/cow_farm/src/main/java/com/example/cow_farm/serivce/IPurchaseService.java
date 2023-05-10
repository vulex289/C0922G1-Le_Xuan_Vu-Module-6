package com.example.cow_farm.serivce;

import com.example.cow_farm.model.order.PurchaseHistory;

import java.util.List;

public interface IPurchaseService {
    PurchaseHistory save(PurchaseHistory purchaseHistory);
    List<PurchaseHistory> findAllByAccount_AccountId(Long accountId);
}
