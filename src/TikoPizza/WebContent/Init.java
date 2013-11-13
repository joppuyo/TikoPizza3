package TikoPizza.WebContent;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.sql.DataSource;

// import TikoPizza.data.DataAccessObject;

public class Init implements ServletContextListener {

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		try 
		{
			InitialContext enc = new InitialContext();
			// Context compContext = (Context) enc.lookup("java:comp/env");
			// DataSource dataSource = (DataSource) compContext.lookup("datasource");
			// DataAccessObject.setDataSource(dataSource);
		}
		catch (Exception e)
		{
			throw new RuntimeException(e);
		}
		
	}
}
