/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package org.apache.ranger.plugin.resourcematcher;


import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOCase;
import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


public class RangerPathResourceMatcher extends RangerAbstractResourceMatcher {
	private static final Log LOG = LogFactory.getLog(RangerPathResourceMatcher.class);

	public static final String OPTION_PATH_SEPERATOR       = "pathSeparatorChar";
	public static final char   DEFAULT_PATH_SEPERATOR_CHAR = org.apache.hadoop.fs.Path.SEPARATOR_CHAR;

	private boolean      policyIsRecursive    = false;
	private char         pathSeparatorChar    = DEFAULT_PATH_SEPERATOR_CHAR;
	private List<String> policyValuesForMatch = null;

	@Override
	public void init() {
		if(LOG.isDebugEnabled()) {
			LOG.debug("==> RangerPathResourceMatcher.init()");
		}

		super.init();

		policyIsRecursive = policyResource == null ? false : policyResource.getIsRecursive();
		pathSeparatorChar = getCharOption(OPTION_PATH_SEPERATOR, DEFAULT_PATH_SEPERATOR_CHAR);

		if(policyIsRecursive && optWildCard && !isMatchAny) {
			policyValuesForMatch = new ArrayList<String>();

			for(String policyValue : policyValues) {
				if(policyValue.charAt(policyValue.length() - 1) == pathSeparatorChar) {
					policyValuesForMatch.add(policyValue + WILDCARD_ASTERISK);
				} else {
					policyValuesForMatch.add(policyValue);
				}
			}
		} else {
			policyValuesForMatch = policyValues;
		}

		if(LOG.isDebugEnabled()) {
			LOG.debug("<== RangerPathResourceMatcher.init()");
		}
	}

	@Override
	public boolean isMatch(String resource) {
		if(LOG.isDebugEnabled()) {
			LOG.debug("==> RangerPathResourceMatcher.isMatch(" + resource + ")");
		}

		boolean ret = false;
		boolean allValuesRequested = isAllValuesRequested(resource);

		if(allValuesRequested || isMatchAny) {
			ret = isMatchAny;
		} else {
			IOCase caseSensitivity = optIgnoreCase ? IOCase.INSENSITIVE : IOCase.SENSITIVE;

			for(String policyValue : policyValuesForMatch) {
				if(policyIsRecursive && optWildCard) {
					ret = isRecursiveWildCardMatch(resource, policyValue, pathSeparatorChar, caseSensitivity);
				} else if(policyIsRecursive) {
					ret = optIgnoreCase ? (new CaseInsensitiveRecursiveMatcher(policyValue, pathSeparatorChar)).isMatch(resource)
							: (new CaseSensitiveRecursiveMatcher(policyValue, pathSeparatorChar)).isMatch(resource);
				} else if(optWildCard) {
					ret = FilenameUtils.wildcardMatch(resource, policyValue, caseSensitivity);
				} else {
					ret = optIgnoreCase ? StringUtils.equalsIgnoreCase(resource, policyValue)
										: StringUtils.equals(resource, policyValue);
				}

				if(ret) {
					break;
				}
			}
		}

		ret = applyExcludes(allValuesRequested, ret);

		if(LOG.isDebugEnabled()) {
			LOG.debug("<== RangerPathResourceMatcher.isMatch(" + resource + "): " + ret);
		}

		return ret;
	}

	private boolean isRecursiveWildCardMatch(String pathToCheck, String wildcardPath, char pathSeparatorChar, IOCase caseSensitivity) {
		if(LOG.isDebugEnabled()) {
			LOG.debug("==> RangerPathResourceMatcher.isRecursiveWildCardMatch(" + pathToCheck + ", " + wildcardPath + ", " + pathSeparatorChar + ")");
		}

		boolean ret = false;

		if (! StringUtils.isEmpty(pathToCheck)) {
			String[] pathElements = StringUtils.split(pathToCheck, pathSeparatorChar);

			if(! ArrayUtils.isEmpty(pathElements)) {
				StringBuilder sb = new StringBuilder();

				if(pathToCheck.charAt(0) == pathSeparatorChar) {
					sb.append(pathSeparatorChar); // preserve the initial pathSeparatorChar
				}

				for(String p : pathElements) {
					sb.append(p);

					ret = FilenameUtils.wildcardMatch(sb.toString(), wildcardPath, caseSensitivity) ;

					if (ret) {
						break;
					}

					sb.append(pathSeparatorChar) ;
				}

				sb = null;
			} else { // pathToCheck consists of only pathSeparatorChar
				ret = FilenameUtils.wildcardMatch(pathToCheck, wildcardPath, caseSensitivity) ;
			}
		}

		if(LOG.isDebugEnabled()) {
			LOG.debug("<== RangerPathResourceMatcher.isRecursiveWildCardMatch(" + pathToCheck + ", " + wildcardPath + ", " + pathSeparatorChar + "): " + ret);
		}

		return ret;
	}

	public StringBuilder toString(StringBuilder sb) {
		sb.append("RangerPathResourceMatcher={");

		super.toString(sb);

		sb.append("policyIsRecursive={").append(policyIsRecursive).append("} ");

		sb.append("}");

		return sb;
	}
}

abstract class RecursiveMatcher {
	final String value;
	final char levelSeparatorChar;
	String valueWithoutSeparator = null;
	String valueWithSeparator = null;

	RecursiveMatcher(String value, char levelSeparatorChar) {
		this.value = value;
		this.levelSeparatorChar = levelSeparatorChar;
	}

	String getStringToCompare(String policyValue) {
		return (policyValue.lastIndexOf(levelSeparatorChar) == policyValue.length()-1) ?
			policyValue.substring(0, policyValue.length()-1) : policyValue;
	}
}

final class CaseSensitiveRecursiveMatcher extends RecursiveMatcher {
	CaseSensitiveRecursiveMatcher(String value, char levelSeparatorChar) {
		super(value, levelSeparatorChar);
	}

	boolean isMatch(String resourceValue) {

		if (valueWithoutSeparator == null) {
			valueWithoutSeparator = getStringToCompare(value);
			valueWithSeparator = valueWithoutSeparator + Character.toString(levelSeparatorChar);
		}

		return StringUtils.equals(resourceValue, valueWithoutSeparator)
				|| StringUtils.startsWith(resourceValue, valueWithSeparator);
	}
}

final class CaseInsensitiveRecursiveMatcher extends RecursiveMatcher {
	CaseInsensitiveRecursiveMatcher(String value, char levelSeparatorChar) {
		super(value, levelSeparatorChar);
	}

	boolean isMatch(String resourceValue) {

		if (valueWithoutSeparator == null) {
			valueWithoutSeparator = getStringToCompare(value);
			valueWithSeparator = valueWithoutSeparator + Character.toString(levelSeparatorChar);
		}

		return StringUtils.equalsIgnoreCase(resourceValue, valueWithoutSeparator)
		    || StringUtils.startsWithIgnoreCase(resourceValue, valueWithSeparator);
	}
}
