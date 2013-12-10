package TikoPizza.data;

import java.util.ArrayList;
import java.lang.System.*;


public class Tilaus {
	private int tilausID;
	private int status;
	private int aika;
	private String tilaaja;
	private String osoite;
	private String postinumero;
	private String toimipaikka;
	private String puhelinnumero;
	private String email;
	private String tuotteet;
	
	public Tilaus() {
		this.status = 0;
		this.aika = (int) (System.currentTimeMillis() / 1000L);
	}
	

	public int getTilausID() {
		return tilausID;
	}
	public void setTilausID(int tilausID) {
		this.tilausID = tilausID;
	}


	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}


	public int getAika() {
		return aika;
	}
	public void setAika(int aika) {
		this.aika = aika;
	}


	public String getTilaaja() {
		return tilaaja;
	}
	public void setTilaaja(String tilaaja) {
		this.tilaaja = tilaaja;
	}


	public String getOsoite() {
		return osoite;
	}
	public void setOsoite(String osoite) {
		this.osoite = osoite;
	}


	public String getPostinumero() {
		return postinumero;
	}
	public void setPostinumero(String postinumero) {
		this.postinumero = postinumero;
	}

	public String getToimipaikka() {
		return toimipaikka;
	}
	public void setToimipaikka(String toimipaikka) {
		this.toimipaikka = toimipaikka;
	}


	public String getPuhelinnumero() {
		return puhelinnumero;
	}
	public void setPuhelinnumero(String puhelinnumero) {
		this.puhelinnumero = puhelinnumero;
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	public String getTuotteet() {
		return tuotteet;
	}
	public void setTuotteet(String tuotteet) {
		this.tuotteet = tuotteet;
	}

}
