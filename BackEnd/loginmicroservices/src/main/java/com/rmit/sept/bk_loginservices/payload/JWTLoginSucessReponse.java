package com.rmit.sept.bk_loginservices.payload;

public class JWTLoginSucessReponse {
    private boolean success;
    private String token;
    private boolean pending;

    public JWTLoginSucessReponse(boolean success, String token, boolean pending) {
        this.success = success;
        this.token = token;
        this.pending = pending;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public boolean isPending() {
        return pending;
    }
    public void setPending() {
        this.pending = pending;
    }


    @Override
    public String toString() {
        return "JWTLoginSuccessResponse{" +
                "pending=" + false +
                ", success=" + success +
                ", token='" + token + '\'' +
                '}';
    }
}