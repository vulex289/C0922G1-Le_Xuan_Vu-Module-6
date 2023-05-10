package com.example.cow_farm.model.order;

import com.example.cow_farm.model.account.Account;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.Set;

@Entity
public class PurchaseHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "purchase_history_id")
    private Long purchaseHistoryId;
    private String billCode;
    @Column(columnDefinition = "DATE TIME")
    private String dateOrder;
    private double total;
    @ManyToOne
    private Account account;
    @OneToMany(mappedBy = "purchaseHistory")
    @JsonBackReference
    private Set<CartDetail> cartDetailSet;

    public PurchaseHistory() {
    }

    public Long getPurchaseHistoryId() {
        return purchaseHistoryId;
    }

    public void setPurchaseHistoryId(Long purchaseHistoryId) {
        this.purchaseHistoryId = purchaseHistoryId;
    }

    public String getBillCode() {
        return billCode;
    }

    public void setBillCode(String billCode) {
        this.billCode = billCode;
    }

    public String getDateOrder() {
        return dateOrder;
    }

    public void setDateOrder(String dateOrder) {
        this.dateOrder = dateOrder;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Set<CartDetail> getCartDetailSet() {
        return cartDetailSet;
    }

    public void setCartDetailSet(Set<CartDetail> cartDetailSet) {
        this.cartDetailSet = cartDetailSet;
    }
}
