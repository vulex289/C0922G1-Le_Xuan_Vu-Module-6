package com.example.cow_farm.controller;

import com.example.cow_farm.dto.ICartDetailDto;
import com.example.cow_farm.dto.ICartDetailDto2;
import com.example.cow_farm.model.account.Account;
import com.example.cow_farm.model.order.Cart;
import com.example.cow_farm.model.order.CartDetail;
import com.example.cow_farm.model.order.PurchaseHistory;
import com.example.cow_farm.model.product.Product;
import com.example.cow_farm.serivce.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Random;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/cart/")
public class RestCartDetailController {
    @Autowired
    private IAccountService accountService;
    @Autowired
    private ICartService cartService;
    @Autowired
    private ICartDetailService cartDetailService;
    @Autowired
    private IProductService productService;
    @Autowired
    private IPurchaseService purchaseService;

    @GetMapping("product-detail/addCart/{productId}/{accountId}/{quantity}")
    public ResponseEntity<CartDetail> saveCartDetailByUserIdAndProductId(@PathVariable Long productId,
                                                                         @PathVariable Long accountId, @PathVariable int quantity) {
        Product product = productService.findById(productId);
        Account account = accountService.findAccountById(accountId);

        List<ICartDetailDto> cartDetailDtoList = cartDetailService.findAllByAccountId(accountId);
        for (ICartDetailDto cartDetailDto : cartDetailDtoList) {
            if (Objects.equals(cartDetailDto.getProductId(), productId)) {
                CartDetail cartDetail = cartDetailService.findById(cartDetailDto.getCartDetailId());
                int quantity1 = cartDetail.getQuantity() + quantity;
                if (quantity1 > cartDetailDto.getInventoryLevel()) {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                } else {
                    cartDetail.setQuantity(quantity1);
                    cartDetailService.save(cartDetail);
                    return new ResponseEntity<>(cartDetail, HttpStatus.OK);
                }
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

    @GetMapping("{accountId}")
    public ResponseEntity<List<ICartDetailDto2>> findAllCartByAccountId(@PathVariable Long accountId) {
        List<ICartDetailDto2> cartDetailDtoList = cartDetailService.findvAllByAccountId(accountId);
        return new ResponseEntity<>(cartDetailDtoList, HttpStatus.OK);
    }

    @DeleteMapping("cart-detail/{cartId}/{productId}")
    public ResponseEntity<?> deleteCartDetailByProductId(@PathVariable Long cartId, @PathVariable Long productId) {
        cartDetailService.deleteByProductId(cartId, productId);
        this.cartService.deleteByCartId(cartId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("deleteAll/cart-detail/{accountId}")
    public ResponseEntity<?> deleteAllCartDetailByAccountId(@PathVariable Long accountId) {
        this.cartDetailService.deleteAllCartVDetail(accountId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("cart-detail/updateQuantity/{cartDetailId}/{quantity}")
    public ResponseEntity<?> updateQuantityOfCartDetailByCartDetailId(@PathVariable Long cartDetailId, @PathVariable int quantity) {
        this.cartDetailService.updateQuantityOfCartDetail(quantity, cartDetailId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("cart-detail/purchaseHistory/list/{accountId}")
    public ResponseEntity<?> findAllPurchaseHistoryByAccountId(@PathVariable Long accountId) {
        List<PurchaseHistory> purchaseHistories = this.purchaseService.findAllByAccount_AccountId(accountId);
        return new ResponseEntity<>(purchaseHistories, HttpStatus.OK);
    }

    @GetMapping("cart-detail/purchaseHistory/{accountId}/{total}")
    public ResponseEntity<?> AddNewPurchaseHistory(
            @PathVariable Long accountId,
            @PathVariable int total) {
        List<Long> cartDetailDto2s = this.cartDetailService.findAllvCartDetailByAccountIdAndIsDelete(accountId);
        Account account = this.accountService.findAccountById(accountId);
        PurchaseHistory purchaseHistory = new PurchaseHistory();
        Random random = new Random();
        Date date = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        dateFormat.format(date);
        purchaseHistory.setDateOrder(dateFormat.format(date));
        purchaseHistory.setBillCode(String.valueOf(random.nextInt(90000) + 10000));
        purchaseHistory.setAccount(account);
        purchaseHistory.setTotal(total);
        this.purchaseService.save(purchaseHistory);
        for (Long num : cartDetailDto2s) {
            CartDetail cartDetail = cartDetailService.findByIdAnIsDelete(num);
            cartDetail.setPurchaseHistory(purchaseHistory);
            this.cartDetailService.save(cartDetail);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
