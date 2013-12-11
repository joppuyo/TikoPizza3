package TikoPizza.WebContent;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import TikoPizza.data.Tuote;
import TikoPizza.data.TuotteetDAO;


public class AdminServlet extends HttpServlet {

private RequestDispatcher jsp;
	
	@Override
	public void init(ServletConfig config) throws ServletException {
		ServletContext context = config.getServletContext();
		jsp = context.getRequestDispatcher("/WEB-INF/jsp/admin.jsp");
		
		try {
		       Class.forName("com.mysql.jdbc.Driver");
		   } catch (ClassNotFoundException e) {
		       throw new ServletException(e);
		   }
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
		throws ServletException, IOException {

		Boolean authed = false;

		Cookie[] cookies = req.getCookies();
		if(cookies!=null) {
			for(int i = 0;i<cookies.length;i++) {
				Cookie cookie = cookies[i];
				if(cookie.getName().equals("master") && cookie.getValue().equals("hellyes")) {
					authed = true;
				}
			}
		}
		req.setAttribute("authed", authed);
		jsp.forward(req, resp);
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

			String login_user = "";
			String login_pass = "";

			login_user = req.getParameter("user");
			login_pass = req.getParameter("pass");


			if(login_user==null) {login_user = "";}
			if(login_pass==null) {login_pass = "";}


			// Boolean attempted = false;
			Boolean authed = false;

			if(login_user.equals("pizzamaster") && login_pass.equals("salapassu")) {
			    authed=true;
				Cookie cookie = new Cookie("master", "hellyes");
				cookie.setMaxAge(2*60*60);
				cookie.setPath("/");
				resp.addCookie(cookie);
			}
			// else {
			// 	if(req.getParameter("master")=="hellyes") {
			// 		authed = true;
			// 	}
			// }
		// List<Tuote> tuotteet = null;
		// try {
			// tuotteet = new TuotteetDAO().findAll();
		// } catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			// e.printStackTrace();
		// } catch (SQLException e) {
			// TODO Auto-generated catch block
			// e.printStackTrace();
		// }

		// req.setAttribute("tuotteet", tuotteet);
		req.setAttribute("authed", authed);
		jsp.forward(req, resp);
	}
}
