package com.workspez.hrsystem.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.workspez.hrsystem.domain.Employee;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Long>{
	
	@Query(value = "select * from employees where emp_name =:empName", nativeQuery = true)
	Employee findEmpDetailsByName(@Param("empName") String empName);
	
	//Employee findByEmpName(String empName);
	
}
