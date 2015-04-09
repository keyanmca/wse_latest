#!/bin/bash

  #-------------------------------------------------------------------------
  # UPDATE WSE
  #-------------------------------------------------------------------------


rm -rf update_*.sh*

wget http://www.wsemanager.com/releases/setup/update_wse.sh
wget http://www.wsemanager.com/releases/setup/update_wowza.sh

chmod 777 update*.sh

./update_wse.sh

chmod 777 update*.sh


original_string=`cat dadosbanco.txt  | head -n 5 | tail -n 1`
string_to_replace=
URL="${original_string/url=/$string_to_replace}/fix"



echo "Seu sistema foi atualizado , se você rodou este UPDATE pelo Shell, você deve agora logar em seu sistema."
echo ""
echo " Logue em sua conta e acesse o FIX para atualizar sua base de dados, nesta URL:"

echo ${URL}

echo ""
echo "Obrigado..."