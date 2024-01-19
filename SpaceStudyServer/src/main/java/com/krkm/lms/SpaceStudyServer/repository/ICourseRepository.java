package com.krkm.lms.SpaceStudyServer.repository;

import com.krkm.lms.SpaceStudyServer.entity.Course;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ICourseRepository extends CrudRepository<Course, Integer> {

//    @Query(value="SELECT * FROM Courses c WHERE продолжить тут пользователи которые записаны на курс, получают чисто эти курсы", nativeQuery = true)
//    Course findForCurrentUser();

}
