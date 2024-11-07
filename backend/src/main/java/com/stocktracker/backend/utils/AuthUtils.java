package com.stocktracker.backend.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.userdetails.UserDetails;

public class AuthUtils {
    public static String getEmailOfAuthenticatedUser(SecurityContext securityContext) {
        Authentication authentication = securityContext.getAuthentication();
        boolean isAuthenticated = authentication != null
                && authentication.isAuthenticated()
                && !(authentication.getPrincipal() instanceof String
                && authentication.getPrincipal().equals("anonymousUser"));
        if(isAuthenticated) {
            return ((UserDetails) authentication.getPrincipal()).getUsername();
        }
        return null;
    }
}
