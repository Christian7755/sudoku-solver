// src/main/java/sudoku/auth/AuthProperties.java
package sudoku.auth;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.Map;

@ConfigurationProperties(prefix = "auth")
public class AuthProperties {
    private Map<String, String> users;   // username -> (encoded) password
    public Map<String, String> getUsers()      { return users; }
    public void setUsers(Map<String, String> u){ this.users = u; }
}
