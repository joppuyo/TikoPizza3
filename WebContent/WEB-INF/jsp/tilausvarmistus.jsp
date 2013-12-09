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





String kuittinimi = request.getParameter("etunimi") + " " + request.getParameter("sukunimi");

String kuittietunimi = request.getParameter("etunimi");
String kuittisukunimi = request.getParameter("sukunimi");

String kuittiosoite = request.getParameter("osoite");
String kuittipostinumero = request.getParameter("postinumero");
String kuittipostitoimipaikka = request.getParameter("postitoimipaikka");
String kuittipuhelinnumero = request.getParameter("puhelinnumero");
String kuittiemail = request.getParameter("email");
String kuittituotteet = request.getParameter("tuotteet");

Tilaus uusi_tilaus = new Tilaus();
uusi_tilaus.setStatus(0);
uusi_tilaus.setTilaaja(kuittinimi);
uusi_tilaus.setOsoite(kuittiosoite);
uusi_tilaus.setPostinumero(kuittipostinumero);
uusi_tilaus.setToimipaikka(kuittipostitoimipaikka);
uusi_tilaus.setPuhelinnumero(kuittipuhelinnumero);
uusi_tilaus.setEmail(kuittiemail);
uusi_tilaus.setTuotteet(kuittituotteet);


// List<Tuote> tuotteet = null;
try {
	new TilauksetDAO().insert(uusi_tilaus);



} catch (ClassNotFoundException e) {
	// TODO Auto-generated catch block
	e.printStackTrace();
} catch (SQLException e) {
	// TODO Auto-generated catch block
	e.printStackTrace();
}

%>

<body>

<div id="holder">

<%@ include file="page_top.inc" %>

        <div id="tilauslomake">
            <div id="tilauslomakex">
            <h2>Tilauksenne on vahvistettu!</h2>
            <p>Kiitos! Olemme vastaanottaneet tilauksenne. Saatte vahvistuksen sähköpostilla ja tekstiviestillä, kun otamme tilauksenne käsittelyyn.</p>

            </div>
        </div>

</div>
</body>
<%@ include file="page_end.inc" %>
