<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Iterator" %>
<%@ page import="TikoPizza.data.Tuote" %>
<%@ page import="TikoPizza.data.Tilaus" %>
<%@ page import="java.util.*" %>
<%@ include file="global.inc" %>
<%@ include file="page_start.inc" %>
<%@ include file="page_head.inc" %>
<jsp:useBean id="authed" scope="request" type="Boolean" />

<%



%>
<body>

    <div id="holder">

        <div id="admin" style="text-align:center;width:300px; margin:0 auto; background-color:white;padding:1em;margin-top:2em;">
            <img src="images/pitsulogo.png">
<%
if(authed==true) {
%> 
<div>
Olet kirjautunut sisään!
</div>
<div style="margin-top:1em;">
<a href="tilaukset">Tilauslistaan</a>
<script type="text/javascript">
location.href="tilaukset";
</script>
</div>
<%
}
else {
%>
        	<form id="login" action="admin" method="post" style="text-align:left;">

                <div>
                    <label name="user">Käyttäjänimi</a>
                    <input type="text" name="user" style="width:100%;"/>
                </div>
                <div>
                    <label name="pass">Salasana</a>
                    <input type="password" name="pass" style="width:100%;"/>
                </div>
                <div>
                    <input type="submit" name="submit"/>
                </div>
        	</form>
<%
}
%>
        </div>

    </div>

    <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
	<script src="http://code.highcharts.com/highcharts.js"></script>
	<script src="js/jquery.ui.touch-punch.min.js"></script>

</body>


<%@ include file="page_end.inc" %>
