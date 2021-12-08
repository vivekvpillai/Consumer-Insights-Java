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
		ConfigurableApplicationContext configurableApplicationContext =
		SpringApplication.run(InsightsApplication.class, args);
		CartRepository cartRepository = configurableApplicationContext.getBean(CartRepository.class);

		User user = new User(username: "vivek");
		Object test = new Object(samplename: "StoryTeller", category: "Visits", visits: 100, user);
		Object item = new Object(samplename: "Portfolio", category: "Visits", visits: 20, user);
		List<Object> objects = Arrays.asList(test, item);
		user.setItems(objects);
		UserRepository.save(user);
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
		System.out.println(objectData);
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
