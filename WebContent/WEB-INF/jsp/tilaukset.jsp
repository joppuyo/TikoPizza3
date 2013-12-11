<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Iterator" %>
<%@ page import="TikoPizza.data.Tuote" %>
<%@ page import="TikoPizza.data.Tilaus" %>
<%@ page import="java.util.*" %>
<%@ include file="global.inc" %>
<%@ include file="page_start.inc" %>
<%@ include file="page_head.inc" %>

<body>

    <div id="holder">

        <div id="tilaukset">
        
        <div id="url" style="display:none">http://pizza.bittemple.net</div>


        	<div id="tilauslista">
        		<div id="orderstats">
        			<div id="order-stats-chart" style=" height: 150px; margin: 0 auto">
        			</div>
        		</div>
        		<div id="orderlist">
        			<div>
        			<h3>Uudet</h3>
	        		<ul class="orders orders-dnd1" id="orders-status-0"></ul>
		        	</div>
        			<div>
        			<h3>Käsittelyssä</h3>
	        		<ul class="orders orders-dnd1 orders-dnd2" id="orders-status-1"></ul>
		        	</div>
        			<div>
        			<h3>Toimitettu</h3>
	        		<ul class="orders orders-dnd2" id="orders-status-2"></ul>
		        	</div>

        		</div>
        	</div>

    		<div id="order-info">
    		</div>
        </div>

    </div>

    <%@ include file="cart_data.inc"%>
    <%@ include file="order_deps.inc"%>

    <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
	<script src="http://code.highcharts.com/highcharts.js"></script>
	<script src="http://code.highcharts.com/modules/exporting.js"></script>
	<script src="js/jquery.ui.touch-punch.min.js"></script>
	
<script>

$(document).keypress(function(e){
  if(e.charCode == 117){
	  $( "#url" ).toggle( "slow" );
  }
})

</script>

</body>


<%@ include file="page_end.inc" %>
