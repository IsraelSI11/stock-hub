package com.stocktracker.backend.service;


import com.stocktracker.backend.model.AppUser;
import com.stocktracker.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Busca el usuario por email en la base de datos
        Optional<AppUser> userEntityOpt = userRepository.findByEmail(email);

        AppUser userEntity = userEntityOpt.orElseThrow(() ->
                new UsernameNotFoundException("User not found with email: " + email));

        // Convertir la entidad en UserDetails
        return User.withUsername(userEntity.getEmail())
                .password(userEntity.getPassword())
                .build();
    }
}

