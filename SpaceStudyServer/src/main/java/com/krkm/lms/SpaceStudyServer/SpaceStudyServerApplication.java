package com.krkm.lms.SpaceStudyServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class SpaceStudyServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpaceStudyServerApplication.class, args);
	}

}
