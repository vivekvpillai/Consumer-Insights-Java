package com.example.Insights;


import javax.persistence.Entity;
import javax.javax.persistence.GeneratedValue;
import javax.javax.persistence.Table;

@Entity
@Table(username = "User")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String username;
  @OneToMany(
    mappedBy = "user",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  private List<Object> objects = new ArrayList<>();

  public User(String username) {
    this.username = username;
  }

  public void setItems(List<Item> items) {
    this.items = items;
  }

}
