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

package com.xasecure.common;

import org.apache.log4j.Logger;

import java.util.Date;
import java.util.concurrent.Callable;

/**
 * A wrapper class to provide logging and timing information.
 * @param <T>
 */
public abstract class TimedCallable<T> implements Callable<T> {

    private static final Logger LOG = Logger.getLogger(TimedCallable.class);

    final Date creation; // NOTE: This would be different from when the callable was actually offered to the executor

    public TimedCallable() {
        this.creation = new Date();
    }

    @Override
    public T call() throws Exception {
        Date start = null;
        if (LOG.isDebugEnabled()) {
            start = new Date();
            LOG.debug("==> TimedCallable: " + toString());
        }

        try {
            return actualCall();
        } catch (Exception e) {
            LOG.error("TimedCallable.call: Error:" + e);
            throw e;
        } finally {
            if (LOG.isDebugEnabled()) {
                Date finish = new Date();
                long waitTime = start.getTime() - creation.getTime();
                long executionTime = finish.getTime() - start.getTime();
                LOG.debug(String.format("<== TimedCallable: %s: wait time[%d ms], execution time [%d ms]", toString(), waitTime, executionTime));
            }
        }
    }

    public abstract T actualCall() throws Exception;
}

