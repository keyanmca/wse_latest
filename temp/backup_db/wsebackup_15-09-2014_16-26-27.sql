-- Wse SQL Dump
-- Server version: 5.5.38-0ubuntu0.12.04.1
-- Generated: 2014-09-15 04:26:27
-- Current PHP version: 5.5.15-1+deb.sury.org~precise+1
-- Host: localhost
-- Database: wsemanag

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------
-- Structure for 'ci_sessions'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `ci_sessions`;
CREATE TABLE `ci_sessions` (
  `session_id` varchar(40) NOT NULL DEFAULT '0',
  `ip_address` varchar(45) NOT NULL DEFAULT '0',
  `user_agent` varchar(120) NOT NULL,
  `last_activity` int(10) unsigned NOT NULL DEFAULT '0',
  `user_data` text NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `last_activity_idx` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
-- Dump Data for `ci_sessions`
-- --------------------------------------------------------

BEGIN; 
INSERT INTO `ci_sessions` VALUES 
('0d3fefb88db2edbbe9963de5822fa18f','189.58.196.80','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36','1410804628',''), ('596e6d320a0b7a3e68bc4f544bce9b8c','54.92.153.90','Cloud mapping experiment. Contact research@pdrlabs.net','1410805783','')
;
COMMIT; 

-- --------------------------------------------------------
-- Structure for 'ftpgroup'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `ftpgroup`;
CREATE TABLE `ftpgroup` (
  `groupname` varchar(16) NOT NULL DEFAULT '',
  `gid` smallint(6) NOT NULL DEFAULT '5500',
  `members` varchar(16) NOT NULL DEFAULT '',
  KEY `groupname` (`groupname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ProFTP group table';

-- --------------------------------------------------------
-- Structure for 'ftpquotalimits'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `ftpquotalimits`;
CREATE TABLE `ftpquotalimits` (
  `name` varchar(255) DEFAULT NULL,
  `quota_type` enum('user','group','class','all') NOT NULL DEFAULT 'user',
  `per_session` enum('false','true') NOT NULL DEFAULT 'false',
  `limit_type` enum('soft','hard') NOT NULL DEFAULT 'hard',
  `bytes_in_avail` bigint(20) unsigned NOT NULL DEFAULT '0',
  `bytes_out_avail` bigint(20) unsigned NOT NULL DEFAULT '0',
  `bytes_xfer_avail` bigint(20) unsigned NOT NULL DEFAULT '0',
  `files_in_avail` int(10) unsigned NOT NULL DEFAULT '0',
  `files_out_avail` int(10) unsigned NOT NULL DEFAULT '0',
  `files_xfer_avail` int(10) unsigned NOT NULL DEFAULT '0',
  `aplicacao_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ProFTP quota limits';

-- --------------------------------------------------------
-- Dump Data for `ftpquotalimits`
-- --------------------------------------------------------

BEGIN; 
INSERT INTO `ftpquotalimits` VALUES 
('demotvstation','user','false','hard','10485760000','0','0','0','0','0','1'), ('demo','user','false','hard','10485760000','0','0','0','0','0','5'), ('demo2','user','false','hard','10485760000','0','0','0','0','0','6')
;
COMMIT; 

-- --------------------------------------------------------
-- Structure for 'ftpquotatallies'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `ftpquotatallies`;
CREATE TABLE `ftpquotatallies` (
  `name` varchar(255) NOT NULL DEFAULT '',
  `quota_type` enum('user','group','class','all') NOT NULL DEFAULT 'user',
  `bytes_in_used` bigint(20) unsigned NOT NULL DEFAULT '0',
  `bytes_out_used` bigint(20) unsigned NOT NULL DEFAULT '0',
  `bytes_xfer_used` bigint(20) unsigned NOT NULL DEFAULT '0',
  `files_in_used` int(10) unsigned NOT NULL DEFAULT '0',
  `files_out_used` int(10) unsigned NOT NULL DEFAULT '0',
  `files_xfer_used` int(10) unsigned NOT NULL DEFAULT '0',
  `aplicacao_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ProFTP quota tallies';

-- --------------------------------------------------------
-- Dump Data for `ftpquotatallies`
-- --------------------------------------------------------

BEGIN; 
INSERT INTO `ftpquotatallies` VALUES 
('demotvstation','user','34665754','0','0','0','0','0','1'), ('demo','user','0','0','0','0','0','0','5'), ('demo2','user','6484752','0','0','0','0','0','6')
;
COMMIT; 

-- --------------------------------------------------------
-- Structure for 'ftpuser'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `ftpuser`;
CREATE TABLE `ftpuser` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userid` varchar(255) NOT NULL DEFAULT '',
  `passwd` varchar(64) NOT NULL DEFAULT '',
  `uid` smallint(6) NOT NULL DEFAULT '2001',
  `gid` smallint(6) NOT NULL DEFAULT '2001',
  `homedir` varchar(255) NOT NULL DEFAULT '',
  `shell` varchar(16) NOT NULL DEFAULT '/sbin/nologin',
  `count` int(11) NOT NULL DEFAULT '0',
  `accessed` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `email` varchar(255) DEFAULT NULL,
  `aplicacao_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userid` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COMMENT='ProFTP user table';

-- --------------------------------------------------------
-- Dump Data for `ftpuser`
-- --------------------------------------------------------

BEGIN; 
INSERT INTO `ftpuser` VALUES 
('33','wsemanager','ch790610','1004','1004','/var/www','/sbin/nologin','724','2014-09-15 16:06:15','2014-09-15 16:26:24','','0'), ('34','demotvstation','demotvstation','1004','1004','/usr/local/WowzaStreamingEngine/content/demotvstation','/sbin/nologin','0','0000-00-00 00:00:00','0000-00-00 00:00:00','','1'), ('41','demo','demos','1004','1004','/usr/local/WowzaStreamingEngine/content/demo','/sbin/nologin','0','0000-00-00 00:00:00','0000-00-00 00:00:00','','5'), ('42','demo2','demo2','1004','1004','/usr/local/WowzaStreamingEngine/content/demo2','/sbin/nologin','0','0000-00-00 00:00:00','0000-00-00 00:00:00','','6')
;
COMMIT; 

-- --------------------------------------------------------
-- Structure for 'tab_aplicacoes'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `tab_aplicacoes`;
CREATE TABLE `tab_aplicacoes` (
  `aplicacoes_id` int(10) NOT NULL AUTO_INCREMENT,
  `aplicacoes_user_id` int(10) NOT NULL,
  `aplicacoes_plano_id` int(10) NOT NULL,
  `aplicacoes_acessos` int(11) NOT NULL,
  `aplicacoes_bitrate` int(11) NOT NULL,
  `aplicacoes_trafego` int(11) NOT NULL,
  `aplicacoes_espaco_disco` int(11) NOT NULL,
  `aplicacoes_id_servidor` int(11) NOT NULL,
  `aplicacoes_id_plugin` int(11) NOT NULL,
  `aplicacoes_nivel` varchar(255) NOT NULL,
  `aplicacoes_status` varchar(100) NOT NULL,
  `aplicacoes_data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `aplicacoes_nome` varchar(255) NOT NULL,
  `aplicacoes_ftp_usuario` varchar(255) NOT NULL,
  `aplicacoes_ftp_senha` varchar(255) NOT NULL,
  `aplicacoes_senha` varchar(255) NOT NULL,
  `aplicacoes_pendente` int(11) NOT NULL DEFAULT '0',
  `aplicacoes_shoutcast_host` varchar(255) NOT NULL,
  `aplicacoes_tipo_player` varchar(255) NOT NULL,
  `aplicacoes_convertendo_video` int(11) NOT NULL,
  PRIMARY KEY (`aplicacoes_id`),
  KEY `aplicacoes_user_id` (`aplicacoes_user_id`),
  CONSTRAINT `aplicacoes_user_id` FOREIGN KEY (`aplicacoes_user_id`) REFERENCES `tab_usuarios` (`usuarios_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
-- Dump Data for `tab_aplicacoes`
-- --------------------------------------------------------

BEGIN; 
INSERT INTO `tab_aplicacoes` VALUES 
('5','1','1','1000','1024','9','10000','1','1','admin','Ativa','2014-09-10 19:31:39','demo','demo','demos','demos','0','0','jwplayer6','0'), ('6','1','1','1000','1024','9','10000','1','3','admin','Ativa','2014-09-10 19:32:04','demo2','demo2','demo2','demo2','0','0','jwplayer6','0')
;
COMMIT; 

-- --------------------------------------------------------
-- Structure for 'tab_arquivos_video'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `tab_arquivos_video`;
CREATE TABLE `tab_arquivos_video` (
  `video_id` int(11) NOT NULL AUTO_INCREMENT,
  `video_aplicacao_id` int(11) NOT NULL,
  `video_titulo` varchar(255) NOT NULL,
  `video_video` varchar(255) NOT NULL,
  `video_bitrate` varchar(255) NOT NULL,
  `video_duracao` varchar(255) NOT NULL,
  `video_segundos` varchar(255) NOT NULL,
  `video_nome` varchar(255) NOT NULL,
  `video_thumbnail` varchar(255) NOT NULL,
  `video_data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`video_id`),
  KEY `video_aplicacao_id` (`video_aplicacao_id`),
  CONSTRAINT `tab_arquivos_video_ibfk_1` FOREIGN KEY (`video_aplicacao_id`) REFERENCES `tab_aplicacoes` (`aplicacoes_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
-- Structure for 'tab_aux_bitrate'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `tab_aux_bitrate`;
CREATE TABLE `tab_aux_bitrate` (
  `bit_id` int(11) NOT NULL AUTO_INCREMENT,
  `bit_descricao` varchar(255) NOT NULL,
  `bit_valor` int(11) NOT NULL,
  PRIMARY KEY (`bit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
-- Dump Data for `tab_aux_bitrate`
-- --------------------------------------------------------

BEGIN; 
INSERT INTO `tab_aux_bitrate` VALUES 
('1','200 Kbps','200'), ('2','400 Kbps','400'), ('3','600 Kbps','600'), ('4','800 Kbps','800'), ('5','1024 Kbps','1024'), ('6','1600 Kbps','1600'), ('7','2000 Kbps','2000'), ('8','Ilimitado','9999')
;
COMMIT; 

-- --------------------------------------------------------
-- Structure for 'tab_aux_timezone'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `tab_aux_timezone`;
CREATE TABLE `tab_aux_timezone` (
  `Name` char(64) NOT NULL,
  `Time_zone_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`Name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED COMMENT='Time zone names';

-- --------------------------------------------------------
-- Dump Data for `tab_aux_timezone`
-- --------------------------------------------------------

BEGIN; 
INSERT INTO `tab_aux_timezone` VALUES 
('Africa/Abidjan','1'), ('Africa/Accra','2'), ('Africa/Addis_Ababa','3'), ('Africa/Algiers','4'), ('Africa/Asmara','5'), ('Africa/Asmera','6'), ('Africa/Bamako','7'), ('Africa/Bangui','8'), ('Africa/Banjul','9'), ('Africa/Bissau','10'), ('Africa/Blantyre','11'), ('Africa/Brazzaville','12'), ('Africa/Bujumbura','13'), ('Africa/Cairo','14'), ('Africa/Casablanca','15'), ('Africa/Ceuta','16'), ('Africa/Conakry','17'), ('Africa/Dakar','18'), ('Africa/Dar_es_Salaam','19'), ('Africa/Djibouti','20'), ('Africa/Douala','21'), ('Africa/El_Aaiun','22'), ('Africa/Freetown','23'), ('Africa/Gaborone','24'), ('Africa/Harare','25'), ('Africa/Johannesburg','26'), ('Africa/Juba','27'), ('Africa/Kampala','28'), ('Africa/Khartoum','29'), ('Africa/Kigali','30'), ('Africa/Kinshasa','31'), ('Africa/Lagos','32'), ('Africa/Libreville','33'), ('Africa/Lome','34'), ('Africa/Luanda','35'), ('Africa/Lubumbashi','36'), ('Africa/Lusaka','37'), ('Africa/Malabo','38'), ('Africa/Maputo','39'), ('Africa/Maseru','40'), ('Africa/Mbabane','41'), ('Africa/Mogadishu','42'), ('Africa/Monrovia','43'), ('Africa/Nairobi','44'), ('Africa/Ndjamena','45'), ('Africa/Niamey','46'), ('Africa/Nouakchott','47'), ('Africa/Ouagadougou','48'), ('Africa/Porto-Novo','49'), ('Africa/Sao_Tome','50'), ('Africa/Timbuktu','51'), ('Africa/Tripoli','52'), ('Africa/Tunis','53'), ('Africa/Windhoek','54'), ('America/Adak','55'), ('America/Anchorage','56'), ('America/Anguilla','57'), ('America/Antigua','58'), ('America/Araguaina','59'), ('America/Argentina/Buenos_Aires','60'), ('America/Argentina/Catamarca','61'), ('America/Argentina/ComodRivadavia','62'), ('America/Argentina/Cordoba','63'), ('America/Argentina/Jujuy','64'), ('America/Argentina/La_Rioja','65'), ('America/Argentina/Mendoza','66'), ('America/Argentina/Rio_Gallegos','67'), ('America/Argentina/Salta','68'), ('America/Argentina/San_Juan','69'), ('America/Argentina/San_Luis','70'), ('America/Argentina/Tucuman','71'), ('America/Argentina/Ushuaia','72'), ('America/Aruba','73'), ('America/Asuncion','74'), ('America/Atikokan','75'), ('America/Atka','76'), ('America/Bahia','77'), ('America/Bahia_Banderas','78'), ('America/Barbados','79'), ('America/Belem','80'), ('America/Belize','81'), ('America/Blanc-Sablon','82'), ('America/Boa_Vista','83'), ('America/Bogota','84'), ('America/Boise','85'), ('America/Buenos_Aires','86'), ('America/Cambridge_Bay','87'), ('America/Campo_Grande','88'), ('America/Cancun','89'), ('America/Caracas','90'), ('America/Catamarca','91'), ('America/Cayenne','92'), ('America/Cayman','93'), ('America/Chicago','94'), ('America/Chihuahua','95'), ('America/Coral_Harbour','96'), ('America/Cordoba','97'), ('America/Costa_Rica','98'), ('America/Cuiaba','99'), ('America/Curacao','100'), ('America/Danmarkshavn','101'), ('America/Dawson','102'), ('America/Dawson_Creek','103'), ('America/Denver','104'), ('America/Detroit','105'), ('America/Dominica','106'), ('America/Edmonton','107'), ('America/Eirunepe','108'), ('America/El_Salvador','109'), ('America/Ensenada','110'), ('America/Fort_Wayne','111'), ('America/Fortaleza','112'), ('America/Glace_Bay','113'), ('America/Godthab','114'), ('America/Goose_Bay','115'), ('America/Grand_Turk','116'), ('America/Grenada','117'), ('America/Guadeloupe','118'), ('America/Guatemala','119'), ('America/Guayaquil','120'), ('America/Guyana','121'), ('America/Halifax','122'), ('America/Havana','123'), ('America/Hermosillo','124'), ('America/Indiana/Indianapolis','125'), ('America/Indiana/Knox','126'), ('America/Indiana/Marengo','127'), ('America/Indiana/Petersburg','128'), ('America/Indiana/Tell_City','129'), ('America/Indiana/Vevay','130'), ('America/Indiana/Vincennes','131'), ('America/Indiana/Winamac','132'), ('America/Indianapolis','133'), ('America/Inuvik','134'), ('America/Iqaluit','135'), ('America/Jamaica','136'), ('America/Jujuy','137'), ('America/Juneau','138'), ('America/Kentucky/Louisville','139'), ('America/Kentucky/Monticello','140'), ('America/Knox_IN','141'), ('America/Kralendijk','142'), ('America/La_Paz','143'), ('America/Lima','144'), ('America/Los_Angeles','145'), ('America/Louisville','146'), ('America/Lower_Princes','147'), ('America/Maceio','148'), ('America/Managua','149'), ('America/Manaus','150'), ('America/Marigot','151'), ('America/Martinique','152'), ('America/Matamoros','153'), ('America/Mazatlan','154'), ('America/Mendoza','155'), ('America/Menominee','156'), ('America/Merida','157'), ('America/Metlakatla','158'), ('America/Mexico_City','159'), ('America/Miquelon','160'), ('America/Moncton','161'), ('America/Monterrey','162'), ('America/Montevideo','163'), ('America/Montreal','164'), ('America/Montserrat','165'), ('America/Nassau','166'), ('America/New_York','167'), ('America/Nipigon','168'), ('America/Nome','169'), ('America/Noronha','170'), ('America/North_Dakota/Beulah','171'), ('America/North_Dakota/Center','172'), ('America/North_Dakota/New_Salem','173'), ('America/Ojinaga','174'), ('America/Panama','175'), ('America/Pangnirtung','176'), ('America/Paramaribo','177'), ('America/Phoenix','178'), ('America/Port-au-Prince','179'), ('America/Port_of_Spain','180'), ('America/Porto_Acre','181'), ('America/Porto_Velho','182'), ('America/Puerto_Rico','183'), ('America/Rainy_River','184'), ('America/Rankin_Inlet','185'), ('America/Recife','186'), ('America/Regina','187'), ('America/Resolute','188'), ('America/Rio_Branco','189'), ('America/Rosario','190'), ('America/Santa_Isabel','191'), ('America/Santarem','192'), ('America/Santiago','193'), ('America/Santo_Domingo','194'), ('America/Sao_Paulo','195'), ('America/Scoresbysund','196'), ('America/Shiprock','197'), ('America/Sitka','198'), ('America/St_Barthelemy','199'), ('America/St_Johns','200'), ('America/St_Kitts','201'), ('America/St_Lucia','202'), ('America/St_Thomas','203'), ('America/St_Vincent','204'), ('America/Swift_Current','205'), ('America/Tegucigalpa','206'), ('America/Thule','207'), ('America/Thunder_Bay','208'), ('America/Tijuana','209'), ('America/Toronto','210'), ('America/Tortola','211'), ('America/Vancouver','212'), ('America/Virgin','213'), ('America/Whitehorse','214'), ('America/Winnipeg','215'), ('America/Yakutat','216'), ('America/Yellowknife','217'), ('Antarctica/Casey','218'), ('Antarctica/Davis','219'), ('Antarctica/DumontDUrville','220'), ('Antarctica/Macquarie','221'), ('Antarctica/Mawson','222'), ('Antarctica/McMurdo','223'), ('Antarctica/Palmer','224'), ('Antarctica/Rothera','225'), ('Antarctica/South_Pole','226'), ('Antarctica/Syowa','227'), ('Antarctica/Vostok','228'), ('Arctic/Longyearbyen','229'), ('Asia/Aden','230'), ('Asia/Almaty','231'), ('Asia/Amman','232'), ('Asia/Anadyr','233'), ('Asia/Aqtau','234'), ('Asia/Aqtobe','235'), ('Asia/Ashgabat','236'), ('Asia/Ashkhabad','237'), ('Asia/Baghdad','238'), ('Asia/Bahrain','239'), ('Asia/Baku','240'), ('Asia/Bangkok','241'), ('Asia/Beirut','242'), ('Asia/Bishkek','243'), ('Asia/Brunei','244'), ('Asia/Calcutta','245'), ('Asia/Choibalsan','246'), ('Asia/Chongqing','247'), ('Asia/Chungking','248'), ('Asia/Colombo','249'), ('Asia/Dacca','250'), ('Asia/Damascus','251'), ('Asia/Dhaka','252'), ('Asia/Dili','253'), ('Asia/Dubai','254'), ('Asia/Dushanbe','255'), ('Asia/Gaza','256'), ('Asia/Harbin','257'), ('Asia/Hebron','258'), ('Asia/Ho_Chi_Minh','259'), ('Asia/Hong_Kong','260'), ('Asia/Hovd','261'), ('Asia/Irkutsk','262'), ('Asia/Istanbul','263'), ('Asia/Jakarta','264'), ('Asia/Jayapura','265'), ('Asia/Jerusalem','266'), ('Asia/Kabul','267'), ('Asia/Kamchatka','268'), ('Asia/Karachi','269'), ('Asia/Kashgar','270'), ('Asia/Kathmandu','271'), ('Asia/Katmandu','272'), ('Asia/Kolkata','273'), ('Asia/Krasnoyarsk','274'), ('Asia/Kuala_Lumpur','275'), ('Asia/Kuching','276'), ('Asia/Kuwait','277'), ('Asia/Macao','278'), ('Asia/Macau','279'), ('Asia/Magadan','280'), ('Asia/Makassar','281'), ('Asia/Manila','282'), ('Asia/Muscat','283'), ('Asia/Nicosia','284'), ('Asia/Novokuznetsk','285'), ('Asia/Novosibirsk','286'), ('Asia/Omsk','287'), ('Asia/Oral','288'), ('Asia/Phnom_Penh','289'), ('Asia/Pontianak','290'), ('Asia/Pyongyang','291'), ('Asia/Qatar','292'), ('Asia/Qyzylorda','293'), ('Asia/Rangoon','294'), ('Asia/Riyadh','295'), ('Asia/Saigon','296'), ('Asia/Sakhalin','297'), ('Asia/Samarkand','298'), ('Asia/Seoul','299'), ('Asia/Shanghai','300'), ('Asia/Singapore','301'), ('Asia/Taipei','302'), ('Asia/Tashkent','303'), ('Asia/Tbilisi','304'), ('Asia/Tehran','305'), ('Asia/Tel_Aviv','306'), ('Asia/Thimbu','307'), ('Asia/Thimphu','308'), ('Asia/Tokyo','309'), ('Asia/Ujung_Pandang','310'), ('Asia/Ulaanbaatar','311'), ('Asia/Ulan_Bator','312'), ('Asia/Urumqi','313'), ('Asia/Vientiane','314'), ('Asia/Vladivostok','315'), ('Asia/Yakutsk','316'), ('Asia/Yekaterinburg','317'), ('Asia/Yerevan','318'), ('Atlantic/Azores','319'), ('Atlantic/Bermuda','320'), ('Atlantic/Canary','321'), ('Atlantic/Cape_Verde','322'), ('Atlantic/Faeroe','323'), ('Atlantic/Faroe','324'), ('Atlantic/Jan_Mayen','325'), ('Atlantic/Madeira','326'), ('Atlantic/Reykjavik','327'), ('Atlantic/South_Georgia','328'), ('Atlantic/St_Helena','329'), ('Atlantic/Stanley','330'), ('Australia/ACT','331'), ('Australia/Adelaide','332'), ('Australia/Brisbane','333'), ('Australia/Broken_Hill','334'), ('Australia/Canberra','335'), ('Australia/Currie','336'), ('Australia/Darwin','337'), ('Australia/Eucla','338'), ('Australia/Hobart','339'), ('Australia/LHI','340'), ('Australia/Lindeman','341'), ('Australia/Lord_Howe','342'), ('Australia/Melbourne','343'), ('Australia/NSW','344'), ('Australia/North','345'), ('Australia/Perth','346'), ('Australia/Queensland','347'), ('Australia/South','348'), ('Australia/Sydney','349'), ('Australia/Tasmania','350'), ('Australia/Victoria','351'), ('Australia/West','352'), ('Australia/Yancowinna','353'), ('Brazil/Acre','354'), ('Brazil/DeNoronha','355'), ('Brazil/East','356'), ('Brazil/West','357'), ('CET','358'), ('CST6CDT','359'), ('Canada/Atlantic','360'), ('Canada/Central','361'), ('Canada/East-Saskatchewan','362'), ('Canada/Eastern','363'), ('Canada/Mountain','364'), ('Canada/Newfoundland','365'), ('Canada/Pacific','366'), ('Canada/Saskatchewan','367'), ('Canada/Yukon','368'), ('Chile/Continental','369'), ('Chile/EasterIsland','370'), ('Cuba','371'), ('EET','372'), ('EST','373'), ('EST5EDT','374'), ('Egypt','375'), ('Eire','376'), ('Etc/GMT','377'), ('Etc/GMT+0','378'), ('Etc/GMT+1','379'), ('Etc/GMT+10','380'), ('Etc/GMT+11','381'), ('Etc/GMT+12','382'), ('Etc/GMT+2','383'), ('Etc/GMT+3','384'), ('Etc/GMT+4','385'), ('Etc/GMT+5','386'), ('Etc/GMT+6','387'), ('Etc/GMT+7','388'), ('Etc/GMT+8','389'), ('Etc/GMT+9','390'), ('Etc/GMT-0','391'), ('Etc/GMT-1','392'), ('Etc/GMT-10','393'), ('Etc/GMT-11','394'), ('Etc/GMT-12','395'), ('Etc/GMT-13','396'), ('Etc/GMT-14','397'), ('Etc/GMT-2','398'), ('Etc/GMT-3','399'), ('Etc/GMT-4','400'), ('Etc/GMT-5','401'), ('Etc/GMT-6','402'), ('Etc/GMT-7','403'), ('Etc/GMT-8','404'), ('Etc/GMT-9','405'), ('Etc/GMT0','406'), ('Etc/Greenwich','407'), ('Etc/UCT','408'), ('Etc/UTC','409'), ('Etc/Universal','410'), ('Etc/Zulu','411'), ('Europe/Amsterdam','412'), ('Europe/Andorra','413'), ('Europe/Athens','414'), ('Europe/Belfast','415'), ('Europe/Belgrade','416'), ('Europe/Berlin','417'), ('Europe/Bratislava','418'), ('Europe/Brussels','419'), ('Europe/Bucharest','420'), ('Europe/Budapest','421'), ('Europe/Chisinau','422'), ('Europe/Copenhagen','423'), ('Europe/Dublin','424'), ('Europe/Gibraltar','425'), ('Europe/Guernsey','426'), ('Europe/Helsinki','427'), ('Europe/Isle_of_Man','428'), ('Europe/Istanbul','429'), ('Europe/Jersey','430'), ('Europe/Kaliningrad','431'), ('Europe/Kiev','432'), ('Europe/Lisbon','433'), ('Europe/Ljubljana','434'), ('Europe/London','435'), ('Europe/Luxembourg','436'), ('Europe/Madrid','437'), ('Europe/Malta','438'), ('Europe/Mariehamn','439'), ('Europe/Minsk','440'), ('Europe/Monaco','441'), ('Europe/Moscow','442'), ('Europe/Nicosia','443'), ('Europe/Oslo','444'), ('Europe/Paris','445'), ('Europe/Podgorica','446'), ('Europe/Prague','447'), ('Europe/Riga','448'), ('Europe/Rome','449'), ('Europe/Samara','450'), ('Europe/San_Marino','451'), ('Europe/Sarajevo','452'), ('Europe/Simferopol','453'), ('Europe/Skopje','454'), ('Europe/Sofia','455'), ('Europe/Stockholm','456'), ('Europe/Tallinn','457'), ('Europe/Tirane','458'), ('Europe/Tiraspol','459'), ('Europe/Uzhgorod','460'), ('Europe/Vaduz','461'), ('Europe/Vatican','462'), ('Europe/Vienna','463'), ('Europe/Vilnius','464'), ('Europe/Volgograd','465'), ('Europe/Warsaw','466'), ('Europe/Zagreb','467'), ('Europe/Zaporozhye','468'), ('Europe/Zurich','469'), ('Factory','470'), ('GB','471'), ('GB-Eire','472'), ('GMT','473'), ('GMT+0','474'), ('GMT-0','475'), ('GMT0','476'), ('Greenwich','477'), ('HST','478'), ('Hongkong','479'), ('Iceland','480'), ('Indian/Antananarivo','481'), ('Indian/Chagos','482'), ('Indian/Christmas','483'), ('Indian/Cocos','484'), ('Indian/Comoro','485'), ('Indian/Kerguelen','486'), ('Indian/Mahe','487'), ('Indian/Maldives','488'), ('Indian/Mauritius','489'), ('Indian/Mayotte','490'), ('Indian/Reunion','491'), ('Iran','492'), ('Israel','493'), ('Jamaica','494'), ('Japan','495'), ('Kwajalein','496'), ('Libya','497'), ('MET','498'), ('MST','499'), ('MST7MDT','500'), ('Mexico/BajaNorte','501'), ('Mexico/BajaSur','502'), ('Mexico/General','503'), ('NZ','504'), ('NZ-CHAT','505'), ('Navajo','506'), ('PRC','507'), ('PST8PDT','508'), ('Pacific/Apia','509'), ('Pacific/Auckland','510'), ('Pacific/Chatham','511'), ('Pacific/Chuuk','512'), ('Pacific/Easter','513'), ('Pacific/Efate','514'), ('Pacific/Enderbury','515'), ('Pacific/Fakaofo','516'), ('Pacific/Fiji','517'), ('Pacific/Funafuti','518'), ('Pacific/Galapagos','519'), ('Pacific/Gambier','520'), ('Pacific/Guadalcanal','521'), ('Pacific/Guam','522'), ('Pacific/Honolulu','523'), ('Pacific/Johnston','524'), ('Pacific/Kiritimati','525'), ('Pacific/Kosrae','526'), ('Pacific/Kwajalein','527'), ('Pacific/Majuro','528'), ('Pacific/Marquesas','529'), ('Pacific/Midway','530'), ('Pacific/Nauru','531'), ('Pacific/Niue','532'), ('Pacific/Norfolk','533'), ('Pacific/Noumea','534'), ('Pacific/Pago_Pago','535'), ('Pacific/Palau','536'), ('Pacific/Pitcairn','537'), ('Pacific/Pohnpei','538'), ('Pacific/Ponape','539'), ('Pacific/Port_Moresby','540'), ('Pacific/Rarotonga','541'), ('Pacific/Saipan','542'), ('Pacific/Samoa','543'), ('Pacific/Tahiti','544'), ('Pacific/Tarawa','545'), ('Pacific/Tongatapu','546'), ('Pacific/Truk','547'), ('Pacific/Wake','548'), ('Pacific/Wallis','549'), ('Pacific/Yap','550'), ('Poland','551'), ('Portugal','552'), ('ROC','553'), ('ROK','554'), ('Singapore','555'), ('Turkey','556'), ('UCT','557'), ('US/Alaska','558'), ('US/Aleutian','559'), ('US/Arizona','560'), ('US/Central','561'), ('US/East-Indiana','562'), ('US/Eastern','563'), ('US/Hawaii','564'), ('US/Indiana-Starke','565'), ('US/Michigan','566'), ('US/Mountain','567'), ('US/Pacific','568'), ('US/Pacific-New','569'), ('US/Samoa','570'), ('UTC','571'), ('Universal','572'), ('W-SU','573'), ('WET','574'), ('Zulu','575')
;
COMMIT; 

-- --------------------------------------------------------
-- Structure for 'tab_config'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `tab_config`;
CREATE TABLE `tab_config` (
  `config_empresa` varchar(255) DEFAULT NULL,
  `config_key` varchar(255) DEFAULT NULL,
  `config_idioma` varchar(255) DEFAULT NULL,
  `config_fuso_horario` varchar(255) DEFAULT NULL,
  `config_url` varchar(255) DEFAULT NULL,
  `config_path_instalacao` varchar(255) DEFAULT NULL,
  `config_email_alerta` varchar(255) DEFAULT NULL COMMENT 'email para envio de erros e alertas',
  `config_email_reposta` varchar(255) DEFAULT NULL COMMENT 'email para os clientes',
  `config_smtp_status` int(11) DEFAULT NULL COMMENT '1 =Ativo, 0 = desativado, server para ativar/desativar email para o Administrados sobre a situação do Servidor',
  `config_smtp_host` varchar(255) DEFAULT NULL,
  `config_smtp_port` int(11) DEFAULT NULL,
  `config_smtp_username` varchar(255) DEFAULT NULL,
  `config_smtp_password` varchar(255) DEFAULT NULL,
  `config_path_java` varchar(255) DEFAULT NULL COMMENT 'caminho recurso Java',
  `config_path_rrdtool` varchar(255) DEFAULT NULL,
  `config_path_ffmpeg` varchar(255) DEFAULT NULL,
  `config_versao_wowza` varchar(255) DEFAULT NULL,
  `config_user_admin_wowza` varchar(255) DEFAULT NULL COMMENT 'senha do Admin',
  `config_pass_admin_wowza` varchar(255) NOT NULL,
  `config_rtmp_port` int(11) DEFAULT NULL COMMENT '1935',
  `config_admin_port` int(11) DEFAULT NULL COMMENT '8086 = base',
  `config_path_vod` varchar(255) DEFAULT NULL COMMENT 'path ondemend',
  `config_wowza_key` varchar(255) DEFAULT NULL,
  `config_jwplayer_key` varchar(255) DEFAULT NULL,
  `config_amazon_key` varchar(255) DEFAULT NULL COMMENT 'busca de capa de album',
  `config_lastfm_key` varchar(255) DEFAULT NULL,
  `config_google_analytics_key` varchar(255) DEFAULT NULL,
  `config_google_maps_key` varchar(255) DEFAULT NULL,
  `config_ftp_config` varchar(255) NOT NULL,
  `config_ftp_sufixo` varchar(255) NOT NULL,
  `config_ftp_host` varchar(255) NOT NULL,
  `config_ftp_dominio` varchar(255) NOT NULL,
  `config_ftp_porta` varchar(255) NOT NULL,
  `config_ftp_path` varchar(255) NOT NULL,
  `config_ftp_usuario` varchar(255) NOT NULL,
  `config_ftp_senha` varchar(255) NOT NULL,
  `config_ftp_server_tema` varchar(255) NOT NULL,
  `config_path_wowza` varchar(255) NOT NULL,
  `config_conversor_status` int(11) NOT NULL,
  `config_image_logo` varchar(255) DEFAULT NULL,
  `config_conversor_qtd_video` int(11) DEFAULT NULL,
  `config_conversor_velocidade` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
-- Dump Data for `tab_config`
-- --------------------------------------------------------

BEGIN; 
INSERT INTO `tab_config` VALUES 
('WSEManager','WSE-6a276eb8b9afe67232beab2a6068ee','us','America/Sao_Paulo','http://wsemanager.ciclanohost.com.br','/var/www','suporte@ciclanohost.com.br','comercial@ciclanohost.com.br','1','mx1.hostinger.com.br','2525','correa.marcelo@marcelocorrea.url.ph','Marsc2014','/usr/bin/java','/usr/bin/rrdtoll','/usr/bin/ffmpeg','4','admin','790610','1935','8088','/usr/local/WowzaStreamingEngine/content','EDEV4-fkURB-kJ9DM-dAtfB-hXnvM-EEBKu-4bdhhBCPbzNA','1','2','3','4','5','ProFTPd','#','#','wsemanager.ciclanohost.com.br','21','/var/www','wse3play','ch790610','8','/usr/local/WowzaStreamingEngine','1','1ba01aefa0994420c4f927352e2ef173.png','5','veryslow')
;
COMMIT; 

-- --------------------------------------------------------
-- Structure for 'tab_plano'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `tab_plano`;
CREATE TABLE `tab_plano` (
  `plano_id` int(10) NOT NULL AUTO_INCREMENT,
  `plano_user_id` int(10) NOT NULL COMMENT 'ID do OWNER',
  `plano_nome` varchar(225) NOT NULL,
  `plano_acessos` int(11) NOT NULL,
  `plano_bitrate` int(11) NOT NULL,
  `plano_trafego` int(11) NOT NULL,
  `plano_espaco_disco` int(11) NOT NULL,
  `plano_id_servidor` int(11) NOT NULL,
  `plano_qtd_servidores` int(11) NOT NULL,
  `plano_tipo` varchar(20) NOT NULL COMMENT 'tipo=usuario, revenda, admin,',
  `plano_nivel` varchar(255) NOT NULL,
  `plano_status` int(4) NOT NULL,
  `plano_data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`plano_id`),
  KEY `plano_user_id` (`plano_user_id`),
  CONSTRAINT `tab_plano_ibfk_1` FOREIGN KEY (`plano_user_id`) REFERENCES `tab_usuarios` (`usuarios_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
-- Dump Data for `tab_plano`
-- --------------------------------------------------------

BEGIN; 
INSERT INTO `tab_plano` VALUES 
('1','1','WSEManager','1000','1024','9','10000','1','10','revenda','admin','1','2014-09-04 09:35:03')
;
COMMIT; 

-- --------------------------------------------------------
-- Structure for 'tab_plano_plugins'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `tab_plano_plugins`;
CREATE TABLE `tab_plano_plugins` (
  `pla_plu_id` int(11) NOT NULL AUTO_INCREMENT,
  `pla_plu_plano_id` int(11) NOT NULL,
  `pla_plu_plugin_id` int(11) NOT NULL,
  PRIMARY KEY (`pla_plu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
-- Dump Data for `tab_plano_plugins`
-- --------------------------------------------------------

BEGIN; 
INSERT INTO `tab_plano_plugins` VALUES 
('1','1','1'), ('2','1','2'), ('3','1','3'), ('4','1','4'), ('5','1','6')
;
COMMIT; 

-- --------------------------------------------------------
-- Structure for 'tab_playlist_itens'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `tab_playlist_itens`;
CREATE TABLE `tab_playlist_itens` (
  `item_id` int(9) NOT NULL AUTO_INCREMENT,
  `playlist_id` int(9) NOT NULL,
  `nome_arquivo` varchar(150) NOT NULL,
  `ordem` int(4) NOT NULL,
  PRIMARY KEY (`item_id`),
  KEY `playlist_id` (`playlist_id`),
  CONSTRAINT `tab_playlist_itens_ibfk_1` FOREIGN KEY (`playlist_id`) REFERENCES `tab_playlists` (`playlist_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
-- Structure for 'tab_playlists'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `tab_playlists`;
CREATE TABLE `tab_playlists` (
  `playlist_id` int(10) NOT NULL AUTO_INCREMENT,
  `aplicacao_id` int(7) NOT NULL,
  `playlist_nome` varchar(100) CHARACTER SET latin1 NOT NULL,
  `playlist_inicio` datetime NOT NULL,
  `playlist_fim` datetime DEFAULT NULL,
  `playlist_repetir` enum('yes','no') CHARACTER SET latin1 NOT NULL,
  `playlist_status` enum('yes','no') CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`playlist_id`),
  KEY `aplicacao_id` (`aplicacao_id`),
  CONSTRAINT `tab_playlists_ibfk_1` FOREIGN KEY (`aplicacao_id`) REFERENCES `tab_aplicacoes` (`aplicacoes_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
-- Structure for 'tab_plugin'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `tab_plugin`;
CREATE TABLE `tab_plugin` (
  `plugin_id` int(10) NOT NULL AUTO_INCREMENT,
  `plugin_nome` varchar(50) NOT NULL,
  `plugin_id_servidor` varchar(300) NOT NULL,
  `plugin_data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`plugin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
-- Dump Data for `tab_plugin`
-- --------------------------------------------------------

BEGIN; 
INSERT INTO `tab_plugin` VALUES 
('1','Wowza Live','1','2014-03-25 22:50:56'), ('2','Wowza TV Station','1','2014-03-25 22:51:32'), ('3','Wowza Ondemand','1','2014-03-25 22:51:51'), ('4','Shoutcast Relay','1','2014-05-20 19:01:14'), ('5','Nenhum servidor selecionado','0','2014-03-29 21:01:41'), ('6','Camera IP','1','2014-05-20 19:01:14')
;
COMMIT; 

-- --------------------------------------------------------
-- Structure for 'tab_process'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `tab_process`;
CREATE TABLE `tab_process` (
  `process_id` int(11) NOT NULL AUTO_INCREMENT,
  `process_status` varchar(255) NOT NULL,
  `process_aplicacao_id` int(11) NOT NULL,
  `process_usuario_id` int(11) NOT NULL,
  `process_video_id` int(11) NOT NULL,
  `process_tipo` varchar(255) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `process_nome_arquivo` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `process_nome_arquivo_final` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `process_codec_audio` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `process_frames` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `process_bitrate_video` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `process_hertz_audio` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `process_bitrate_audio` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `process_size_video` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `process_video_inicio` int(11) NOT NULL,
  `process_video_fim` int(11) NOT NULL,
  `process_shell` text,
  `process_data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`process_id`),
  KEY `process_aplicacao_id` (`process_aplicacao_id`),
  KEY `process_usuario_id` (`process_usuario_id`),
  CONSTRAINT `tab_process_ibfk_1` FOREIGN KEY (`process_aplicacao_id`) REFERENCES `tab_aplicacoes` (`aplicacoes_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `tab_process_ibfk_2` FOREIGN KEY (`process_usuario_id`) REFERENCES `tab_usuarios` (`usuarios_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
-- Structure for 'tab_servidor'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `tab_servidor`;
CREATE TABLE `tab_servidor` (
  `servidor_id` int(10) NOT NULL AUTO_INCREMENT,
  `servidor_nome` varchar(50) NOT NULL,
  `servidor_source` varchar(300) NOT NULL,
  `servidor_licenca` varchar(100) NOT NULL,
  `servidor_data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `servidor_cmd_iniciar` varchar(255) NOT NULL,
  `servidor_cmd_reiniciar` varchar(255) NOT NULL,
  `servidor_cmd_parar` varchar(255) NOT NULL,
  `servidor_descricao` text NOT NULL,
  `servidor_imagem` varchar(255) NOT NULL,
  `servidor_status` int(11) DEFAULT '1',
  PRIMARY KEY (`servidor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
-- Dump Data for `tab_servidor`
-- --------------------------------------------------------

BEGIN; 
INSERT INTO `tab_servidor` VALUES 
('1','Wownza Streaming Engine','##','/usr/local/WowzaStreamingEngine/bin/WowzaStreamingEngine status','2014-03-29 20:54:40','/usr/local/WowzaStreamingEngine/bin/WowzaStreamingEngine start','/usr/local/WowzaStreamingEngine/bin/WowzaStreamingEngine restart','/usr/local/WowzaStreamingEngine/bin/WowzaStreamingEngine stop','<p><span style=\"color: rgb(99, 99, 99); font-family: \'Open Sans\', sans-serif; line-height: 18.571430206298828px; background-color: rgb(247, 247, 247);\">Suporta um sensacional streaming Ao Vivo e On-Demand para uma grande gama de dispositivos, incluindo computadores, iPhone&reg;, iPad&reg;, Android&trade; smartphones e tablets, smart TVs, set-top boxes, e muito mais. Al&eacute;m de retransmitir Shoutcast/Icecast.</span></p>
','assets/img/profile/portfolio/wowza.png','1')
;
COMMIT; 

-- --------------------------------------------------------
-- Structure for 'tab_startup_streams'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `tab_startup_streams`;
CREATE TABLE `tab_startup_streams` (
  `ss_aplicacao_id` int(11) NOT NULL,
  `ss_application` varchar(50) NOT NULL,
  `ss_media_caster_type` varchar(50) NOT NULL,
  `ss_stream_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
-- Structure for 'tab_usuarios'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `tab_usuarios`;
CREATE TABLE `tab_usuarios` (
  `usuarios_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id do usuario',
  `usuarios_primeiro_nome` varchar(25) NOT NULL,
  `usuarios_sobrenome` varchar(25) NOT NULL,
  `usuarios_email` varchar(50) NOT NULL,
  `usuarios_senha` varchar(100) NOT NULL,
  `usuarios_nivel` int(11) NOT NULL COMMENT '0- Sem Acesso, 1- Super Admin, 2- Admin , 3 - Revenda , 4 - Usuario',
  `usuarios_plano` int(11) NOT NULL COMMENT 'ID plano do usuario.',
  `usuarios_whmcs_id` int(11) NOT NULL,
  `usuarios_dono_id` int(11) NOT NULL COMMENT 'ID do OWNER',
  `usuarios_obs` text,
  `usuarios_data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarios_status` int(11) NOT NULL DEFAULT '1' COMMENT '0 - Usuário Inativo, 1 - Usuário Ativo',
  `usuarios_token` text NOT NULL,
  `usuarios_logo_revenda` varchar(255) DEFAULT NULL,
  `usuarios_idioma` varchar(2) NOT NULL DEFAULT 'br',
  PRIMARY KEY (`usuarios_id`),
  UNIQUE KEY `usuarios_email` (`usuarios_email`),
  KEY `usuarios_dono_id` (`usuarios_dono_id`),
  CONSTRAINT `tab_usuarios_ibfk_1` FOREIGN KEY (`usuarios_dono_id`) REFERENCES `tab_usuarios` (`usuarios_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
-- Dump Data for `tab_usuarios`
-- --------------------------------------------------------

BEGIN; 
INSERT INTO `tab_usuarios` VALUES 
('1','Ciclano','Host','admin@ciclanohost.com.br','e98809d5fea5baad311cb654724576af34887452','1','0','0','1','','2014-05-31 19:57:45','1','','','br'), ('12','Marcelo','dos Santos Corra','marcelocorrea229@gmail.com','7c485528fb003e30ca0082fb6c5a9c928e1e9f84','4','0','0','1','','2014-09-12 15:16:51','1','','','br')
;
COMMIT; 

-- --------------------------------------------------------
-- Structure for 'wowza_accesslog'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `wowza_accesslog`;
CREATE TABLE `wowza_accesslog` (
  `logid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date` varchar(100) DEFAULT NULL,
  `time` varchar(100) DEFAULT NULL,
  `tz` varchar(100) DEFAULT NULL,
  `xevent` varchar(20) DEFAULT NULL,
  `xcategory` varchar(20) DEFAULT NULL,
  `xseverity` varchar(100) DEFAULT NULL,
  `xstatus` varchar(100) DEFAULT NULL,
  `xctx` varchar(100) DEFAULT NULL,
  `xcomment` varchar(255) DEFAULT NULL,
  `xvhost` varchar(100) DEFAULT NULL,
  `xapp` varchar(100) DEFAULT NULL,
  `xappinst` varchar(100) DEFAULT NULL,
  `xduration` varchar(100) DEFAULT NULL,
  `sip` varchar(100) DEFAULT NULL,
  `sport` varchar(100) DEFAULT NULL,
  `suri` varchar(255) DEFAULT NULL,
  `cip` varchar(100) DEFAULT NULL,
  `cproto` varchar(100) DEFAULT NULL,
  `creferrer` varchar(255) DEFAULT NULL,
  `cuseragent` varchar(100) DEFAULT NULL,
  `cclientid` varchar(25) DEFAULT NULL,
  `csbytes` varchar(20) DEFAULT NULL,
  `scbytes` varchar(20) DEFAULT NULL,
  `xstreamid` varchar(20) DEFAULT NULL,
  `xspos` varchar(20) DEFAULT NULL,
  `csstreambytes` varchar(20) DEFAULT NULL,
  `scstreambytes` varchar(20) DEFAULT NULL,
  `xsname` varchar(100) DEFAULT NULL,
  `xsnamequery` varchar(100) DEFAULT NULL,
  `xfilename` varchar(100) DEFAULT NULL,
  `xfileext` varchar(100) DEFAULT NULL,
  `xfilesize` varchar(100) DEFAULT NULL,
  `xfilelength` varchar(100) DEFAULT NULL,
  `xsuri` varchar(255) DEFAULT NULL,
  `xsuristem` varchar(255) DEFAULT NULL,
  `xsuriquery` varchar(255) DEFAULT NULL,
  `csuristem` varchar(255) DEFAULT NULL,
  `csuriquery` varchar(255) DEFAULT NULL,
  `1` date DEFAULT NULL,
  `2` time DEFAULT NULL,
  PRIMARY KEY (`logid`)
) ENGINE=InnoDB AUTO_INCREMENT=1176 DEFAULT CHARSET=utf8;


SET FOREIGN_KEY_CHECKS = 1;
