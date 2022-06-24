FROM ubuntu

WORKDIR /root
COPY setup.sh setup.sh
COPY postfix/main.cf main.cf
COPY postfix/aliases aliases
RUN printf '#!/bin/sh\nexit 0' > /usr/sbin/policy-rc.d


CMD ["sh", "setup.sh"]