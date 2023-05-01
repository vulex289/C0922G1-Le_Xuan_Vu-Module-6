package com.example.cow_farm.model.product;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.Set;

@Entity
public class ProductUnit {
    @Id
    @Column(name = "product_unit_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productUnitId;
    private String name;
    @OneToMany(mappedBy = "productUnit")
    @JsonBackReference
    private Set<Product> productSet;
    public ProductUnit() {
    }

    public Set<Product> getProductSet() {
        return productSet;
    }

    public void setProductSet(Set<Product> productSet) {
        this.productSet = productSet;
    }

    public int getProductUnitId() {
        return productUnitId;
    }

    public void setProductUnitId(int productUnitId) {
        this.productUnitId = productUnitId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
