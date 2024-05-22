package com.sprinbootproject.Website;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/products")
public class ProductController {

    @Value("${upload.path}")
    private String uploadPath;

    @Autowired
    private ProductRepository productRepo;

    @GetMapping
    public List<product> getAllProducts() {
      return productRepo.findAll();
    }

    @PostMapping
    public ResponseEntity<product> createProduct(@RequestParam("name") String name,
                                                 @RequestParam("description") String description,
                                                 @RequestParam("price") double price,
                                                 @RequestParam("imagePath") MultipartFile image) {
        try {
            // Save image file to upload directory
            byte[] imageData = image.getBytes();
            String fileName = StringUtils.cleanPath(image.getOriginalFilename());
            Path imagePath = Paths.get(uploadPath).resolve(fileName);
            Files.write(imagePath, imageData);

            // Save product details to database with image file path
            product product = new product(name, description, price, imagePath.toString());
            product savedProduct = productRepo.save(product);

            return ResponseEntity.ok(savedProduct);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PutMapping("/{id}")
    public product updateProduct(@PathVariable Long id,
                                 @RequestParam("name") String name,
                                 @RequestParam("description") String description,
                                 @RequestParam("price") double price,
                                 @RequestParam(value = "imagePath", required = false) MultipartFile image)
    {
        product existingProduct = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        try {
            byte[] imageData = image.getBytes();
            String fileName = StringUtils.cleanPath(image.getOriginalFilename());
            Path imagePath = Paths.get(uploadPath).resolve(fileName);
            Files.write(imagePath, imageData);

            existingProduct.setImagePath(imagePath.toString());

            existingProduct.setName(name);
            existingProduct.setDescription(description);
            existingProduct.setPrice(price);

            return productRepo.save(existingProduct);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {

        product existingProduct = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        try{
            Path imagePath=Paths.get(existingProduct.getImagePath());
            if(Files.exists(imagePath)){
                Files.delete(imagePath);
            }
            productRepo.delete(existingProduct);
            return "Product deleted successfully";
        }catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

