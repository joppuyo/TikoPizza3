<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%String menu_image;%>
        <div id="top">
            <div class="images">
                <img class="logo" src="images/pitsulogo.png" />
                <img class="offer" src="images/pizzatarjous.png" />
            </div>
            <div id="notif-msg"></div>
            <div id="navbar">


                <%if(servletName(request.getServletPath()).equals("pizzat")) {
                    menu_image = "food_w.png";
                    %>
                <div class="navbar-item-active">
                <%}
                else {
                    menu_image = "food_b.png";
                %>
                <div class="navbar-item">
                <%}%>
                    <a href="pizzat">
                    <img height="18px" src="images/<%=menu_image%>" width="18px" /> 
                    TILAA PITSU
                    </a>
                </div>


                <%if(servletName(request.getServletPath()).equals("yhteystiedot")) {
                    menu_image = "location_w.png";
                %>
                <div class="navbar-item-active">
                <%}
                else {
                    menu_image = "location_b.png";
                %>
                <div class="navbar-item">
                <%}%>
                    <a href="yhteystiedot">
                    <img height="18px" src="images/<%=menu_image%>" width="18px" />
                    YHTEYSTIEDOT
                    </a>
                </div>

                
            </div>
        </div> 
