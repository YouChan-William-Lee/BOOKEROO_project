package com.rmit.sept.bk_adminservices.model;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

public class BookId implements Serializable {

    @NotNull(message = "ISBN is required")
    @Id
    private Long isbn;

    @NotNull(message = "username is required")
    @Id
    private String username;

    public BookId(Long isbn, String username) {
        this.isbn = isbn;
        this.username = username;
    }

    public Long getIsbn() {
        return isbn;
    }

    public void setIsbn(Long isbn) {
        this.isbn = isbn;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
