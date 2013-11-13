<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

        <div id="ostoskori">

            <div id="ostoskorix">
                <div class="top">
                Ostoskori
                </div>
                <div class="tuotteet" id="cart-tuote-list">

                </div>
                <div class="bottom">
                    <div class="info">
                        <span id="cart-count"></span>
                        yht. <span id="cart-total-price">0 &euro;</span>
                    </div>
                    <div class="controls">
                        <a href="#" class="submit">Siirry tilaamaan</a>
                        <a href="javascript:cart.empty();">Tyhjennä</a>
                    </div>
                </div>

                <form style="dislay:none;"><input type="hidden"/></form>
            </div>
        </div> 
