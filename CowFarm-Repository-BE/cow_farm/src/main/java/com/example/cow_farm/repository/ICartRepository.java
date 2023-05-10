package com.example.cow_farm.repository;

import com.example.cow_farm.model.order.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface ICartRepository extends JpaRepository<Cart,Long> {
    Cart findCartByAccount_AccountId(Long cartId);
    @Modifying
    void deleteCartByCartId(Long cartId);
}
