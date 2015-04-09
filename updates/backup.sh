#!/bin/bash

  #-------------------------------------------------------------------------
  # BACKUP SISTEMA
  #-------------------------------------------------------------------------

curr_dir=`pwd`

dir=`dirname $0`
BASEDIR=`cd ..  $dir;pwd`
IP=`curl  http://ipecho.net/plain`
echo "Atualizar o sistema em : $BASEDIR"
echo ""
echo "$IP"

rm -rf dadosbanco.txt

  #-------------------------------------------------------------------------
  # BACKUP SISTEMA
  #-------------------------------------------------------------------------

cat ${BASEDIR}/application/config/dados.conf >> dadosbanco.txt

sed -i "s/'//g" dadosbanco.txt
sed -i "s/<?php/#DADOS BANCO/g" dadosbanco.txt
sed -i "s/\$banco=//g" dadosbanco.txt
sed -i "s/\$usuario=//g" dadosbanco.txt
sed -i "s/\$senha=//g" dadosbanco.txt
sed -i "s/\$url/url/g" dadosbanco.txt
sed -i "s/\$host=/host/g" dadosbanco.txt
sed -i "s/;//g" dadosbanco.txt

DIA=`date +%d_%m_%Y`

#hora_%H_%M_%S_dia_

BANCO=`cat dadosbanco.txt  | head -n 2 | tail -n 1`
USUARIO=`cat dadosbanco.txt | head -n 3 | tail -n 1`
SENHA=`cat dadosbanco.txt  | head -n 4 | tail -n 1`
HOST=`localhost`



mysqldump --opt --user=$USUARIO --password=$SENHA --host=${HOST} $BANCO  > backup_${DIA}.sql



if [ -f "backup_${DIA}.sql" ]
then
	echo "Backup realizado:  $backup_${DIA}.sql "
else
	echo "Não foi possível criar o backup do sistema: $backup_${DIA}.sql"
fi


  #-------------------------------------------------------------------------
  # FIM BACKUP SISTEMA
  #-------------------------------------------------------------------------