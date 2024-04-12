package com.example.PlanIt.global.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

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
                        .requestMatchers(new AntPathRequestMatcher("/api/*/schedules/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/*/comments/**")).permitAll()
                        .anyRequest().authenticated())
                .cors(
                        cors -> cors.disable()
                ) // cors 설정, 타 도메인에서 api 호출 가능
                .csrf(
                        csrf -> csrf.disable()
                ) // csrf 토큰 끄기
                .httpBasic(
                        httpBasic -> httpBasic.disable()
                ) // httpBasic 로그인 방식 끄기
                .formLogin(
                        formLogin -> formLogin.disable()
                ) // 폼 로그인 방식 끄기
                .sessionManagement(
                        sessionManagement -> sessionManagement.sessionCreationPolicy(STATELESS)
                ) // 세션 끄기
//                .addFilterBefore(
//                        jwtAuthorizationFilter, //엑세스 토큰을 이용한 로그인 처리
//                        UsernamePasswordAuthenticationFilter.class
//                )
        ;
        return http.build();
    }
}