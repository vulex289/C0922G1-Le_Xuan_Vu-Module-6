package com.example.cow_farm.serivce.impl;

import com.example.cow_farm.model.order.Cart;
import com.example.cow_farm.repository.ICartRepository;
import com.example.cow_farm.serivce.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService implements ICartService {
    @Autowired
    private ICartRepository cartRepository;
    @Override
    public Cart save(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public Cart findById(Long accountId) {
        return cartRepository.findCartByAccount_AccountId(accountId);
    }

    @Override
    public void deleteByCartId(Long cartId) {
        this.cartRepository.deleteCartByCartId(cartId);
    }
}
