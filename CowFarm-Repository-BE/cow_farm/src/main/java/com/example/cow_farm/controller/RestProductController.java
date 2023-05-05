package com.example.cow_farm.controller;

import com.example.cow_farm.dto.ICartDetailDto;
import com.example.cow_farm.dto.ICartDetailDto2;
import com.example.cow_farm.model.account.Account;
import com.example.cow_farm.model.order.Cart;
import com.example.cow_farm.model.order.CartDetail;
import com.example.cow_farm.model.product.Product;
import com.example.cow_farm.serivce.IAccountService;
import com.example.cow_farm.serivce.ICartDetailService;
import com.example.cow_farm.serivce.ICartService;
import com.example.cow_farm.serivce.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin("*")
public class RestProductController {
    @Autowired
    private IProductService productService;


    @GetMapping("api/product/list")
    public ResponseEntity<List<Product>> findAll() {
        List<Product> products = productService.findAll();
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(products, HttpStatus.OK);
        }
    }

    @GetMapping("api/product")
    public ResponseEntity<List<Product>> findAll(@RequestParam(defaultValue = "", required = false) String nameSearch) {
        List<Product> products = productService.findAllByName(nameSearch);
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(products, HttpStatus.OK);
        }
    }

    @GetMapping("/api/product-detail/{productId}")
    public ResponseEntity<Product> findProductById(@PathVariable Long productId) {
        Product product = productService.findById(productId);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(product, HttpStatus.OK);
        }
    }


}