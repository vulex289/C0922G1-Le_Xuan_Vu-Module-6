package com.example.be.config;

import com.example.be.jwt.JwtFilter;
import com.example.be.service.Impl.AccountDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AccountDetailService accountService;
    @Autowired
    private JwtFilter jwtFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(accountService);
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf()
                .disable()
                .cors()
                .and()
                .authorizeRequests()
                .antMatchers("/api/**")
                .permitAll()
                .antMatchers("/**/**").hasRole("ADMIN")
//                .antMatchers("/api/answers/**").hasAnyRole( "STUDENT","TEACHER")
//                .antMatchers("/clazz/**").hasAnyRole( "STUDENT", "TEACHER")
//                .antMatchers("/api/document/**").hasAnyRole( "STUDENT", "TEACHER")
//                .antMatchers("/file/**").hasAnyRole( "STUDENT","TEACHER")
//                .antMatchers("/api/notification-teachers/**").hasAnyRole( "STUDENT", "TEACHER")
//                .antMatchers("/api/progress-reports/**").hasAnyRole( "STUDENT", "TEACHER")
//                .antMatchers("/api/progress/**").hasAnyRole( "STUDENT", "TEACHER")
//                .antMatchers("/api/progressReview/**").hasAnyRole( "STUDENT", "TEACHER")
//                .antMatchers("/api/projects/**").hasAnyRole( "STUDENT", "TEACHER")
//                .antMatchers("/api/questions/**").hasAnyRole( "STUDENT", "TEACHER")
//                .antMatchers("/api/studentProgressReport/**").hasAnyRole( "STUDENT", "TEACHER")
                .antMatchers("/api/students/**").hasAnyRole( "STUDENT", "TEACHER","ADMIN")
//                .antMatchers("/api/teachers/**").hasAnyRole( "STUDENT", "TEACHER")
//                .antMatchers("/api/teams/**").hasAnyRole( "STUDENT", "TEACHER")
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
