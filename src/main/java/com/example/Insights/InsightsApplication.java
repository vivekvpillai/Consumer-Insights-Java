package com.example.Insights;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.beans.factory.annotation.Autowired;

@SpringBootApplication
@RestController
public class InsightsApplication {
	@Autowired
	private ObjectRepository ObjectRepository;

	public static void main(String[] args) {
		SpringApplication.run(InsightsApplication.class, args);
	}

	@GetMapping("/hello")
	public String hello() {return "Hello!";
	}

		@GetMapping("/objects")
	public Iterable<Object> index() {
		return ObjectRepository.findAll();
	}

	@PostMapping("/objects")
	public Iterable<Object> create (@RequestBody Object objectData) {
		ObjectRepository.save(objectData);
		return ObjectRepository.findAll();
	}

	@DeleteMapping("/objects/{id}")
	public Iterable<Object> delete(@PathVariable int id) {
		ObjectRepository.deleteById(id);
		return ObjectRepository.findAll();
	}

	@PutMapping("/objects/{id}")
	public Iterable<Object> update(@PathVariable int id, @RequestBody Object objectData) {
		objectData.setId(id);
		ObjectRepository.save(objectData);
		return ObjectRepository.findAll();
	}

}
