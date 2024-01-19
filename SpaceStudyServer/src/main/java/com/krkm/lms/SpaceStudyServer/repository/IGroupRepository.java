package com.krkm.lms.SpaceStudyServer.repository;

import com.krkm.lms.SpaceStudyServer.entity.Group;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface IGroupRepository extends CrudRepository<Group, Integer> {
    
    @Query(value="SELECT * FROM `Groups` g WHERE g.name = :name", nativeQuery = true)
    Group findByName(String name);
    
    @Query(value="SELECT * FROM `Groups` g WHERE g.speciality = :speciality", nativeQuery = true)
    Group findBySpeciality(String speciality);
    
    @Query(value="SELECT * FROM `Groups` g WHERE g.serial_key = :key", nativeQuery = true)
    Group findByKey(String key);
    
}
