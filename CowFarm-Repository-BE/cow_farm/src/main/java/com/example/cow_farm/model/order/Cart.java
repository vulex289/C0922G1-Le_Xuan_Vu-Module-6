package com.example.cow_farm.model.order;

import com.example.cow_farm.model.account.Account;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long cartId;
    @Column(columnDefinition = "DATE")
    private String dateOrder;
    @ManyToOne
    @JoinColumn(name = "account_id",referencedColumnName = "account_id")
    private Account account;
    private Boolean flagDelete;
    @OneToMany(mappedBy = "cart")
    @JsonBackReference
    private Set<CartDetail> cartDetailSet;

    public Cart() {
    }

    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }

    public String getDateOrder() {
        return dateOrder;
    }

    public void setDateOrder(String dateOrder) {
        this.dateOrder = dateOrder;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Boolean getFlagDelete() {
        return flagDelete;
    }

    public void setFlagDelete(Boolean flagDelete) {
        this.flagDelete = flagDelete;
    }

    public Set<CartDetail> getCartDetailSet() {
        return cartDetailSet;
    }

    public void setCartDetailSet(Set<CartDetail> cartDetailSet) {
        this.cartDetailSet = cartDetailSet;
    }
}
