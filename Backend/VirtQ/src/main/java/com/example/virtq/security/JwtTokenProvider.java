package com.example.virtq.security;

import com.example.virtq.domain.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.example.virtq.security.SecurityConstants.EXPIRATION_TIME;

@Component
public class JwtTokenProvider {
    private final Key key = Keys.hmacShaKeyFor(SecurityConstants.SECRET.getBytes(StandardCharsets.UTF_8));

    public String generateToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Date now = new Date(System.currentTimeMillis());

        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);

        String userId = Long.toString(user.getId());

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", (Long.toString(user.getId())));
        claims.put("username", user.getUsername());
        claims.put("firstName", user.getFirstName());
        claims.put("lastName", user.getLastName());

        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();
    }

    public boolean validateToken(String token) {
        try{
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch(SignatureException ex) {
            System.out.println("Invalid JWT Signature");
        } catch(MalformedJwtException ex) {
            System.out.println("Invalid JWT Token");
        } catch(ExpiredJwtException ex) {
            System.out.println("Expired JWT Token");
        } catch(UnsupportedJwtException ex) {
            System.out.println("Unsupported JWT Token");
        } catch(IllegalArgumentException ex) {
            System.out.println("JWT Claims String is Empty");
        }

        return false;
    }

    public Long getUserIdFromJWT(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        String id = (String) claims.get("id");

        return Long.parseLong(id);
    }
}
