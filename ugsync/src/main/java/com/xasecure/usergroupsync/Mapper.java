package com.xasecure.usergroupsync;

public interface Mapper {
	public void init(String baseProperty);
	
	public String transform(String attrValue); 
}
