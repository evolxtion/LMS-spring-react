package com.krkm.lms.SpaceStudyServer.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

@Deprecated
public class JwtUtil {
    
    String privateKeyPEM = "-----BEGIN RSA PRIVATE KEY-----\n" +
            "MIICWwIBAAKBgQCv0QJH/k3CHaJfS5VunD6loGuE1G3sGu+zTUlacX3wzcKLw6I+\n" +
            "Zf9pj1yHLVRoXX4l8G0GA8uIBYoauaHeWG0gD42R0g9mBEVLnkaU1p9A0IcxWgq1\n" +
            "vCQ/RxQOtf8uOSg4P/+jqwH/n0RZbigomFfgsqYQB65se/ox27yl0vFubwIDAQAB\n" +
            "AoGAG/Y6zaZlSYUbCNrlhjT1RbQwxWxfmxhhnPuiue6o3/5pfX78s73XFDvHtHwC\n" +
            "G6Ma5//H5xf9a8GtyDhTxR/9IsMVwxiGZ8jQZIwEnatjHEdbWseXrFnnypLMnTw2\n" +
            "RsYB4x5mgW+X65NjFRKRRhSSs9IM9BuQcQx78ENxCHO7uckCQQDzleM9I7XaHd+g\n" +
            "lBSV6Z/SUobhlWX5mj5EzibGLpq0Gk21aybCqxmvocj6B/9xYGJeK/uTOhN7VYC5\n" +
            "/U9uUKCrAkEAuMbsfj0NJcDSRxs2ZccNBpDEPISjmOFIPvvBWwkqUVZLZzJe16db\n" +
            "KJNyq227tjyfiujlQqfcmj+hG9InY5FRTQJAUaR1a7Kiax8EK0A2viB17vq2Nrnq\n" +
            "WgS2xj0KhfZs59zBGwN1FF5g15s0T4mKtqeFkObRBYG7seTwpmYez2y6zQJAcmjh\n" +
            "WAzvThgFW3fTB9PnEdCjYSFztp6PQEhb4cVcCX7YM26x4O/D9uzNTK4mU2FYHAe2\n" +
            "pL4RTwTk+bf3IaSB5QJAGCGiMSJTgesYDILowmp3WrvDficotsnm5KZ6ok8gEAuo\n" +
            "MHCNBTRLtQlqLmigxdplZ0gRojHGBU6LEnBStJR/Bw==\n" +
            "-----END RSA PRIVATE KEY-----";
    
    // Удаление заголовков и символов новой строки из PEM
    String privateKeyPEMTrimmed = privateKeyPEM
            .replace("-----BEGIN RSA PRIVATE KEY-----", "")
            .replace("-----END RSA PRIVATE KEY-----", "")
            .replaceAll("\\s+", "");
    
    // Декодирование PEM в бинарное представление
    byte[] privateKeyBytes = Base64.getDecoder().decode(privateKeyPEMTrimmed);
    
    // Создание объекта PrivateKey из бинарных данных
    KeyFactory keyFactory = KeyFactory.getInstance("RSA");
    PrivateKey privateKey = keyFactory.generatePrivate(new PKCS8EncodedKeySpec(privateKeyBytes));
    
    private final long expirationShort = 1800000L; // 30 minutes
    private final long expirationLong = 864000000L; // 10 days
    
    public JwtUtil() throws NoSuchAlgorithmException, InvalidKeySpecException {
    }
    
    public String generateToken(String username, boolean rememberMe) {
        long expiration = rememberMe ? expirationLong : expirationShort;
        
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.RS256, privateKey)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean validateToken(String token) {
        Date expirationDate = extractClaim(token, Claims::getExpiration);
        return expirationDate.after(new Date());
    }
    
    public boolean isTokenExpired(String token) {
        Date expirationDate = extractClaim(token).getExpiration();
        return expirationDate.before(new Date());
    }
    
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = Jwts.parser()
                .setSigningKey(privateKey)
                .parseClaimsJws(token)
                .getBody();
        return claimsResolver.apply(claims);
    }
    
    private Claims extractClaim(String token) {
        return Jwts.parser().setSigningKey(privateKey).parseClaimsJws(token).getBody();
    }
}
