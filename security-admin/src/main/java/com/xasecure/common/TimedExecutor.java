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

import com.google.common.util.concurrent.ThreadFactoryBuilder;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.concurrent.*;

@Service
@Scope("singleton")
public class TimedExecutor {

    static final private Logger LOG = Logger.getLogger(TimedExecutor.class);

    @Autowired
    TimedExecutorConfigurator _configurator;

    ExecutorService _executorService;

    public TimedExecutor() {
    }

    @PostConstruct
    void initialize() {
        initialize(_configurator);
    }

    // Not designed for public access - only for testability
    void initialize(TimedExecutorConfigurator configurator) {
        final ThreadFactory _ThreadFactory = new ThreadFactoryBuilder()
                .setDaemon(true)
                .setNameFormat("timed-executor-pool-%d")
                .setUncaughtExceptionHandler(new LocalUncaughtExceptionHandler())
                .build();

        final BlockingQueue<Runnable> blockingQueue = new ArrayBlockingQueue<Runnable>(configurator.getBlockingQueueSize());

        _executorService = new LocalThreadPoolExecutor(configurator.getCoreThreadPoolSize(), configurator.getMaxThreadPoolSize(),
                configurator.getKeepAliveTime(), configurator.getKeepAliveTimeUnit(),
                blockingQueue, _ThreadFactory);
    }

    /**
     * Submits the provided callable to the system-wide timed Executor service and then synchrenously waits to fetch its results
     * for the configurable amount of time. NOTE that this
     * @param callable Sumbitted to underlying system-wide Executor service
     * @param time amount of time
     * @param unit units of the time
     * @param <T>
     * @return result of callable if callable can be simitted and finishes in time.
     * @throws Exception
     */
    public <T> T timedTask(Callable<T> callable, long time, TimeUnit unit) throws Exception{
        try {
            Future<T> future = _executorService.submit(callable);
            if (LOG.isDebugEnabled()) {
                if (future.isCancelled()) {
                    LOG.debug("Got back a future that was cancelled already for callable[" + callable + "]!");
                }
            }
            try {
                T result = future.get(time, unit);
                return result;
            } catch (CancellationException e) {
                logException(callable, e);
                throw e;
            } catch (ExecutionException e) {
                logException(callable, e);
                throw e;
            } catch (InterruptedException e) {
                logException(callable, e);
                throw e;
            } catch (TimeoutException e) {
                if (LOG.isDebugEnabled()) {
                    LOG.debug(String.format("TimedExecutor: Timed out waiting for callable[%s] to finish.  Cancelling the task.", callable));
                }
                // Interrupt the running task
                future.cancel(true);
                LOG.debug("TimedExecutor: Re-throwing timeout exception to caller");
                throw e;
            }
        } catch (RejectedExecutionException e) {
            if (LOG.isDebugEnabled()) {
                LOG.debug("Executor rejected callable[" + callable + "], due to resource exhaustion.  Rethrowing exception...");
            }
            throw e;
        }
    }

    <T> void logException(Callable<T> callable, Exception e) {
        if (LOG.isDebugEnabled()) {
            LOG.debug(String.format("TimedExecutor: Caught exception[%s] for callable[%s]: detail[%s].  Re-throwing...", e.getClass().getName(), callable, e.getMessage()));
        }
    }
    /**
     * Not designed for public access.  Non-private only for testability.  Expected to be called by tests to do proper cleanup.
     */
    void shutdown() {
        _executorService.shutdownNow();
    }

    static class LocalUncaughtExceptionHandler implements Thread.UncaughtExceptionHandler {

        @Override
        public void uncaughtException(Thread t, Throwable e) {
            String message = String.format("TimedExecutor: Uncaught exception hanlder received exception[%s] in thread[%s]", t.getClass().getName(), t.getName());
            LOG.warn(message, e);
        }
    }

    static class LocalThreadPoolExecutor extends ThreadPoolExecutor {

        private ThreadLocal<Long> startNanoTime = new ThreadLocal<Long>();

        public LocalThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue, ThreadFactory threadFactory) {
            super(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue, threadFactory);
        }

        @Override
        protected void beforeExecute(Thread t, Runnable r) {
            if (LOG.isDebugEnabled()) {
                LOG.debug("TimedExecutor: Starting execution of a task.");
                startNanoTime.set(System.nanoTime());
            }
            super.beforeExecute(t, r);
        }

        @Override
        protected void afterExecute(Runnable r, Throwable t) {
            super.afterExecute(r, t);
            if (LOG.isDebugEnabled()) {
                long duration = System.nanoTime() - startNanoTime.get();
                LOG.debug("TimedExecutor: Done execution of task. Duration[" + duration/1000000 + " ms].");
            }
        }

        @Override
        protected void terminated() {
            super.terminated();
            LOG.info("TimedExecutor: thread pool has terminated");
        }
    }
}
