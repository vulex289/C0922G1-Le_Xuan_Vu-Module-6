package com.example.cow_farm.serivce.impl;

import com.example.cow_farm.model.order.PurchaseHistory;
import com.example.cow_farm.repository.IPurchaseRepository;
import com.example.cow_farm.serivce.IPurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PurchaseService implements IPurchaseService {
    @Autowired
    private IPurchaseRepository purchaseRepository;
    @Override
    public PurchaseHistory save(PurchaseHistory purchaseHistory) {
        return purchaseRepository.save(purchaseHistory);
    }

    @Override
    public List<PurchaseHistory> findAllByAccount_AccountId(Long accountId) {
        return this.purchaseRepository.findAllByVAccountId(accountId);
    }
}
