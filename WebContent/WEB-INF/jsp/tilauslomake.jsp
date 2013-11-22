<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ include file="global.inc" %>

<%@ include file="page_start.inc" %>
<%@ include file="page_head.inc" %>

<body>

<div id="holder">

<%@ include file="page_top.inc" %>

        <div id="tilauslomake">
            <div id="tilauslomakex">

<form>
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
<td colspan="2"><input type="text" name="osoite" id="osoite"></td>
</tr>

<tr>
<td><p>Postinumero</p></td>
<td><p>Postitoimipaikka</p></td>
</tr>

<tr>
<td><input type="text" name="postinumero" id="postinumero"></td>
<td><input type="text" name="postitoimipaikka" id="postitoimipaikka"></td>
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
<td><input type="text" name="email"></td>
</tr>

<tr>
<td style="width:50%">
<div class="validator" id="puhelinnumero-validator" style="display:none">
Tarkista puhelinnumero
</div>
</td>
<td style="width:50%">
<div class="validator" id="email-validator" style="display:none">
Tarkista sähköpostiosoite
</div>
</td>
</tr>

</table>

<input type="submit" value="Lähetä tilaus">

</form>

            </div>
        </div>

<%@ include file="page_cart.inc" %>

</div>
<%@ include file="cart_deps.inc" %>

<script type="text/javascript" src="js/validate.js"></script>

</body>
<%@ include file="page_end.inc" %>