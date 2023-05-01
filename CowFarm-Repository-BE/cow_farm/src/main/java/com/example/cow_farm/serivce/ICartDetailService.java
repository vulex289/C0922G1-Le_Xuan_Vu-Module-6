package com.example.cow_farm.serivce;

import com.example.cow_farm.dto.ICartDetailDto;
import com.example.cow_farm.dto.ICartDetailDto2;
import com.example.cow_farm.model.order.CartDetail;

import java.util.List;

public interface ICartDetailService {
    CartDetail save(CartDetail cartDetail);
    List<ICartDetailDto2> findvAllByAccountId(Long accountId);
    List<ICartDetailDto> findAllByAccountId(Long accountId);
    CartDetail findById(Long cartDetailId);
}
