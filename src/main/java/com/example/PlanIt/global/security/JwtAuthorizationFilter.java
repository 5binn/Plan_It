package com.example.PlanIt.global.security;

import com.example.PlanIt.domain.user.service.UserService;
import com.example.PlanIt.global.request.Rq;
import com.example.PlanIt.global.rsData.RsData;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {
    private final UserService userService;
    private final Rq rq;
    @Override
    @SneakyThrows
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) {
        if (request.getRequestURI().equals("/api/v1/users/login") || request.getRequestURI().equals("/api/v1/users/logout")) {
            filterChain.doFilter(request, response);
            return;
        }

        String accessToken = rq.getCookie("accessToken");
        // accessToken 검증 or refreshToken 발급
        if (!accessToken.isBlank()) {
            // 토큰 유효기간 검증
            if (!userService.validateToken(accessToken)) {
                String refreshToken = rq.getCookie("refreshToken");

                RsData<String> rs = userService.refreshAccessToken(refreshToken);
                rq.setCrossDomainCookie("accessToken", rs.getData());
            }

            // securityUser 가져오기
            SecurityUser securityUser = userService.getUserFromAccessToken(accessToken);
            // 로그인 처리
            rq.setLogin(securityUser);
        }

        filterChain.doFilter(request, response);
    }


}