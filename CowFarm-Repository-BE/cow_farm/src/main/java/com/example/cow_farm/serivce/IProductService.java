package com.example.cow_farm.serivce;

import com.example.cow_farm.model.product.Product;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProductService {
    List<Product> findAll();
    List<Product> findAllByName(String nameSearch);
    Product findById(Long productId);
    void setInventoryLevelByProductId( int inventoryLevelId, Long productId);
}
