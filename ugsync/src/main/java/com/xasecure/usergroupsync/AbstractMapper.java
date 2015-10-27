package com.xasecure.usergroupsync;

import org.apache.log4j.Logger;

public abstract class AbstractMapper implements Mapper {

	static Logger logger = Logger.getLogger(AbstractMapper.class);
	
	@Override
	public void init(String baseProperty) {
		// TODO Auto-generated method stub

	}

	@Override
	public String transform(String attrValue) {
		// TODO Auto-generated method stub
		return null;
	}

}
