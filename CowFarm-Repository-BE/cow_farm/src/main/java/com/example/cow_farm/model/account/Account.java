package com.example.cow_farm.model.account;


import com.example.cow_farm.model.order.Cart;
import com.example.cow_farm.model.order.PurchaseHistory;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Account {
    @Id
    @Column(name = "account_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;
    @Column(columnDefinition = "varchar(50)", unique = true)
    private String username;
    @JsonIgnore
    private String password;
    @Column(columnDefinition = "varchar(50)", unique = true)
    private String email;
    @Column(columnDefinition = "varchar(50)", unique = true)
    private String phoneNumber;
    @Column(columnDefinition = "varchar(255)", unique = true)
    private String address;
    @Column(columnDefinition = "varchar(50)")
    private String name;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String avatar;
    @OneToMany(mappedBy = "account")
    @JsonBackReference
    private Set<AccountRole> accountRoleSet;
    @OneToMany(mappedBy = "account")
    @JsonBackReference
    private Set<PurchaseHistory> purchaseHistorySet;
    @OneToMany(mappedBy = "account")
    @JsonBackReference
    private Set<Cart> orderSet;

    public Account() {
    }

    public Set<Cart> getOrderSet() {
        return orderSet;
    }

    public Set<PurchaseHistory> getPurchaseHistorySet() {
        return purchaseHistorySet;
    }

    public void setPurchaseHistorySet(Set<PurchaseHistory> purchaseHistorySet) {
        this.purchaseHistorySet = purchaseHistorySet;
    }

    public void setOrderSet(Set<Cart> orderSet) {
        this.orderSet = orderSet;
    }

    public Set<AccountRole> getAccountRoleSet() {
        return accountRoleSet;
    }

    public void setAccountRoleSet(Set<AccountRole> accountRoleSet) {
        this.accountRoleSet = accountRoleSet;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
