package com.workspez.hrsystem.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.workspez.hrsystem.domain.Leave;

@Repository
public interface LeaveRepo extends JpaRepository<Leave, Long>{

	Leave getById(Long id);
	
}
