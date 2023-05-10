package com.example.cow_farm.serivce.impl;

import com.example.cow_farm.model.product.Product;
import com.example.cow_farm.repository.IProductRepository;
import com.example.cow_farm.serivce.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements IProductService {
    @Autowired
    private IProductRepository productRepository;
    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> findAllByName(String nameSearch) {
        return this.productRepository.findAllByName(nameSearch);
    }

    @Override
    public Product findById(Long productId) {
        return productRepository.findById(productId).orElse(null);
    }

    @Override
    public void setInventoryLevelByProductId(int inventoryLevelId, Long productId) {
        this.productRepository.setInventoryLevelByProductId(inventoryLevelId,productId);
    }
}
