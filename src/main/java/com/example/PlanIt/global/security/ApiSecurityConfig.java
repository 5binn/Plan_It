package com.example.PlanIt.global.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class ApiSecurityConfig {
    @Bean
    SecurityFilterChain apiFilterChain(HttpSecurity http) throws Exception {
        http
                .securityMatcher(new AntPathRequestMatcher("/api/**"))
                .authorizeRequests((authorizeRequests) -> authorizeRequests
                        .requestMatchers(new AntPathRequestMatcher("/api/*/curriculums/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/*/users/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/*/guests/**")).permitAll()
                        .anyRequest().authenticated())
                .csrf((csrf) -> csrf
                        .disable())
        ;
        return http.build();
    }
}