#!/bin/bash

  #-------------------------------------------------------------------------
  # CORRIGIR PERMISSOES VITAIS PARA WSE
  #-------------------------------------------------------------------------

curr_dir=`pwd`

dir=`dirname $0`
BASEDIR=`cd ..  $dir;pwd`
IP=`curl  http://ipecho.net/plain`
echo "Sistema rodando em : $BASEDIR"
echo ""
echo "$IP"


echo "Checando Permissoes...";

	WSEInstallChownUser=(`ls -l ${BASEDIR} | awk 'NR>1{print $3; exit}'`)
	WSEInstallChownGroup=(`ls -l ${BASEDIR} | awk 'NR>1{print $4; exit}'`)


				
		echo "Chown do diretório: $WSEInstallChownUser"
	
		echo "chown do Grupo do Diretório: $WSEInstallChownGroup"

	
	echo "Atualizando Permissoes WSE..."
       
	chown -R $WSEInstallChownUser:$WSEInstallChownGroup "${BASEDIR}/"
	chmod -R 775 "${BASEDIR}/application/cache"
	chmod -R 775 "${BASEDIR}/temp"
        chmod -R 775 "${BASEDIR}/uploads"
        chmod -R 775 "${BASEDIR}/wseplugins"
        chmod -R 777 "${BASEDIR}/updates/update.sh"

echo "Atualizando Permissoes Wowza..."
        
        chown -R $WSEInstallChownUser:$WSEInstallChownGroup "/usr/local/WowzaStreamingEngine/conf"
        chown -R $WSEInstallChownUser:$WSEInstallChownGroup "/usr/local/WowzaStreamingEngine/content"
        chown -R $WSEInstallChownUser:$WSEInstallChownGroup "/usr/local/WowzaStreamingEngine/application"
        chmod -R 775 "/usr/local/WowzaStreamingEngine/content"
        chmod -R 777 "/usr/local/WowzaStreamingEngine/conf"
        chmod -R 775 "/usr/local/WowzaStreamingEngine/application"
        
        