package com.example.cow_farm.dto;

import java.util.List;

public interface ICartDetailDto {
    Long getCartId();
    Long getCartDetailId();
    String getProductName();
    String getDescription();
    int getPrice();
    int getQuantity();
    Long getProductId();
    Long getInventoryLevel();
}
