package com.example.cow_farm.repository;

import com.example.cow_farm.dto.ICartDetailDto;
import com.example.cow_farm.dto.ICartDetailDto2;
import com.example.cow_farm.model.order.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
@Transactional
public interface ICartDetailRepository extends JpaRepository<CartDetail,Long> {
    @Modifying
    @Query(value = "SELECT c.cart_id as cartId, cd.cart_detail_id as cartDetailId, p.product_name as productName, p.description as description,\n" +
            "            p.price as price, cd.quantity as quantity, p.product_id as productId\n" +
            "            FROM cart_detail cd join cart c on cd.cart_id = c.cart_id\n" +
            "            join product p on p.product_id = cd.product_id\n" +
            "            where c.account_id = :id", nativeQuery = true)
    List<ICartDetailDto> findAllCartDetailByAccountId(@Param("id") Long accountId);

    @Query(value = "SELECT c.cart_id as cartId, cd.cart_detail_id as cartDetailId, p.product_name as productName, p.description as `description`,\n" +
            "       p.price as price, cd.quantity as quantity, p.product_id as productId,\n" +
            "       (SELECT pil.image_list FROM product_image_list pil WHERE pil.product_product_id = p.product_id LIMIT 1) as image\n" +
            "FROM cart_detail cd\n" +
            "JOIN cart c ON cd.cart_id = c.cart_id\n" +
            "JOIN product p ON p.product_id = cd.product_id\n" +
            "WHERE c.account_id = :id", nativeQuery = true)
    List<ICartDetailDto2> findAllvCartDetailByAccountId(@Param("id") Long accountId);

    void deleteCartDetailByCartCartIdAndProductProductId(Long cartId,Long productId);

    @Modifying
    @Query(value = "update cart_detail set quantity = :quantity where cart_detail_id = :id",nativeQuery = true)
    void updateQuantityOfCartDetail(@Param("quantity") int quantity, @Param("id") Long cartDetailId);
}
