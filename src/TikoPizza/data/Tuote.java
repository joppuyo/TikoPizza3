package TikoPizza.data;

// public class Tuote extends Tuoteryhma {
public class Tuote {
	private int tuoteID;
	private String tyyppi;
	private String nimi;
	private String kuvaus;
	private double hinta;
	private int tuoteryhmaID;
	
	public Tuote() {
		
	}
	
	public int getTuoteID() {
		return tuoteID;
	}
	public void setTuoteID(int tuoteID) {
		this.tuoteID = tuoteID;
	}	
	public String getTyyppi() {
		return tyyppi;
	}
	public void setTyyppi(String tyyppi) {
		this.tyyppi = tyyppi;
	}
	public String getNimi() {
		return nimi;
	}
	public void setNimi(String nimi) {
		this.nimi = nimi;
	}
	public String getKuvaus() {
		return kuvaus;
	}
	public void setKuvaus(String kuvaus) {
		this.kuvaus = kuvaus;
	}
	public double getHinta() {
		return hinta;
	}
	public void setHinta(double hinta) {
		this.hinta = hinta;
	}
	public int getTuoteryhmaID() {
		return tuoteryhmaID;
	}
	public void setTuoteryhmaID(int tuoteryhmaID) {
		this.tuoteryhmaID = tuoteryhmaID;
	}	

}
