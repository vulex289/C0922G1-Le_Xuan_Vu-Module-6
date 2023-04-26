package com.example.cow_farm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCrypt;

@SpringBootApplication
public class CowFarmApplication {
	public static void main(String[] args) {
		SpringApplication.run(CowFarmApplication.class, args);
		String a = "lexuanvU1*";
		String b = BCrypt.hashpw(a, BCrypt.gensalt(12));
		System.out.println(b);
		boolean c = BCrypt.checkpw(a,b);
		System.out.println(c);
	}

}
