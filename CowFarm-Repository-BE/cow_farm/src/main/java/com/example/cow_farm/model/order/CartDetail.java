package com.example.cow_farm.model.order;

import com.example.cow_farm.model.product.Product;

import javax.persistence.*;


@Entity
public class CartDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_detail_id")
    private Long cartDetailId;
    private double quantity;
    @ManyToOne
    @JoinColumn(name = "cart_id",referencedColumnName = "cart_id")
    private Cart cart;
    @ManyToOne
    @JoinColumn(name = "product_id",referencedColumnName = "product_id")
    private Product product;

    public CartDetail() {
    }

    public Long getCartDetailId() {
        return cartDetailId;
    }

    public void setCartDetailId(Long cartDetailId) {
        this.cartDetailId = cartDetailId;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
