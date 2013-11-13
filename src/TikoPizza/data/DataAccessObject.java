package TikoPizza.data;

import java.sql.*;
//import java.util.Properties;
import java.util.*;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;



public class DataAccessObject {
	private static DataSource dataSource;

	public static void setDataSource(DataSource dataSource)
	 {
		DataAccessObject.dataSource = dataSource;
	}
	
	protected static Connection getConnection() throws
                             ClassNotFoundException,SQLException
	{
		try
		{
			// return dataSource.getConnection();
			String dbClassName = "com.mysql.jdbc.Driver";
			String CONNECTION =
			"jdbc:mysql://127.0.0.1:3333/projekti?autoReconnect=true&sessionVariables=storage_engine=InnoDB";
			// private Connection yhteys;
			// private Connection yhteys;
			Class.forName(dbClassName);
			// Properties for user and password.
			Properties p = new Properties();
			p.put("user","projekti");
			p.put("password","zuHAKI43m");
			return DriverManager.getConnection(CONNECTION,p);
			// yhteys = DriverManager.getConnection(CONNECTION,p);
		}
		catch (SQLException e)
		{
			throw new RuntimeException(e);
		}
	}
	
	protected static void close(Statement statement, Connection connection)
	{
		close(null, statement, connection);
	}
	
	protected static void close(ResultSet resultset, Statement statement, Connection connection)
	{
		try
		{
			if (resultset != null)
				resultset.close();
			if (statement != null)
				statement.close();
			if (connection != null)
				connection.close();
		}
		catch (SQLException e)
		{
			throw new RuntimeException(e);
		}
	}
}





