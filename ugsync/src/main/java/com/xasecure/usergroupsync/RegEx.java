package com.xasecure.usergroupsync;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.xasecure.unixusersync.config.UserGroupSyncConfig;

public class RegEx extends AbstractMapper {
	private UserGroupSyncConfig config = UserGroupSyncConfig.getInstance();
	private LinkedHashMap<String, String> replacementPattern;

	public LinkedHashMap<String, String> getReplacementPattern() {
		return replacementPattern;
	}

	@Override
	public void init (String baseProperty) {
		logger.info("Initializing for " + baseProperty);
		List<String> regexPatterns = config.getAllRegexPatterns(baseProperty);
		populateReplacementPatterns(baseProperty, regexPatterns);
	}
	
	protected void populateReplacementPatterns(String baseProperty, List<String> regexPatterns) {
		replacementPattern = new LinkedHashMap<String, String>();
		Pattern p = Pattern.compile("s/([^/]*)/([^/]*)/(g)?");
		for (String regexPattern : regexPatterns) {
			Matcher m = p.matcher(regexPattern);
			if (!m.matches()) {
				logger.warn("Invalid RegEx " + regexPattern + " and hence skipping this regex property");
			}
			m = m.reset();
			while (m.find()) {
				String matchPattern = m.group(1);
				String replacement = m.group(2);
				if (matchPattern != null && !matchPattern.isEmpty() && replacement != null) {
					replacementPattern.put(matchPattern, Matcher.quoteReplacement(replacement));
					if (logger.isDebugEnabled()) {
						logger.debug(baseProperty + " match pattern = " + matchPattern + " and replacement string = " + replacement);
					}
				}
			}
		}
	}

	@Override
	public String transform (String attrValue) {
		String result = attrValue;
		if (replacementPattern != null && !replacementPattern.isEmpty()) {
			for (String matchPattern : replacementPattern.keySet()) {
				Pattern p = Pattern.compile(matchPattern);
				Matcher m = p.matcher(result);
				if (m.find()) {
					String replacement = replacementPattern.get(matchPattern);
					if (replacement != null) {
						result = m.replaceAll(replacement);
					}
				}
			}
		}
		return result;
	}
}
