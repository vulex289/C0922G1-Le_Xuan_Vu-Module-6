package com.example.cow_farm.controller;

import com.example.cow_farm.model.product.Product;
import com.example.cow_farm.serivce.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
@CrossOrigin("*")
public class RestProductController {
    @Autowired
    private IProductService productService;
    @GetMapping("api/product/list")
    public ResponseEntity<List<Product>>findAll(){
        List<Product>products = productService.findAll();
        if (products.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else {
            return new ResponseEntity<>(products,HttpStatus.OK);
        }
    }
}
