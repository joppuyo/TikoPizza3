<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="TikoPizza.data.Tuote" %>
<%@ page import="TikoPizza.data.TuotteetDAO" %>
<%@ page import="java.util.*" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>




<%

List<Tuote> tuotteet = null;
try {
	tuotteet = new TuotteetDAO().findAll();
} catch (ClassNotFoundException e) {
	// TODO Auto-generated catch block
	e.printStackTrace();
} catch (SQLException e) {
	// TODO Auto-generated catch block
	e.printStackTrace();
}
%>
<script type="text/javascript">
  var product_catalog = [
  <%
  Iterator tuote_it = tuotteet.iterator();
  while (tuote_it.hasNext())
  {
     Tuote tuote = (Tuote) tuote_it.next();
     String tyyppi = tuote.getTyyppi().toLowerCase();
     int id = tuote.getTuoteID();
     String nimi = tuote.getNimi();
     String kuvaus = tuote.getKuvaus();
     double hinta = tuote.getHinta();
  %>{id:<%=id%>,type:"<%=tyyppi%>",name:"<%=nimi%>",desc:"<%=kuvaus%>",price:<%=hinta%>},
  <%
  }
  %>];
</script>
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery.cookie.js"></script>
<script type="text/javascript" src="js/engine.js"></script>