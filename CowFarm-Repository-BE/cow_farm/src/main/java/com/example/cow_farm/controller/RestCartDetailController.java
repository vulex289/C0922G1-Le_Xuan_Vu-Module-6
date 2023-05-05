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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;

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
    @GetMapping("product-detail/addCart/{productId}/{accountId}/{quantity}")
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
    @GetMapping("{accountId}")
    public ResponseEntity<List<ICartDetailDto2>> findAllCartByAccountId(@PathVariable Long accountId) {
        List<ICartDetailDto2> cartDetailDtoList = cartDetailService.findvAllByAccountId(accountId);
        return new ResponseEntity<>(cartDetailDtoList, HttpStatus.OK);
    }

    @DeleteMapping("cart-detail/{cartId}/{productId}")
    public ResponseEntity<?> deleteCartDetailByProductId(@PathVariable Long cartId, @PathVariable Long productId) {
        cartDetailService.deleteByProductId(cartId, productId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("cart-detail/updateQuantity/{cartDetailId}/{quantity}")
    public ResponseEntity<?> UpdateQuantityOfCartDetailByCartDetailId(@PathVariable Long cartDetailId, @PathVariable int quantity) {
       this.cartDetailService.updateQuantityOfCartDetail(quantity,cartDetailId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
