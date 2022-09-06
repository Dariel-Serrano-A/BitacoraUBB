FROM ubuntu:bionic
#paquetes para cambio de charset lenguaje y hora
RUN apt-get update && apt-get install -y locales tzdata apache2
#cambio de charset y lenguaje
RUN sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    update-locale LANG=en_US.UTF-8
#cambio de hora
RUN ln -fs /usr/share/zoneinfo/America/Santiago /etc/localtime 
#negar la interfaz grafica de linux
RUN dpkg-reconfigure -f noninteractive tzdata
#paquetes actualizados para node y angular
RUN apt-get update && apt-get install -y curl 
RUN cd ~ && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - &&\
    cat /etc/apt/sources.list.d/nodesource.list 
#descarga de paquetes de node, typescript y moodulos para servidor rest api con conexion a DB
RUN apt-get install -g -y nodejs npm@latest typescript
ENV LANG en_US.UTF-
#descarga paquetes para server
RUN npm i express morgan mysql2 cors concurrently path formidable &&\
    @types/multer uuid @types/uuid fs-extra @types/fs-extra

#descarga paquetes para angular
RUN npm i @angular/cli && npm i sweetalert2 &&\
    npm i bootstrap@v5.2.0 bootswatch && npm install @syncfusion/ej2-angular-schedule --save &&\
    ng add angular-datatables && ng new client.new --style=css --routing=true

EXPOSE 3000
EXPOSE 4200
WORKDIR /BitacoraUBB/server
CMD ["nohup", "npm", "run", "dev", "&", "&&", "cd", "~", "&&", "cd", "BitacorasUBB/client.new", "&&", "nohup", "ng", "serve", "--host", "0.0.0.0", "2>&1", "&"] 
#Arracar con: docker run -ti -p 1091:4200 client