FROM ubuntu

WORKDIR /root
COPY setup.sh setup.sh
RUN printf '#!/bin/sh\nexit 0' > /usr/sbin/policy-rc.d


CMD ["sh", "setup.sh"]