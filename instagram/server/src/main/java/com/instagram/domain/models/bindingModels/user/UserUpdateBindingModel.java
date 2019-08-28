package com.instagram.domain.models.bindingModels.user;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;

import static com.instagram.utils.constants.ResponseMessageConstants.VALIDATION_ERROR_MESSAGE;
import static com.instagram.utils.constants.ValidationMessageConstants.*;

public class UserUpdateBindingModel implements Serializable {
    private String id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String profilePicUrl;
    private String bio;
    private String website;

    public UserUpdateBindingModel() {
    }

    @NotNull(message = ID_REQUIRED_MESSAGE)
    @Length(min = 1, message = ID_REQUIRED_MESSAGE)
    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Pattern(regexp = "^([a-zA-Z0-9]+)$")
    @Size(min = 4, max = 16, message = USER_INVALID_USERNAME_MESSAGE)
    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Pattern(regexp = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",message = USER_INVALID_EMAIL_MESSAGE)
    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Pattern(regexp = "^[A-Z]([a-zA-Z]+)?$", message = USER_INVALID_FIRST_NAME_MESSAGE)
    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Pattern(regexp = "^[A-Z]([a-zA-Z]+)?$", message = USER_INVALID_LAST_NAME_MESSAGE)
    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    @NotNull(message = VALIDATION_ERROR_MESSAGE)
    @Length(min = 1, message = VALIDATION_ERROR_MESSAGE)
    public String getProfilePicUrl() {
        return this.profilePicUrl;
    }

    public void setProfilePicUrl(String profilePicUrl) {
        this.profilePicUrl = profilePicUrl;
    }

    @Size(max = 1500, message = USER_INVALID_BIO_MESSAGE)
    public String getBio() {
        return this.bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    @Size(max = 250, message = USER_INVALID_WEBSITE_MESSAGE)
    public String getWebsite() {
        return this.website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }
}
