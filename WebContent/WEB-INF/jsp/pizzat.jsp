<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Iterator" %>
<%@ page import="TikoPizza.data.Tuote" %>
<%@ page import="java.util.*" %>
<%@ include file="global.inc" %>
<%@ include file="page_start.inc" %>
<%@ include file="page_head.inc" %>

<%!
String PrintTuote(Tuote tuote) {
  String tyyppi = tuote.getTyyppi().toLowerCase();
  String image=tuote.getTuoteID()+".png";
  int id=tuote.getTuoteID();

  String html = new String(
                "<div onclick=\"cart.itemAdd("+id+")\" id=\"tuote-item-"+id+"\" class=\"tuote "+tyyppi+"\" style=\"background-image: url('images/tuotteet/"+image+"')\"> \n"+
                " <div class=\"pitsuhintaboksi\">\n"+
                "     <div class=\"pitsuhinta\">"+tuote.getHinta()+" &euro;</div>\n"+
                " </div>"+
                " <div class=\"pitsuid\">\n"+
                "   <div class=\"pitsunimi\">\n"+
                      tuote.getNimi()+
                "   </div>\n"+
                "   <div class=\"pitsukuvaus\">\n"+
                      tuote.getKuvaus()+
                "   </div>\n"+
                " </div>\n"+
                "</div>\n");
  return html;
}
%>
<body>

    <div id="holder">
        <%@ include file="page_top.inc" %>

        <div id="pitsulista">
            <div id="pitsulistax">

                <div class="sort">
                  Järjestä:
                  <a href="javascript:catalog.sort('name')">Nimi</a> | 
                  <a href="javascript:catalog.sort('price')">Hinta</a>
                </div>

                <div class="tuotelista" id="tuotteet-pizza"></div>
                <div class="tuotelista" id="tuotteet-juoma"></div>

            </div>
        </div>

        <%@ include file="page_cart.inc" %>
    </div>
    <%@ include file="cart_deps.inc"%>
    
    <script type="text/javascript">
    </script>
    <script type="text/javascript" src="js/engine.js"></script>

</body>


<%@ include file="page_end.inc" %>
