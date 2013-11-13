package TikoPizza.WebContent;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import TikoPizza.data.Tuote;
import TikoPizza.data.TuotteetDAO;


public class PizzaListServlet extends HttpServlet {

private RequestDispatcher jsp;
	
	@Override
	public void init(ServletConfig config) throws ServletException {
		ServletContext context = config.getServletContext();
		jsp = context.getRequestDispatcher("/WEB-INF/jsp/pizzat.jsp");
		
		try {
		       Class.forName("com.mysql.jdbc.Driver");
		   } catch (ClassNotFoundException e) {
		       throw new ServletException(e);
		   }
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		
		List<Tuote> tuotteet = null;
		try {
			tuotteet = new TuotteetDAO().findAll();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		req.setAttribute("tuotteet", tuotteet);
		jsp.forward(req, resp);
	}
}
