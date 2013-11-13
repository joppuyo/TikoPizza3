<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%!

String servletName(String path) {
    path = path.substring(path.lastIndexOf("/")+1, path.length());
    if(path.indexOf(".")!=-1) {
        path = path.substring(0,path.indexOf("."));
    }
    return path;
}

%>
