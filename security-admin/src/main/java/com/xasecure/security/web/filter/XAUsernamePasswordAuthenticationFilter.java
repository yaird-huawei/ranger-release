/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 /**
 *
 */
package com.xasecure.security.web.filter;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.codec.Base64;
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class XAUsernamePasswordAuthenticationFilter extends
	UsernamePasswordAuthenticationFilter {

    static Logger logger = Logger
	    .getLogger(XAUsernamePasswordAuthenticationFilter.class);

    /*
     * (non-Javadoc)
     *
     * @see org.springframework.security.web.authentication.
     * AbstractAuthenticationProcessingFilter
     * #setRememberMeServices(org.springframework
     * .security.web.authentication.RememberMeServices)
     */
    @Override
    public void setRememberMeServices(RememberMeServices rememberMeServices) {
	if (logger.isDebugEnabled()) {
	    logger.debug("setRememberMeServices() enter: rememberMeServices="
		    + rememberMeServices.toString());
	}
	super.setRememberMeServices(rememberMeServices);
    }
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        try {
            validateCredentials(request, response);
        } catch(InternalAuthenticationServiceException failed) {
            logger.error("An internal error occurred while trying to authenticate the user.", failed);
            unsuccessfulAuthentication(request, response, failed);
            return;
        }
        catch (AuthenticationException failed) {
            // Authentication failed
            unsuccessfulAuthentication(request, response, failed);
            return;
        }
        super.doFilter(req,res,chain);
    }

    public void validateCredentials(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String header = request.getHeader("Authorization");
        try{
	        if (header != null && header.startsWith("Basic ")) {
	            String[] tokens = extractAndDecodeHeader(header, request);
	            assert tokens.length == 2;
	            String username = tokens[0];
	            String password = tokens[1];
	            if (username == null) {
	                username = "";
	            }
	            if (password == null) {
	                password = "";
	            }
	            if(!username.trim().isEmpty() && password.trim().isEmpty()){
	                throw new BadCredentialsException("Bad credentials");
	            }
	        }
        }catch(IOException ie){
            throw new BadCredentialsException("Invalid basic authentication token");
        }
    }
    private String[] extractAndDecodeHeader(String header, HttpServletRequest request) throws IOException {
        byte[] base64Token = header.substring(6).getBytes("UTF-8");
        byte[] decoded;
        try {
            decoded = Base64.decode(base64Token);
        } catch (IllegalArgumentException e) {
            throw new BadCredentialsException("Failed to decode basic authentication token");
        }
        String credentialsCharset = "UTF-8";
        String token = new String(decoded, credentialsCharset);
        int delim = token.indexOf(":");
        if (delim == -1) {
            throw new BadCredentialsException("Invalid basic authentication token");
        }
        return new String[] {token.substring(0, delim), token.substring(delim + 1)};
    }
}
