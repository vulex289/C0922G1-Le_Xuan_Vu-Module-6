package com.example.cow_farm.repository;

import com.example.cow_farm.model.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Transactional
public interface IProductRepository extends JpaRepository<Product,Long> {
    List<Product> findAll();

    @Query(value = "select * from product where product_name like concat('%',:nameSearch,'%') and flag_delete = 1",nativeQuery = true)
    List<Product>findAllByName(@Param("nameSearch") String nameSearch);
    @Modifying
    @Query(value = "update product set inventory_level = :value where product_id = :id",nativeQuery = true)
    void setInventoryLevelByProductId(@Param("value") int inventoryLevelId,@Param("id")Long productId);
}
