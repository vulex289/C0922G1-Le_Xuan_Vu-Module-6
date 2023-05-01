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
    @Autowired
    private IAccountService accountService;
    @Autowired
    private ICartService cartService;
    @Autowired
    private ICartDetailService cartDetailService;

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

    @GetMapping("/api/product-detail/addCart/{productId}/{accountId}/{quantity}")
    public ResponseEntity<CartDetail> saveCartDetailByUserIdAndProductId(@PathVariable Long productId,
                                                                         @PathVariable Long accountId, @PathVariable int quantity) {
        Product product = productService.findById(productId);
        Account account = accountService.findAccountById(accountId);

        List<ICartDetailDto> cartDetailDtoList = cartDetailService.findAllByAccountId(accountId);
        for (ICartDetailDto cartDetailDto : cartDetailDtoList) {
            if (Objects.equals(cartDetailDto.getProductId(), productId) && quantity == 1) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            if (Objects.equals(cartDetailDto.getProductId(), productId) && quantity > 1) {
                CartDetail cartDetail = cartDetailService.findById(cartDetailDto.getCartDetailId());
                cartDetail.setQuantity(quantity);
                cartDetailService.save(cartDetail);
                return new ResponseEntity<>(cartDetail, HttpStatus.OK);
            }
        }
        Cart cart = new Cart();
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        String dateNow = simpleDateFormat.format(date);
        cart.setDateOrder(dateNow);
        cart.setAccount(account);
        cartService.save(cart);
        CartDetail cartDetail = new CartDetail();
        cartDetail.setCart(cart);
        cartDetail.setProduct(product);
        cartDetail.setQuantity(quantity);
        CartDetail cartDetail1 = cartDetailService.save(cartDetail);
        return new ResponseEntity<>(cartDetail1, HttpStatus.CREATED);
    }

    @GetMapping("/api/cart/{accountId}")
    public ResponseEntity<List<ICartDetailDto2>> findAllCartByAccountId(@PathVariable Long accountId) {
        List<ICartDetailDto2> cartDetailDtoList = cartDetailService.findvAllByAccountId(accountId);
        return new ResponseEntity<>(cartDetailDtoList, HttpStatus.OK);
    }
}