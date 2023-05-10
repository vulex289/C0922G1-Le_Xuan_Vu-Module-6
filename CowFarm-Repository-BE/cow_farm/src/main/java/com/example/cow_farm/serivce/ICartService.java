package com.example.cow_farm.serivce;

import com.example.cow_farm.model.order.Cart;

public interface ICartService {
    Cart save(Cart cart);
    Cart findById(Long accountId);
    void deleteByCartId(Long cartId);
}
