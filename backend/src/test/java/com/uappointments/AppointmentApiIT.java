package com.uappointments;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
@ActiveProfiles("test")
class AppointmentApiIT {

    @Autowired
    MockMvc mvc;

    @Test
    void create_then_getById() throws Exception {
        var createJson = """
      {
        "type": "U7",
        "date": "2026-03-10",
        "notes": "Bring vaccination booklet"
      }
      """;

        var createResult = mvc.perform(post("/api/appointments")
                .contentType(MediaType.APPLICATION_JSON)
                .content(createJson))
                .andExpect(status().isCreated())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.type").value("U7"))
                .andExpect(jsonPath("$.date").value("2026-03-10"))
                .andReturn();

        var body = createResult.getResponse().getContentAsString();
        var id = extractLongField(body, "id");

        mvc.perform(get("/api/appointments/{id}", id))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.type").value("U7"))
                .andExpect(jsonPath("$.date").value("2026-03-10"))
                .andExpect(jsonPath("$.notes").value("Bring vaccination booklet"));
    }

    @Test
    void list_returnsCreatedItems() throws Exception {
        mvc.perform(post("/api/appointments")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
              {"type":"U6","date":"2026-02-20","notes":""}
            """))
                .andExpect(status().isCreated());

        mvc.perform(get("/api/appointments"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                // If your API returns { "items": [...] } change this to "$.items[0].type"
                .andExpect(jsonPath("$[0].type").exists());
    }

    @Test
    void update_changesFields() throws Exception {
        var createdJson = mvc.perform(post("/api/appointments")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
              {"type":"U5","date":"2026-04-01","notes":"old"}
            """))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();

        var id = extractLongField(createdJson, "id");

        mvc.perform(put("/api/appointments/{id}", id)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
              {"type":"U5","date":"2026-04-02","notes":"new"}
            """))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.date").value("2026-04-02"))
                .andExpect(jsonPath("$.notes").value("new"));
    }

    @Test
    void delete_removesItem() throws Exception {
        var createdJson = mvc.perform(post("/api/appointments")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
              {"type":"U8","date":"2026-05-05","notes":""}
            """))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();

        var id = extractLongField(createdJson, "id");

        mvc.perform(delete("/api/appointments/{id}", id))
                .andExpect(status().isNoContent());

        mvc.perform(get("/api/appointments/{id}", id))
                .andExpect(status().isNotFound());
    }

    static long extractLongField(String json, String field) {
        var key = "\"" + field + "\":";
        var idx = json.indexOf(key);
        if (idx < 0) {
            throw new IllegalArgumentException("Field not found: " + field);
        }
        idx += key.length();
        while (idx < json.length() && Character.isWhitespace(json.charAt(idx))) {
            idx++;
        }
        int end = idx;
        while (end < json.length() && Character.isDigit(json.charAt(end))) {
            end++;
        }
        return Long.parseLong(json.substring(idx, end));
    }
}
