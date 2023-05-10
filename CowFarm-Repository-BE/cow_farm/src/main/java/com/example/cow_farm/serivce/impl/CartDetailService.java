package com.example.cow_farm.serivce.impl;

import com.example.cow_farm.dto.ICartDetailDto;
import com.example.cow_farm.dto.ICartDetailDto2;
import com.example.cow_farm.model.order.CartDetail;
import com.example.cow_farm.repository.ICartDetailRepository;
import com.example.cow_farm.serivce.ICartDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartDetailService implements ICartDetailService {
    @Autowired
    private ICartDetailRepository cartDetailRepository;

    @Override
    public CartDetail save(CartDetail cartDetail) {
        return cartDetailRepository.save(cartDetail);
    }

    @Override
    public List<ICartDetailDto2> findvAllByAccountId(Long accountId) {
        return cartDetailRepository.findAllvCartDetailByAccountId(accountId);
    }

    @Override
    public List<Long> findAllvCartDetailByAccountIdAndIsDelete(Long accountId) {
        return cartDetailRepository.findAllvCartDetailByAccountIdAndIsDelete(accountId);
    }


    @Override
    public List<ICartDetailDto> findAllByAccountId(Long accountId) {
        return cartDetailRepository.findAllCartDetailByAccountId(accountId);
    }



    @Override
    public CartDetail findById(Long cartDetailId) {
        return cartDetailRepository.findById(cartDetailId).orElse(null);
    }

    @Override
    public void deleteByProductId(Long cartId, Long productId) {
        this.cartDetailRepository.deleteCartDetailByCartCartIdAndProductProductId(cartId,productId);
    }

    @Override
    public void updateQuantityOfCartDetail(int quantity, Long cartDetailId) {
        this.cartDetailRepository.updateQuantityOfCartDetail(quantity,cartDetailId);
    }

    @Override
    public void deleteAllCartVDetail(Long accountId) {
        this.cartDetailRepository.deleteAllCartVDetail(accountId);
    }

    @Override
    public CartDetail findByIdAnIsDelete(Long cartDetailId) {
        return this.cartDetailRepository.findCartDetailVByIdAndIsDelete(cartDetailId);
    }


}
