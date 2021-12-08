package com.example.Insights;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Object {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Integer id;

  private String sampleName;

  private String category;

  private Integer visits;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getsampleName() {
    return sampleName;
  }

  public void setsampleName(String sampleName) {
    this.sampleName = sampleName;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public Integer getVisits() {
    return visits;
  }

  public void setVisits(Integer visits){
    this.visits = visits;
  }
}
