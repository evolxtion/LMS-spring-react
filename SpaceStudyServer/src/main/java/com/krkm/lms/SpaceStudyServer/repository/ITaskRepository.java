package com.krkm.lms.SpaceStudyServer.repository;

import com.krkm.lms.SpaceStudyServer.entity.Task;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ITaskRepository extends CrudRepository<Task, Integer> {
    
    @Query(value="SELECT * FROM Tasks t WHERE t.id_course = :id", nativeQuery = true)
    Iterable<Task> findByTaskId(int id);

}
