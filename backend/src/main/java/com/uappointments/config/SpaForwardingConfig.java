package com.uappointments.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SpaForwardingConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {

        // Forward any route that:
        // - does not start with /api
        // - does not contain a dot (so static files still work)
        registry.addViewController("/{path:^(?!api$)[^\\.]*}")
                .setViewName("forward:/index.html");

        registry.addViewController("/**/{path:^(?!api$)[^\\.]*}")
                .setViewName("forward:/index.html");
    }
}
