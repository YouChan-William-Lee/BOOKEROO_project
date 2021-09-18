package com.rmit.sept.bk_bookservices.web;

import com.rmit.sept.bk_bookservices.TestUtil;
import com.rmit.sept.bk_bookservices.Repositories.BookRepository;
import com.rmit.sept.bk_bookservices.model.Book;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class BookControllerTest {

    private final String REGISTER_BOOK_API = "/api/books/registerBook";

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private BookRepository bookRepository;

    @BeforeEach
    public void cleanup() {
        bookRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void registerBook_whenInvalidBook_receiveBadRequest() {
        Book book = TestUtil.createValidBook();
        book.setNumOfOldBook(0);
        book.setNumOfNewBook(0);
        ResponseEntity<Object> response = registerBook(book, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    private <T> ResponseEntity<T> registerBook(Book request, Class<T> response) {
        return testRestTemplate.postForEntity(REGISTER_BOOK_API, request, response);
    }
}
