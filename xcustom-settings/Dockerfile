FROM centos

RUN mkdir /tools
WORKDIR /tools

#Install default services
#RUN yum clean all
RUN yum install -y wget
RUN yum install -y git
RUN yum install -y gcc
RUN yum install -y bzip2
RUN yum install -y fontconfig freetype freetype-devel fontconfig-devel libstdc++

#Download and install JDK8 from AWS s3's docker-assets
RUN wget --no-check-certificate https://s3.eu-central-1.amazonaws.com/docker-assets/dist/jdk-8u101-linux-x64.rpm
RUN rpm -i jdk-8u101-linux-x64.rpm

ENV JAVA_HOME /usr/java/latest
ENV  PATH "$JAVA_HOME/bin:$PATH"

RUN wget --no-check-certificate https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2
RUN mkdir -p /opt/phantomjs
RUN tar -jxvf /tools/phantomjs-2.1.1-linux-x86_64.tar.bz2 --strip-components=1 -C /opt/phantomjs/
RUN ln -s /opt/phantomjs/bin/phantomjs /usr/bin/phantomjs
ENV  PATH "$JAVA_HOME/bin:/opt/phantomjs/bin:$PATH"

ADD https://www.apache.org/dist/maven/maven-3/3.5.4/binaries/apache-maven-3.5.4-bin.tar.gz.sha512 /tools
ADD http://www-us.apache.org/dist/maven/maven-3/3.5.4/binaries/apache-maven-3.5.4-bin.tar.gz /tools
RUN sha512sum  apache-maven-3.5.4-bin.tar.gz | cut -f 1 -d " " > tmp.sha1

RUN diff -w tmp.sha1 apache-maven-3.5.4-bin.tar.gz.sha512

RUN tar xfz apache-maven-3.5.4-bin.tar.gz
RUN ln -sf /tools/apache-maven-3.5.4 /tools/maven

ENV  PATH "/tools/maven/bin:$PATH"
ENV MAVEN_OPTS "-Xmx2048m -XX:MaxPermSize=512m"

#ENV http_proxy 192.168.56.1:58888
#ENV https_proxy 192.168.56.1:58888
#ENV HTTP_PROXY 192.168.56.1:58888
#ENV HTTPS_PROXY 192.168.56.1:58888

COPY nodejs.crt /etc/pki/ca-trust/source/anchors/nodejs.crt
RUN update-ca-trust
RUN keytool -importcert -keypass changeit -file /etc/pki/ca-trust/source/anchors/nodejs.crt -keystore /usr/java/latest/jre/lib/security/cacerts -noprompt -storepass changeit -alias nodejs

# Setup gosu for easier command execution
RUN  gpg --keyserver hkp://p80.pool.sks-keyservers.net:80 --keyserver-options "timeout=10 http-proxy=192.168.56.1:58888" --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4 \
    && curl -o /usr/local/bin/gosu -SL "https://github.com/tianon/gosu/releases/download/1.10/gosu-amd64" --insecure -x http://192.168.56.1:58888 \
    && curl -o /usr/local/bin/gosu.asc -SL "https://github.com/tianon/gosu/releases/download/1.10/gosu-amd64.asc" --insecure -x http://192.168.56.1:58888 \
    && gpg --verify /usr/local/bin/gosu.asc \
    && rm /usr/local/bin/gosu.asc \
    && rm -r /root/.gnupg/ \
    && chmod +x /usr/local/bin/gosu

ENV  PATH "/usr/sbin:/tools/maven/bin:$PATH"

RUN useradd -ms /bin/bash builder
RUN usermod -g root builder
RUN mkdir -p /scripts

RUN echo "#!/bin/bash" > /scripts/mvn.sh
RUN echo 'set -x; if [ "$1" = "mvn" ]; then usermod -u $(stat -c "%u" pom.xml) builder; gosu builder bash -c '"'"'ln -sf /.m2 $HOME'"'"'; exec gosu builder "$@"; fi; exec "$@" ' >> /scripts/mvn.sh

RUN chmod -R 777 /scripts
RUN chmod -R 777 /tools

ENTRYPOINT ["/scripts/mvn.sh"]