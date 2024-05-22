package com.sprinbootproject.Website;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;


@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name="products")
public class product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private double price;

    @Column(name = "image")
    private String imagePath;

    public product(String name, String description, double price, String imagePath) {
        this.name=name;
        this.imagePath=imagePath;
        this.price=price;
        this.description=description;
    }
}
