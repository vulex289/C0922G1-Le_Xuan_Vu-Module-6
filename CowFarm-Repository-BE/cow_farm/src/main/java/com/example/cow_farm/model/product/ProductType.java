package com.example.cow_farm.model.product;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.Set;

@Entity
public class ProductType {
    @Id
    @Column(name = "product_type_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productTypeId;
    @Column(columnDefinition = "varchar(100)")
    private String productTypeName;
    @OneToMany(mappedBy = "productType")
    @JsonBackReference
    private Set<Product> products;

    public ProductType() {
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Long getProductTypeId() {
        return productTypeId;
    }

    public void setProductTypeId(Long productTypeId) {
        this.productTypeId = productTypeId;
    }

    public String getProductTypeName() {
        return productTypeName;
    }

    public void setProductTypeName(String productTypeName) {
        this.productTypeName = productTypeName;
    }
}
