package TikoPizza.data;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import TikoPizza.data.Tuote;

public class TuotteetDAO extends DataAccessObject {
	private Tuote read(ResultSet rs) throws SQLException {
		// int tuoteid = new Integer(resultSet.getInt("TuoteID"));
		// String nimi = resultSet.getString("Nimi");
		// String kuvaus = resultSet.getString("Kuvaus");
		// double hinta = new Double(resultSet.getDouble("Hinta"));
		// int tuoteryhmaid = new Integer(resultSet.getInt("TuoteryhmaID"));
		// String tuoteryhmanimi = resultSet.getString("Tuoteryhmanimi");
		// double veroprosentti = new Double(resultSet.getDouble("Veroprosentti"));

        int t_id  = rs.getInt("tuote_id");
        String t_tyyppi = rs.getString("tuote_tyyppi");
        String t_nimi = rs.getString("tuote_nimi");
        String t_kuvaus = rs.getString("tuote_kuvaus");
        double t_hinta = rs.getDouble("tuote_hinta");

		Tuote tuote = new Tuote();

		tuote.setTuoteID(t_id);
		tuote.setTyyppi(t_tyyppi);
		tuote.setNimi(t_nimi);
		tuote.setKuvaus(t_kuvaus);
		tuote.setHinta(t_hinta);
		// tuote.setTuoteryhmaID(tuoteryhmaid);
		// tuote.setTuoteryhmanimi(tuoteryhmanimi);
		// tuote.setVeroprosentti(veroprosentti);
		return tuote;
	}
	
	public Tuote find(int tuoteid) throws
                             ClassNotFoundException,SQLException
	{
		ResultSet rs = null;
		PreparedStatement statement = null;
		Connection connection = null;
		
		try
		{
			connection = getConnection();
			String sql = "select t.TuoteID as TuoteID, t.Nimi as Nimi, t.Kuvaus as Kuvaus, t.Hinta as Hinta, t.TuoteryhmaID as TuoteryhmaID, tr.Nimi as Tuoteryhmanimi, tr.Veroprosentti as Veroprosentti from tuote t join tuoteryhma tr on t.TuoteryhmaID = tr.TuoteryhmaID where TuoteID=?;";
			statement = connection.prepareStatement(sql);
			statement.setInt(1, tuoteid);
			rs = statement.executeQuery();
			if (!rs.next())
				return null;
			return read(rs);
		}
		catch (SQLException e)
		{
			throw new RuntimeException(e);
		}
		finally
		{
			close(rs, statement, connection);
		}
	}
	
	public List<Tuote> findAll()  throws
                             ClassNotFoundException,SQLException
                             {
		// LinkedList<Tuote> tuoteItems = new LinkedList<Tuote>();
		LinkedList<Tuote> tuotteet_list = new LinkedList<Tuote>();
		// List<Tuote> tuotteet_list = new List<Tuote>();
		ResultSet rs = null;
		PreparedStatement statement = null;
		Connection connection = null;

		try {
			connection = getConnection();
			// String sql = "select t.TuoteID as TuoteID, t.Nimi as Nimi, t.Kuvaus as Kuvaus, t.Hinta as Hinta, t.TuoteryhmaID as TuoteryhmaID, tr.Nimi as Tuoteryhmanimi, tr.Veroprosentti as Veroprosentti from tuote t join tuoteryhma tr on t.TuoteryhmaID = tr.TuoteryhmaID;";
			// String sql = "select tuote_id as tuote_id, tuote_nimi as tuote_nimi, t.Kuvaus as Kuvaus, t.Hinta as Hinta, t.TuoteryhmaID as TuoteryhmaID, tr.Nimi as Tuoteryhmanimi, tr.Veroprosentti as Veroprosentti from tuote";
			// String sql = "select tuote_id as tuote_id, tuote_nimi as tuote_nimi, t_kuvaus as Kuvaus, t.Hinta as Hinta, t.TuoteryhmaID as TuoteryhmaID, tr.Nimi as Tuoteryhmanimi, tr.Veroprosentti as Veroprosentti from tuote";
			// String sql = "select tuote_id as tuote_id, tuote_nimi as tuote_nimi, tuote_kuvaus as tuote_kuvaus, tuote_hinta as tuote_hinta from tuote";
			String sql = "select * from tuote";
			// String sql = "select * from tuote";
			statement = connection.prepareStatement(sql);
			rs = statement.executeQuery();
			while (rs.next()) {
				Tuote tuoteItem = read(rs);
				tuotteet_list.add(tuoteItem);
			}
			return tuotteet_list;
		} catch (SQLException e) {
			throw new RuntimeException(e);
		} finally {
			close(rs, statement, connection);
		}
	}
	
	public void update(Tuote tuote) throws
                             ClassNotFoundException,SQLException
	{
		PreparedStatement statement = null;
		Connection connection = null;
		String sql = "update tuote  set nimi=?, kuvaus=?, hinta=?, tuoteryhmaid=? where tuoteid=?;";
		
		try
		{
			connection = getConnection();
     		statement = connection.prepareStatement(sql);
			statement.setString(1, tuote.getNimi());
			statement.setString(2, tuote.getKuvaus());
			statement.setDouble(3, new Double(tuote.getHinta()));
			statement.setInt(4, tuote.getTuoteryhmaID());
			statement.setInt(5, tuote.getTuoteID());
						
			statement.executeUpdate();
		}
		catch (SQLException e)
		{
			throw new RuntimeException(e);
		}
		finally
		{
			close(statement, connection);
		}
	}
}
