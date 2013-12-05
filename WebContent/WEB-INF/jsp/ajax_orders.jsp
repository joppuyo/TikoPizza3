<%@ page language="java" contentType="application/json; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="TikoPizza.data.Tuote" %>
<%@ page import="TikoPizza.data.Tilaus" %>
<%@ page import="TikoPizza.data.TilauksetDAO" %>
<%@ page import="java.util.*" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>
<%
List<Tilaus> tilaukset = null;
try {
	tilaukset = new TilauksetDAO().findAll();
} catch (ClassNotFoundException e) {
	// TODO Auto-generated catch block
	e.printStackTrace();
} catch (SQLException e) {
	// TODO Auto-generated catch block
	e.printStackTrace();
}
Iterator tilaus_it = tilaukset.iterator();
%>
[
<%
while (tilaus_it.hasNext())
{
   Tilaus tilaus = (Tilaus) tilaus_it.next();
%>{"id":<%=tilaus.getTilausID()%>,"status":"<%=tilaus.getStatus()%>","time":"<%=tilaus.getAika()%>","name":"<%=tilaus.getTilaaja()%>","addr":"<%=tilaus.getOsoite()%>","pcode":"<%=tilaus.getPostinumero()%>","area":"<%=tilaus.getToimipaikka()%>","phone":"<%=tilaus.getPuhelinnumero()%>","contents":"<%=tilaus.getTuotteet()%>"}
<%
if(tilaus_it.hasNext()) {
%>
,
<%
}
}
%>
]