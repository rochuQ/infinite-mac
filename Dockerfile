FROM ubuntu:22.04

RUN apt update && apt install -y \
    python3 cmake git build-essential \
    autoconf libsdl1.2-dev wget lzip

# Emscripten still does not release arm64 versions of their Docker images
# (https://github.com/emscripten-core/emsdk/issues/1206) so we need to install
# the SDK manually.
RUN git clone https://github.com/emscripten-core/emsdk.git \
    && cd emsdk \
    && ./emsdk install 3.1.33 \
    && ./emsdk activate 3.1.33 \
    && echo "source $(pwd)/emsdk_env.sh" >> $HOME/.bashrc

COPY macemu/BasiliskII/src/Unix/_em_build_mpfr.sh /tmp/_em_build_mpfr.sh
RUN /tmp/_em_build_mpfr.sh
