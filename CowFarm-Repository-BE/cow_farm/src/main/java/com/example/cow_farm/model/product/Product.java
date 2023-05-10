package com.example.cow_farm.model.product;

import com.example.cow_farm.model.order.CartDetail;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;
    private String productName;
    @Column(columnDefinition = "TEXT")
    private String description;
    private double price;
    private int inventoryLevel;
    @ElementCollection
    private List<String> imageList = new ArrayList<>();
    private Boolean flagDelete;

    @ManyToOne
    @JoinColumn(name = "product_type_id", referencedColumnName = "product_type_id")
    private ProductType productType;

    @ManyToOne
    @JoinColumn(name = "product_unit_id", referencedColumnName = "product_unit_id")
    private ProductUnit productUnit;
    @OneToMany(mappedBy = "product")
    @JsonBackReference
    private Set<CartDetail>orderDetails;

    public Product() {
    }

    public Set<CartDetail> getOrderDetails() {
        return orderDetails;
    }

    public ProductUnit getProductUnit() {
        return productUnit;
    }

    public int getInventoryLevel() {
        return inventoryLevel;
    }

    public void setInventoryLevel(int inventoryLevel) {
        this.inventoryLevel = inventoryLevel;
    }

    public void setProductUnit(ProductUnit productUnit) {
        this.productUnit = productUnit;
    }

    public void setOrderDetails(Set<CartDetail> orderDetails) {
        this.orderDetails = orderDetails;
    }

    public Boolean getFlagDelete() {
        return flagDelete;
    }

    public void setFlagDelete(Boolean flagDelete) {
        this.flagDelete = flagDelete;
    }

    public ProductType getProductType() {
        return productType;
    }

    public void setProductType(ProductType productType) {
        this.productType = productType;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public List<String> getImageList() {
        return imageList;
    }

    public void setImageList(List<String> imageList) {
        this.imageList = imageList;
    }
}
