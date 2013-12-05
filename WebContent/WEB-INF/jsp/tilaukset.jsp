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
        <%@ include file="page_top.inc" %>

        <div id="tilaukset" style="padding:1em;">


        </div>

    </div>

    <%@ include file="cart_data.inc"%>
    <%@ include file="order_deps.inc"%>

</body>


<%@ include file="page_end.inc" %>
