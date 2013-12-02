<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ include file="global.inc" %>

<%@ include file="page_start.inc" %>
<%@ include file="page_head.inc" %>

<%
String kuittinimi = request.getParameter("etunimi") + " " + request.getParameter("sukunimi");
String kuittiosoite = request.getParameter("osoite");
String kuittipostinumero = request.getParameter("postinumero");
String kuittipostitoimipaikka = request.getParameter("postitoimipaikka");
String kuittipuhelinnumero = request.getParameter("puhelinnumero");
String kuittiemail = request.getParameter("email");
%>

<body>

<div id="holder">

<%@ include file="page_top.inc" %>

        <div id="tilauslomake">
            <div id="tilauslomakex">
			<h3>Tilaajan nimi:</h3>
			<p><%= kuittinimi %></p>
			<h3>Tilaajan osoite:</h3>
			<p><%= kuittiosoite %></p>
			<p><%= kuittipostinumero + " " + kuittipostitoimipaikka %></p>
			<h3>Tilaajan puhelinnumero:</h3>
			<p><%= kuittipuhelinnumero %></p>
			<h3>Tilaajan sähköpostiosoite:</h3>
			<p><%= kuittiemail %></p>
			
            </div>
        </div>

</div>
</body>
<%@ include file="page_end.inc" %>