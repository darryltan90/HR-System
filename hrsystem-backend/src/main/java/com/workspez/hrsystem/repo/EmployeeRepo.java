package com.workspez.hrsystem.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.workspez.hrsystem.domain.Employee;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Long>{
	
	@Query(value = "select * from employees where emp_name =:empName and password=:password", nativeQuery = true)
	Employee findEmpDetailsByNameAndPassword(@Param("empName") String empName, @Param("password") String password);
	
	@Query(value = "select * from employees where emp_id =:empId", nativeQuery = true)
	Employee findEmpDetailsById(@Param("empId") int empId);
	
	
	
}
