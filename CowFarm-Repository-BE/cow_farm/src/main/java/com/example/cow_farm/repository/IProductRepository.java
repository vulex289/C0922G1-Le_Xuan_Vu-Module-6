package com.example.cow_farm.repository;

import com.example.cow_farm.model.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product,Long> {
    List<Product> findAll();

    @Query(value = "select * from product where product_name like concat('%',:nameSearch,'%') and flag_delete = 1",nativeQuery = true)
    List<Product>findAllByName(@Param("nameSearch") String nameSearch);
}
