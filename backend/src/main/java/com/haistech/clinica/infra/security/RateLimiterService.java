package com.haistech.clinica.infra.security;

import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimiterService {

    // Cache de IPs e o momento da última requisição
    private final Map<String, Instant> requestCache = new ConcurrentHashMap<>();
    
    // Cooldown de 30 segundos por IP
    private static final long COOLDOWN_SECONDS = 30;

    public boolean isAllowed(String clientIp) {
        Instant now = Instant.now();
        Instant lastRequest = requestCache.get(clientIp);

        if (lastRequest != null && now.isBefore(lastRequest.plusSeconds(COOLDOWN_SECONDS))) {
            return false;
        }

        requestCache.put(clientIp, now);
        return true;
    }
}
