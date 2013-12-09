<%@ page language="java" contentType="application/json; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="TikoPizza.data.Tuote" %>
<%@ page import="TikoPizza.data.Tilaus" %>
<%@ page import="TikoPizza.data.TilauksetDAO" %>
<%@ page import="java.util.*" %>

<%@ page import="java.net.*" %>

<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>


<%
String action = request.getParameter("action");
String str_id = request.getParameter("id");
int id=-1;
String str_status = request.getParameter("status");
int status=-1;
if(action==null) {action = "";}
if(str_id!=null) {
	id = Integer.parseInt(str_id);
}
if(str_status==null) {
	status = -1;
}
else {
	status = Integer.parseInt(str_status);
}

TilauksetDAO tdao;
tdao = new TilauksetDAO();


if(action.equals("delete")) {
	tdao.delete(id);
} else if(action.equals("status")) {
	Tilaus tilaus = tdao.find(id);
	tilaus.setStatus(status);
	tdao.update(tilaus);
	if(status==1) {
	    String msg = "Hyvä "+tilaus.getTilaaja()+", tilauksenne on vastaanotettu. Arvioitu toimitusaika n. 35min. Tilausnumero "+tilaus.getTilausID()+". Kiitos!";
	    //Scanner scanz = new Scanner(new URL("http://62.78.217.223:48080/txt/?key=salakoodi27&to="+tilaus.getPuhelinnumero()+"&msg="+URLEncoder.encode(msg, "UTF-8")).openStream(), "UTF-8").useDelimiter("\\A").next();
	    URL url = new URL("http://62.78.217.223:48080/txt/?key=salakoodi27&to="+tilaus.getPuhelinnumero()+"&msg="+URLEncoder.encode(msg, "UTF-8"));
		Scanner s = new Scanner(url.openStream());
		String data = s.next();
	}
}


	List<Tilaus> tilaukset = tdao.findAll();
	Iterator tilaus_it = tilaukset.iterator();
	%>
	[
	<%
	while (tilaus_it.hasNext()) {
	Tilaus tilaus = (Tilaus) tilaus_it.next();
	%>{"id":<%=tilaus.getTilausID()%>,"status":<%=tilaus.getStatus()%>,"time":"<%=tilaus.getAika()%>","name":"<%=tilaus.getTilaaja()%>","addr":"<%=tilaus.getOsoite()%>","pcode":"<%=tilaus.getPostinumero()%>","area":"<%=tilaus.getToimipaikka()%>","email":"<%=tilaus.getEmail()%>","phone":"<%=tilaus.getPuhelinnumero()%>","contents":"<%=tilaus.getTuotteet()%>"}
	<%
	if(tilaus_it.hasNext()) {
	%>,
	<%
	}
	}
	%>
	]
<%

%>
