package com.example.cow_farm.serivce;

import com.example.cow_farm.model.product.Product;

import java.util.List;

public interface IProductService {
    List<Product> findAll();
}
