package TikoPizza.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

public class TuoteryhmaItemDAO extends DataAccessObject {

	private Tuoteryhma read(ResultSet resultSet) throws SQLException {
		int tuoteryhmaid = new Integer(resultSet.getInt("TuoteryhmaID"));
		String nimi = resultSet.getString("Tuoteryhmanimi");
		double veroprosentti = new Double(resultSet.getDouble("Veroprosentti"));
		Tuoteryhma tuoteryhma = new Tuoteryhma();
		tuoteryhma.setTuoteryhmaid(tuoteryhmaid);
		tuoteryhma.setTuoteryhmanimi(nimi);
		tuoteryhma.setVeroprosentti(veroprosentti);
		return tuoteryhma;
	}
	
	public Tuoteryhma find(int tuoteryhmaid) throws ClassNotFoundException
	{
		ResultSet rs = null;
		PreparedStatement statement = null;
		Connection connection = null;
		
		try
		{
			connection = getConnection();
			String sql = "select TuoteryhmaID as TuoteryhmaID, Nimi as Tuoteryhmanimi, Veroprosentti as Veroprosentti from tuoteryhma where TuoteryhmaID=?;";
			statement = connection.prepareStatement(sql);
			statement.setInt(1, tuoteryhmaid);
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
	
	public List<Tuoteryhma> findAll() throws ClassNotFoundException {
		LinkedList<Tuoteryhma> tuoteryhmaItems = new LinkedList<Tuoteryhma>();
		ResultSet rs = null;
		PreparedStatement statement = null;
		Connection connection = null;

		try {
			connection = getConnection();
			String sql = "select TuoteryhmaID as TuoteryhmaID, Nimi as Tuoteryhmanimi, Veroprosentti as Veroprosentti from tuoteryhma;";
			statement = connection.prepareStatement(sql);
			rs = statement.executeQuery();
			while (rs.next()) {
				Tuoteryhma tuoteryhmaItem = read(rs);
				tuoteryhmaItems.add(tuoteryhmaItem);
			}
			return tuoteryhmaItems;
		} catch (SQLException e) {
			throw new RuntimeException(e);
		} finally {
			close(rs, statement, connection);
		}
	}	
}
