package com.example.cow_farm.repository;

import com.example.cow_farm.model.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product,Long> {
    List<Product> findAll();
}
