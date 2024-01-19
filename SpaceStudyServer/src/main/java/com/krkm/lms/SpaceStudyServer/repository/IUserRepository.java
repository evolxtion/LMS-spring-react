package com.krkm.lms.SpaceStudyServer.repository;

import com.krkm.lms.SpaceStudyServer.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface IUserRepository extends CrudRepository<User, Integer> {
    
    @Query(value="SELECT * FROM Users u WHERE u.email = :email", nativeQuery = true)
    User findByEmail(String email);

}
