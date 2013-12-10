package TikoPizza.data;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;
import java.util.ArrayList;

import TikoPizza.data.Tilaus;


public class TilauksetDAO extends DataAccessObject {
	private Tilaus read(ResultSet rs) throws SQLException {
        int t_id  = rs.getInt("tilaus_id");
        int t_status = rs.getInt("tilaus_status");
        int t_aika = rs.getInt("tilaus_aika");

        String t_tilaaja = rs.getString("tilaus_tilaaja");
        String t_osoite = rs.getString("tilaus_osoite");
        String t_postinumero = rs.getString("tilaus_postinumero");
        String t_toimipaikka = rs.getString("tilaus_toimipaikka");
        String t_puhelinnumero = rs.getString("tilaus_puhelinnumero");
        String t_email = rs.getString("tilaus_email");
        String t_tuotteet = rs.getString("tilaus_tuotteet");

		Tilaus tilaus = new Tilaus();

		tilaus.setTilausID(t_id);
		tilaus.setStatus(t_status);
		tilaus.setAika(t_aika);

		tilaus.setTilaaja(t_tilaaja);
		tilaus.setOsoite(t_osoite);
		tilaus.setPostinumero(t_postinumero);
		tilaus.setToimipaikka(t_toimipaikka);
		tilaus.setPuhelinnumero(t_puhelinnumero);
		tilaus.setEmail(t_email);
		tilaus.setTuotteet(t_tuotteet);

		return tilaus;
	}
	
/*	public Tilaus find(int tilausid) throws
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
	}*/
	
	public Tilaus find(int id)  throws
                             ClassNotFoundException,SQLException
                             {
		Tilaus tilaus = null;
		ResultSet rs = null;
		PreparedStatement statement = null;
		Connection connection = null;
		try {
			connection = getConnection();


			String sql = "select * from tilaus where tilaus_id=?;";
			statement = connection.prepareStatement(sql);
			statement.setInt(1, id);
			rs = statement.executeQuery();

			rs = statement.executeQuery();
			if (!rs.next())
				return null;
			tilaus = read(rs);
			return tilaus;
		} catch (SQLException e) {
			throw new RuntimeException(e);
		} finally {
			close(rs, statement, connection);
		}
	}



	public List<Tilaus> findAll()  throws
                             ClassNotFoundException,SQLException
                             {

		LinkedList<Tilaus> tilaus_list = new LinkedList<Tilaus>();
		ResultSet rs = null;
		// ResultSet rs2 = null;
		PreparedStatement statement = null;
		// PreparedStatement statement2 = null;
		Connection connection = null;
		// ArrayList<int[]> products = new ArrayList<int[]>();
		try {
			connection = getConnection();


			// statement2 = connection.prepareStatement("select * from tuotetilaus");
			// rs2 = statement2.executeQuery();



			// String debugs = "";
			// while (rs2.next()) {
			// 	int til_id = rs2.getInt("tilaus_id");
			// 	debugs += til_id+" / ";
			// 	int tuo_id = rs2.getInt("tuote_id");
			// 	debugs += tuo_id+" / ";
			// 	int kpl = rs2.getInt("kpl");
			// 	debugs += kpl+" -- ";
			// 	int[] row = new int[3];
			// 	row = new int[]{til_id,tuo_id,kpl};
			// 	products.add(row);
			// }

			// int[] row = new int[3];
			String sql = "select * from tilaus order by tilaus_aika DESC";
			statement = connection.prepareStatement(sql);
			rs = statement.executeQuery();
			while (rs.next()) {
				Tilaus tilausItem = read(rs);
				// String listString = "";

				// for(int i=0;i<products.size();i++) {
				// 	row = products.get(i);
				// 	if(row[0]==tilausItem.getTilausID()) {
				// 		// for(int j=0;j<row[2];j++) {
				// 			// tilausItem.setTuotteet(tilausItem.getTuotteet()+row[1]+",");
				// 		// }
				// 		tilausItem.setTuotteet(tilausItem.getTuotteet()+row[1]+"x"+row[2]+",");
				// 	}
				// }
				tilaus_list.add(tilausItem);
			}
			return tilaus_list;
		} catch (SQLException e) {
			throw new RuntimeException(e);
		} finally {
			close(rs, statement, connection);
		}
	}
	
	public void insert(Tilaus tilaus) throws
                             ClassNotFoundException,SQLException
	{
		PreparedStatement statement = null;
		Connection connection = null;

		String sql = "insert into tilaus set tilaus_status=?, tilaus_aika=?, tilaus_tilaaja=?, tilaus_osoite=?, tilaus_postinumero=?, tilaus_toimipaikka=?, tilaus_puhelinnumero=?, tilaus_email=?, tilaus_tuotteet=?;";

		try
		{
			connection = getConnection();
     		statement = connection.prepareStatement(sql);

			statement.setInt(1, tilaus.getStatus());
			statement.setInt(2, tilaus.getAika());
			statement.setString(3,tilaus.getTilaaja());
			statement.setString(4, tilaus.getOsoite());
			statement.setString(5, tilaus.getPostinumero());
			statement.setString(6, tilaus.getToimipaikka());
			statement.setString(7, tilaus.getPuhelinnumero());
			statement.setString(8, tilaus.getEmail());
			statement.setString(9, tilaus.getTuotteet());

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

	public void update(Tilaus tilaus) throws
                             ClassNotFoundException,SQLException
	{
		PreparedStatement statement = null;
		Connection connection = null;

		String sql = "update tilaus set tilaus_status=?, tilaus_aika=?, tilaus_tilaaja=?, tilaus_osoite=?, tilaus_postinumero=?, tilaus_toimipaikka=?, tilaus_puhelinnumero=?, tilaus_email=?, tilaus_tuotteet=? where tilaus_id=?;";

		try
		{
			connection = getConnection();
     		statement = connection.prepareStatement(sql);

			statement.setInt(1, tilaus.getStatus());
			statement.setInt(2, tilaus.getAika());
			statement.setString(3,tilaus.getTilaaja());
			statement.setString(4, tilaus.getOsoite());
			statement.setString(5, tilaus.getPostinumero());
			statement.setString(6, tilaus.getToimipaikka());
			statement.setString(7, tilaus.getPuhelinnumero());
			statement.setString(8, tilaus.getEmail());
			statement.setString(9, tilaus.getTuotteet());
			statement.setInt(10, tilaus.getTilausID());

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

	public void delete(int id) throws
                             ClassNotFoundException,SQLException
	{
		PreparedStatement statement = null;
		Connection connection = null;

		String sql = "delete from tilaus where tilaus_id=?;";

		try
		{
			connection = getConnection();
     		statement = connection.prepareStatement(sql);

			statement.setInt(1, id);

			statement.execute();
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
