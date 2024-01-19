package com.krkm.lms.SpaceStudyServer.utils;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public final class CookiesUtils {
    
    public static String encodeValue(String value) {
        byte[] encodedBytes = Base64.getEncoder().encode(value.getBytes(StandardCharsets.UTF_8));
        return new String(encodedBytes, StandardCharsets.UTF_8);
    }
    
    public static String decodeValue(String encodedValue) {
        String decodedUrl = URLDecoder.decode(encodedValue, StandardCharsets.UTF_8);
        System.out.println(decodedUrl);
        return decodedUrl;
    }
    
}
