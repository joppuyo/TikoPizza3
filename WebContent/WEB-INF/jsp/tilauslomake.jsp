<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ page import="TikoPizza.data.Tuote" %>
<%@ page import="TikoPizza.data.Tilaus" %>
<%@ page import="TikoPizza.data.TilauksetDAO" %>
<%@ page import="java.util.*" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>


<%@ include file="global.inc" %>

<%@ include file="page_start.inc" %>
<%@ include file="page_head.inc" %>


<%



Boolean valid = false;



String kuittinimi = request.getParameter("etunimi") + " " + request.getParameter("sukunimi");

String kuittietunimi = request.getParameter("etunimi");
String kuittisukunimi = request.getParameter("sukunimi");

String kuittiosoite = request.getParameter("osoite");
String kuittipostinumero = request.getParameter("postinumero");
String kuittipostitoimipaikka = request.getParameter("postitoimipaikka");
String kuittipuhelinnumero = request.getParameter("puhelinnumero");
String kuittiemail = request.getParameter("email");
String kuittituotteet = request.getParameter("tuotteet");


String submit = request.getParameter("submit");

if(submit == null || submit.isEmpty()) {
	valid = true;
}


%>

<body>

<div id="holder">

<%@ include file="page_top.inc" %>

        <div id="tilauslomake">
            <div id="tilauslomakex">

<%
if(valid) {
%>

<form action="tilauslomake" method="get" name="tilaus" id="order-form">


<p>Tilauslomake</p>


<table>
<tr>
<td><p>Etunimi</p></td>
<td><p>Sukunimi</p></td>
</tr>
<tr>
<td><input type="text" name="etunimi"></td>
<td><input type="text" name="sukunimi"></td>
</tr>

<tr>
<td style="width:50%">
<div class="validator" id="etunimi-validator" style="display:none">
Tarkista etunimi
</div>
</td>
<td style="width:50%">
<div class="validator" id="sukunimi-validator" style="display:none">
Tarkista sukunimi
</div>
</td>
</tr>

<tr>
<td><p>Osoite</p></td>
</tr>

<tr>
<td colspan="2"><input type="text" name="osoite" id="osoite" value="Ratapihantie 13"></td>
</tr>

<tr>
<td><p>Postinumero</p></td>
<td><p>Postitoimipaikka</p></td>
</tr>

<tr>
<td><input type="text" name="postinumero" id="postinumero" value="00520"></td>
<td><input type="text" name="postitoimipaikka" id="postitoimipaikka" value="Helsinki"></td>
</tr>

<tr>
<td colspan="2">
<div class="validator" id="osoite-validator" style="display:none">
<p>Osoitevirhe</p>
</div>
</td>
</tr>

<tr>
<td><p>Puhelinnumero</p></td>
<td><p>Email</p></td>
</tr>

<tr>
<td><input type="text" name="puhelinnumero"></td>
<td><input type="text" name="email" value="ei.kukaan@missaan.com"></td>
</tr>

<tr>
<td style="width:50%">
<div class="validator" id="puhelinnumero-validator" style="display:none">
Tarkista puhelinnumero (ei välilyöntejä, 7-10 merkkiä)
</div>
</td>
<td style="width:50%">
<div class="validator" id="email-validator" style="display:none">
Tarkista sähköpostiosoite
</div>
</td>
</tr>

</table>

<input type="hidden" name="tuotteet" value="" id="tuotteet-input">
<input type="submit" name ="submit" value="Seuraava">

</form>
<% } else { %>
<form action="tilausvarmistus" method="get" name="tilaus">
    <h2>Tilausvahvistus<h2>

	<h3>Tilaajan nimi:</h3>
	<p><%= kuittinimi %></p>
	<h3>Tilaajan osoite:</h3>
	<p><%= kuittiosoite %></p>
	<p><%= kuittipostinumero + " " + kuittipostitoimipaikka %></p>
	<h3>Tilaajan puhelinnumero:</h3>
	<p><%= kuittipuhelinnumero %></p>
	<h3>Tilaajan sähköpostiosoite:</h3>
	<p><%= kuittiemail %></p>
	<h3>Tilauksen tuotteet:</h3>
	<p><%= kuittituotteet %></p>
	

	<input type="hidden" name="etunimi" value="<%=kuittietunimi%>">
	<input type="hidden" name="sukunimi" value="<%=kuittisukunimi%>">
	<input type="hidden" name="osoite" value="<%=kuittiosoite%>">
	<input type="hidden" name="postinumero" value="<%=kuittipostinumero%>">
	<input type="hidden" name="postitoimipaikka" value="<%=kuittipostitoimipaikka%>">
	<input type="hidden" name="puhelinnumero" value="<%=kuittipuhelinnumero%>">
	<input type="hidden" name="email" value="<%=kuittiemail%>">

	<input type="hidden" name="tuotteet" value="<%=kuittituotteet%>" id="tuotteet-input">


	<!-- <div style="margin-top:1em"> -->
		<input type="submit" name="submit" value="Vahvista tilaus">
	<!-- </div> -->
</form>
<% } %>

            </div>
        </div>

<%@ include file="page_cart.inc" %>

</div>
<%@ include file="cart_data.inc"%>
<%@ include file="cart_deps.inc" %>

<script type="text/javascript" src="js/validate.js"></script>

</body>
<%@ include file="page_end.inc" %>