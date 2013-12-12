
<%@ page import="javax.servlet.http.Cookie" %>

<%
Boolean authed = false; 

Cookie[] cookies = request.getCookies();
if(cookies!=null) {
	for(int i = 0;i<cookies.length;i++) {
		Cookie cookie = cookies[i];
		if(cookie.getName().equals("master") && cookie.getValue().equals("hellyes")) {
			authed = true;
		}
	}
}
%>
