SET foreign_key_checks = off;
DROP TABLE IF EXISTS `ci_sessions`;
CREATE TABLE `ci_sessions` (
  `session_id`    VARCHAR(40)
                  COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  `ip_address`    VARCHAR(45)
                  COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  `user_agent`    VARCHAR(120)
                  COLLATE utf8_general_ci NOT NULL,
  `last_activity` INT(10) UNSIGNED        NOT NULL DEFAULT '0',
  `user_data`     TEXT
                  COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `last_activity_idx` (`last_activity`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;

-- ----------------------------
--  Table structure for `ftpgroup`
-- ----------------------------
DROP TABLE IF EXISTS `ftpgroup`;
CREATE TABLE `ftpgroup` (
  `groupname` VARCHAR(16)
              COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `gid`       SMALLINT(6)             NOT NULL DEFAULT '5500',
  `members`   VARCHAR(16)
              COLLATE utf8_general_ci NOT NULL DEFAULT '',
  KEY `groupname` (`groupname`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci
  COMMENT = 'ProFTP group table';

-- ----------------------------
--  Table structure for `ftpquotalimits`
-- ----------------------------
DROP TABLE IF EXISTS `ftpquotalimits`;
CREATE TABLE `ftpquotalimits` (
  `name`             VARCHAR(255)                                   DEFAULT NULL,
  `quota_type`       ENUM('user', 'group', 'class', 'all') NOT NULL DEFAULT 'user',
  `per_session`      ENUM('false', 'true')                 NOT NULL DEFAULT 'false',
  `limit_type`       ENUM('soft', 'hard')                  NOT NULL DEFAULT 'hard',
  `bytes_in_avail`   BIGINT(20) UNSIGNED                   NOT NULL DEFAULT '0',
  `bytes_out_avail`  BIGINT(20) UNSIGNED                   NOT NULL DEFAULT '0',
  `bytes_xfer_avail` BIGINT(20) UNSIGNED                   NOT NULL DEFAULT '0',
  `files_in_avail`   INT(10) UNSIGNED                      NOT NULL DEFAULT '0',
  `files_out_avail`  INT(10) UNSIGNED                      NOT NULL DEFAULT '0',
  `files_xfer_avail` INT(10) UNSIGNED                      NOT NULL DEFAULT '0',
  `aplicacao_id`     INT(11)                               NOT NULL
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci
  COMMENT = 'ProFTP quota limits';

-- ----------------------------
--  Table structure for `ftpquotatallies`
-- ----------------------------
DROP TABLE IF EXISTS `ftpquotatallies`;
CREATE TABLE `ftpquotatallies` (
  `name`            VARCHAR(255)
                    COLLATE utf8_general_ci               NOT NULL DEFAULT '',
  `quota_type`      ENUM('user', 'group', 'class', 'all') NOT NULL DEFAULT 'user',
  `bytes_in_used`   BIGINT(20) UNSIGNED                   NOT NULL DEFAULT '0',
  `bytes_out_used`  BIGINT(20) UNSIGNED                   NOT NULL DEFAULT '0',
  `bytes_xfer_used` BIGINT(20) UNSIGNED                   NOT NULL DEFAULT '0',
  `files_in_used`   INT(10) UNSIGNED                      NOT NULL DEFAULT '0',
  `files_out_used`  INT(10) UNSIGNED                      NOT NULL DEFAULT '0',
  `files_xfer_used` INT(10) UNSIGNED                      NOT NULL DEFAULT '0',
  `aplicacao_id`    INT(11)                               NOT NULL
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci
  COMMENT = 'ProFTP quota tallies';

-- ----------------------------
--  Table structure for `ftpuser`
-- ----------------------------
DROP TABLE IF EXISTS `ftpuser`;
CREATE TABLE `ftpuser` (
  `id`           INT(10) UNSIGNED        NOT NULL AUTO_INCREMENT,
  `userid`       VARCHAR(255)
                 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `passwd`       VARCHAR(64)
                 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `uid`          SMALLINT(6)             NOT NULL DEFAULT '2001',
  `gid`          SMALLINT(6)             NOT NULL DEFAULT '2001',
  `homedir`      VARCHAR(255)
                 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `shell`        VARCHAR(16)
                 COLLATE utf8_general_ci NOT NULL DEFAULT '/sbin/nologin',
  `count`        INT(11)                 NOT NULL DEFAULT '0',
  `accessed`     DATETIME                NOT NULL DEFAULT '0000-00-00 00:00:00',
  `modified`     DATETIME                NOT NULL DEFAULT '0000-00-00 00:00:00',
  `email`        VARCHAR(255)
                 COLLATE utf8_general_ci          DEFAULT NULL,
  `aplicacao_id` INT(11)                 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userid` (`userid`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci
  COMMENT = 'ProFTP user table';

-- ----------------------------
--  Table structure for `tab_aplicacoes`
-- ----------------------------
DROP TABLE IF EXISTS `tab_aplicacoes`;
CREATE TABLE `tab_aplicacoes` (
  `aplicacoes_id`                  INT(10)                 NOT NULL AUTO_INCREMENT,
  `aplicacoes_user_id`             INT(10)                 NOT NULL,
  `aplicacoes_plano_id`            INT(10)                 NOT NULL,
  `aplicacoes_acessos`             INT(11)                 NOT NULL,
  `aplicacoes_bitrate`             INT(11)                 NOT NULL,
  `aplicacoes_trafego`             INT(11)                 NOT NULL,
  `aplicacoes_espaco_disco`        INT(11)                 NOT NULL,
  `aplicacoes_id_servidor`         INT(11)                 NOT NULL,
  `aplicacoes_id_plugin`           INT(11)                 NOT NULL,
  `aplicacoes_nivel`               VARCHAR(255)
                                   COLLATE utf8_general_ci NOT NULL,
  `aplicacoes_status`              VARCHAR(100)
                                   COLLATE utf8_general_ci NOT NULL,
  `aplicacoes_data_cadastro`       TIMESTAMP               NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `aplicacoes_nome`                VARCHAR(255)
                                   COLLATE utf8_general_ci NOT NULL,
  `aplicacoes_ftp_usuario`         VARCHAR(255)
                                   COLLATE utf8_general_ci NOT NULL,
  `aplicacoes_ftp_senha`           VARCHAR(255)
                                   COLLATE utf8_general_ci NOT NULL,
  `aplicacoes_senha`               VARCHAR(255)
                                   COLLATE utf8_general_ci NOT NULL,
  `aplicacoes_pendente`            INT(11)                 NOT NULL DEFAULT '0',
  `aplicacoes_shoutcast_host`      VARCHAR(255)
                                   COLLATE utf8_general_ci NOT NULL,
  `aplicacoes_tipo_player`         VARCHAR(255)
                                   COLLATE utf8_general_ci NOT NULL,
  `aplicacoes_convertendo_video`   INT(11)                 NOT NULL,
  `aplicacoes_live_authentication` VARCHAR(5)
                                   COLLATE utf8_general_ci NOT NULL DEFAULT 'true',
  `aplicacoes_estatisticas`        INT(11)                 NOT NULL DEFAULT '1',
  `aplicacoes_hotlinks`            TEXT,
  `aplicacoes_aplicacao_id`        INT(10)                 NOT NULL,
  `aplicacoes_dir_vod`             VARCHAR(255)                     DEFAULT NULL,
  PRIMARY KEY (`aplicacoes_id`),
  KEY `aplicacoes_user_id` (`aplicacoes_user_id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;

-- ----------------------------
--  Table structure for `tab_arquivos_video`
-- ----------------------------
DROP TABLE IF EXISTS `tab_arquivos_video`;
CREATE TABLE `tab_arquivos_video` (
  `video_id`            INT(11)   NOT NULL        AUTO_INCREMENT,
  `video_aplicacao_id`  INT(11)   NOT NULL,
  `video_titulo`        VARCHAR(255)
                        COLLATE utf8_general_ci   DEFAULT NULL,
  `video_video`         VARCHAR(255)
                        COLLATE utf8_general_ci   DEFAULT NULL,
  `video_bitrate`       VARCHAR(255)
                        COLLATE utf8_general_ci   DEFAULT NULL,
  `video_duracao`       VARCHAR(255)
                        COLLATE utf8_general_ci   DEFAULT NULL,
  `video_segundos`      VARCHAR(255)
                        COLLATE utf8_general_ci   DEFAULT NULL,
  `video_nome`          VARCHAR(255)
                        COLLATE utf8_general_ci   DEFAULT NULL,
  `video_thumbnail`     VARCHAR(255)
                        COLLATE utf8_general_ci   DEFAULT NULL,
  `video_dir`           VARCHAR(255)
                        COLLATE utf8_general_ci   DEFAULT NULL,
  `video_categoria`     VARCHAR(255)
                        COLLATE utf8_general_ci   DEFAULT NULL,
  `video_data_cadastro` TIMESTAMP NOT NULL        DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`video_id`),
  KEY `video_aplicacao_id` (`video_aplicacao_id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;

-- ----------------------------
--  Table structure for `tab_aux_bitrate`
-- ----------------------------
DROP TABLE IF EXISTS `tab_aux_bitrate`;
CREATE TABLE `tab_aux_bitrate` (
  `bit_id`        INT(11)                 NOT NULL AUTO_INCREMENT,
  `bit_descricao` VARCHAR(255)
                  COLLATE utf8_general_ci NOT NULL,
  `bit_valor`     INT(11)                 NOT NULL,
  PRIMARY KEY (`bit_id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 9
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;

-- ----------------------------
--  Table structure for `tab_aux_timezone`
-- ----------------------------
DROP TABLE IF EXISTS `tab_aux_timezone`;
CREATE TABLE `tab_aux_timezone` (
  `Name`         CHAR(64)         NOT NULL,
  `Time_zone_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`Name`)
)
  ENGINE = MyISAM
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci
  ROW_FORMAT = FIXED
  COMMENT = 'Time zone names';

-- ----------------------------
--  Table structure for `tab_config`
-- ----------------------------
DROP TABLE IF EXISTS `tab_config`;
CREATE TABLE `tab_config` (
  `config_empresa`              VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL,
  `config_key`                  VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL,
  `config_idioma`               VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL,
  `config_fuso_horario`         VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL,
  `config_url`                  VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL,
  `config_path_instalacao`      VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL,
  `config_email_alerta`         VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL
  COMMENT 'email para envio de erros e alertas',
  `config_email_reposta`        VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL
  COMMENT 'email para os clientes',
  `config_smtp_status`          INT(11)                          DEFAULT NULL
  COMMENT '1 =Ativo, 0 = desativado, server para ativar/desativar email para o Administrados sobre a situação do Servidor',
  `config_smtp_host`            VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL,
  `config_smtp_port`            INT(11)                          DEFAULT NULL,
  `config_smtp_username`        VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL,
  `config_smtp_password`        VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL,
  `config_path_java`            VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL
  COMMENT 'caminho recurso Java',
  `config_path_rrdtool`         VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL,
  `config_path_ffmpeg`          VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL,
  `config_versao_wowza`         VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL,
  `config_user_admin_wowza`     VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL
  COMMENT 'senha do Admin',
  `config_pass_admin_wowza`     VARCHAR(255)
                                COLLATE utf8_general_ci NOT NULL,
  `config_rtmp_port`            INT(11)                          DEFAULT NULL
  COMMENT '1935',
  `config_admin_port`           INT(11)                          DEFAULT NULL
  COMMENT '8086 = base',
  `config_path_vod`             VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL
  COMMENT 'path ondemend',
  `config_wowza_key`            VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL,
  `config_jwplayer_key`         VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL,
  `config_amazon_key`           VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL
  COMMENT 'busca de capa de album',
  `config_lastfm_key`           VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL,
  `config_google_analytics_key` VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL,
  `config_google_maps_key`      VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL,
  `config_ftp_config`           VARCHAR(255)
                                COLLATE utf8_general_ci NOT NULL,
  `config_ftp_sufixo`           VARCHAR(255)
                                COLLATE utf8_general_ci NOT NULL,
  `config_ftp_host`             VARCHAR(255)
                                COLLATE utf8_general_ci NOT NULL,
  `config_ftp_dominio`          VARCHAR(255)
                                COLLATE utf8_general_ci NOT NULL,
  `config_ftp_porta`            VARCHAR(255)
                                COLLATE utf8_general_ci NOT NULL,
  `config_ftp_path`             VARCHAR(255)
                                COLLATE utf8_general_ci NOT NULL,
  `config_ftp_usuario`          VARCHAR(255)
                                COLLATE utf8_general_ci NOT NULL,
  `config_ftp_senha`            VARCHAR(255)
                                COLLATE utf8_general_ci NOT NULL,
  `config_ftp_server_tema`      VARCHAR(255)
                                COLLATE utf8_general_ci NOT NULL,
  `config_path_wowza`           VARCHAR(255)
                                COLLATE utf8_general_ci NOT NULL,
  `config_conversor_status`     INT(11)                 NOT NULL DEFAULT '0',
  `config_image_logo`           VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL,
  `config_conversor_qtd_video`  INT(11)                 NULL,
  `config_conversor_velocidade` VARCHAR(255)
                                COLLATE utf8_general_ci NULL,
  `config_wowza_ip`             VARCHAR(255)
                                COLLATE utf8_general_ci NULL,
  `config_distro`               VARCHAR(255)
                                COLLATE utf8_general_ci          DEFAULT NULL,
  `config_ip_players`           VARCHAR(100)
                                COLLATE utf8_general_ci          DEFAULT NULL,
  `config_notificacao_ftp`      TINYINT(1)              NOT NULL DEFAULT 1
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;

-- ----------------------------
--  Table structure for `tab_plano`
-- ----------------------------
DROP TABLE IF EXISTS `tab_plano`;
CREATE TABLE `tab_plano` (
  `plano_id`             INT(10)                 NOT NULL AUTO_INCREMENT,
  `plano_user_id`        VARCHAR(10)
                         COLLATE utf8_general_ci NOT NULL
  COMMENT 'ID do OWNER',
  `plano_nome`           VARCHAR(225)
                         COLLATE utf8_general_ci NOT NULL,
  `plano_acessos`        INT(11)                 NOT NULL,
  `plano_bitrate`        INT(11)                 NOT NULL,
  `plano_trafego`        INT(11)                 NOT NULL,
  `plano_espaco_disco`   INT(11)                 NOT NULL,
  `plano_id_servidor`    INT(11)                 NOT NULL,
  `plano_qtd_servidores` INT(11)                 NOT NULL,
  `plano_tipo`           VARCHAR(20)
                         COLLATE utf8_general_ci NOT NULL
  COMMENT 'tipo=usuario, revenda, admin,',
  `plano_nivel`          VARCHAR(255)
                         COLLATE utf8_general_ci NOT NULL,
  `plano_status`         INT(4)                  NOT NULL,
  `plano_data_cadastro`  TIMESTAMP               NULL     DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`plano_id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;

-- ----------------------------
--  Table structure for `tab_plano_plugins`
-- ----------------------------
DROP TABLE IF EXISTS `tab_plano_plugins`;
CREATE TABLE `tab_plano_plugins` (
  `pla_plu_id`        INT(11) NOT NULL AUTO_INCREMENT,
  `pla_plu_plano_id`  INT(11) NOT NULL,
  `pla_plu_plugin_id` INT(11) NOT NULL,
  PRIMARY KEY (`pla_plu_id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;

-- ----------------------------
--  Table structure for `tab_playlist_itens`
-- ----------------------------
DROP TABLE IF EXISTS `tab_playlist_itens`;
CREATE TABLE `tab_playlist_itens` (
  `item_id`      INT(9)                  NOT NULL AUTO_INCREMENT,
  `playlist_id`  INT(9)                  NOT NULL,
  `nome_arquivo` VARCHAR(150)
                 COLLATE utf8_general_ci NOT NULL,
  `ordem`        INT(4)                  NOT NULL,
  PRIMARY KEY (`item_id`),
  KEY `playlist_id` (`playlist_id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;

-- ----------------------------
--  Table structure for `tab_playlists`
-- ----------------------------
DROP TABLE IF EXISTS `tab_playlists`;
CREATE TABLE `tab_playlists` (
  `playlist_id`      INT(10)                 NOT NULL AUTO_INCREMENT,
  `aplicacao_id`     INT(7)                  NOT NULL,
  `playlist_nome`    VARCHAR(100)
                     COLLATE utf8_general_ci NOT NULL,
  `playlist_inicio`  DATETIME                NOT NULL,
  `playlist_fim`     DATETIME                         DEFAULT NULL,
  `playlist_repetir` ENUM('yes', 'no')
                     COLLATE utf8_general_ci NOT NULL,
  `playlist_status`  ENUM('yes', 'no')
                     COLLATE utf8_general_ci NOT NULL,
  `playlist_tipo`    TINYINT(1)              NOT NULL DEFAULT 1,
  PRIMARY KEY (`playlist_id`),
  KEY `aplicacao_id` (`aplicacao_id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;

-- ----------------------------
--  Table structure for `tab_plugin`
-- ----------------------------
DROP TABLE IF EXISTS `tab_plugin`;
CREATE TABLE `tab_plugin` (
  `plugin_id`            INT(10)                 NOT NULL AUTO_INCREMENT,
  `plugin_nome`          VARCHAR(50)
                         COLLATE utf8_general_ci NOT NULL,
  `plugin_id_servidor`   VARCHAR(300)
                         COLLATE utf8_general_ci NOT NULL,
  `plugin_data_cadastro` TIMESTAMP               NULL     DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`plugin_id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 6
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;

-- ----------------------------
--  Table structure for `tab_servidor`
-- ----------------------------
DROP TABLE IF EXISTS `tab_servidor`;
CREATE TABLE `tab_servidor` (
  `servidor_id`            INT(10)                 NOT NULL AUTO_INCREMENT,
  `servidor_nome`          VARCHAR(50)
                           COLLATE utf8_general_ci NOT NULL,
  `servidor_source`        VARCHAR(300)
                           COLLATE utf8_general_ci NOT NULL,
  `servidor_licenca`       VARCHAR(100)
                           COLLATE utf8_general_ci NOT NULL,
  `servidor_data_cadastro` TIMESTAMP               NULL     DEFAULT CURRENT_TIMESTAMP,
  `servidor_cmd_iniciar`   VARCHAR(255)
                           COLLATE utf8_general_ci NOT NULL,
  `servidor_cmd_reiniciar` VARCHAR(255)
                           COLLATE utf8_general_ci NOT NULL,
  `servidor_cmd_parar`     VARCHAR(255)
                           COLLATE utf8_general_ci NOT NULL,
  `servidor_descricao`     TEXT                    NOT NULL,
  `servidor_imagem`        VARCHAR(255)
                           COLLATE utf8_general_ci NOT NULL,
  `servidor_status`        INT(11)                          DEFAULT '1',
  PRIMARY KEY (`servidor_id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 2
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;

-- ----------------------------
--  Table structure for `tab_startup_streams`
-- ----------------------------
DROP TABLE IF EXISTS `tab_startup_streams`;
CREATE TABLE `tab_startup_streams` (
  `ss_aplicacao_id`      INT(11)                 NOT NULL,
  `ss_application`       VARCHAR(50)
                         COLLATE utf8_general_ci NOT NULL,
  `ss_media_caster_type` VARCHAR(50)
                         COLLATE utf8_general_ci NOT NULL,
  `ss_stream_name`       VARCHAR(50)
                         COLLATE utf8_general_ci NOT NULL
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;

-- ----------------------------
--  Table structure for `tab_usuarios`
-- ----------------------------
DROP TABLE IF EXISTS `tab_usuarios`;
CREATE TABLE `tab_usuarios` (
  `usuarios_id`            INT(11)                 NOT NULL AUTO_INCREMENT
  COMMENT 'Id do usuario',
  `usuarios_primeiro_nome` VARCHAR(25)
                           COLLATE utf8_general_ci NOT NULL,
  `usuarios_sobrenome`     VARCHAR(25)
                           COLLATE utf8_general_ci NOT NULL,
  `usuarios_email`         VARCHAR(50)
                           COLLATE utf8_general_ci NOT NULL,
  `usuarios_senha`         VARCHAR(100)
                           COLLATE utf8_general_ci NOT NULL,
  `usuarios_nivel`         INT(11)                 NOT NULL
  COMMENT '0- Sem Acesso, 1- Super Admin, 2- Admin , 3 - Revenda , 4 - Usuario',
  `usuarios_plano`         INT(11)                 NOT NULL
  COMMENT 'ID plano do usuario.',
  `usuarios_whmcs_id`      INT(11)                 NOT NULL,
  `usuarios_dono_id`       INT(11)                 NOT NULL
  COMMENT 'ID do OWNER',
  `usuarios_obs`           TEXT,
  `usuarios_data_cadastro` TIMESTAMP               NULL     DEFAULT CURRENT_TIMESTAMP,
  `usuarios_status`        INT(11)                 NOT NULL DEFAULT '1'
  COMMENT '0 - Usuário Inativo, 1 - Usuário Ativo',
  `usuarios_token`         TEXT                    NOT NULL,
  `usuarios_logo_revenda`  VARCHAR(255)
                           COLLATE utf8_general_ci          DEFAULT NULL,
  `usuarios_idioma`        VARCHAR(2)
                           COLLATE utf8_general_ci NOT NULL DEFAULT 'br',
  `usuarios_cname`         VARCHAR(255)
                           COLLATE utf8_general_ci          DEFAULT NULL,
  PRIMARY KEY (`usuarios_id`),
  KEY `usuarios_dono_id` (`usuarios_dono_id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;

-- ----------------------------
--  Table structure for `wowza_accesslog`
-- ----------------------------
DROP TABLE IF EXISTS `wowza_accesslog`;
CREATE TABLE `wowza_accesslog` (
  `logid`         INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `date`          VARCHAR(100)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `time`          VARCHAR(100)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `tz`            VARCHAR(100)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `xevent`        VARCHAR(20)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `xcategory`     VARCHAR(20)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `xseverity`     VARCHAR(100)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `xstatus`       VARCHAR(100)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `xctx`          VARCHAR(100)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `xcomment`      TEXT
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `xvhost`        VARCHAR(100)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `xapp`          VARCHAR(100)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `xappinst`      VARCHAR(100)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `xduration`     VARCHAR(100)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `sip`           VARCHAR(100)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `sport`         VARCHAR(100)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `suri`          VARCHAR(255)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `cip`           VARCHAR(100)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `cproto`        VARCHAR(100)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `creferrer`     VARCHAR(255)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `cuseragent`    VARCHAR(100)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `cclientid`     VARCHAR(25)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `csbytes`       VARCHAR(20)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `scbytes`       VARCHAR(20)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `xstreamid`     VARCHAR(20)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `xspos`         VARCHAR(20)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `csstreambytes` VARCHAR(20)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `scstreambytes` VARCHAR(20)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `xsname`        VARCHAR(100)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `xsnamequery`   VARCHAR(100)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `xfilename`     VARCHAR(100)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `xfileext`      VARCHAR(100)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `xfilesize`     VARCHAR(100)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `xfilelength`   VARCHAR(100)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `xsuri`         VARCHAR(255)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `xsuristem`     VARCHAR(255)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `xsuriquery`    VARCHAR(255)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `csuristem`     VARCHAR(255)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  `csuriquery`    VARCHAR(255)
                  COLLATE utf8_general_ci   DEFAULT NULL,
  PRIMARY KEY (`logid`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;

# DROP TRIGGER IF EXISTS `limpar_log`;
# CREATE TRIGGER `limpar_log` AFTER INSERT ON `wowza_accesslog`
# FOR EACH ROW DELETE FROM `wowza_accesslog` WHERE `xapp` = '-';

DROP TABLE IF EXISTS `tab_process`;
CREATE TABLE `tab_process` (
  `process_id`                 INT(11)                 NOT NULL AUTO_INCREMENT,
  `process_status`             VARCHAR(255)            NOT NULL,
  `process_aplicacao_id`       INT(11)                 NOT NULL,
  `process_usuario_id`         INT(11)                 NOT NULL,
  `process_video_id`           INT(11)                 NOT NULL,
  `process_tipo`               VARCHAR(255)
                               COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `process_nome_arquivo`       VARCHAR(255)
                               COLLATE utf8_general_ci          DEFAULT NULL,
  `process_nome_arquivo_final` VARCHAR(255)
                               COLLATE utf8_general_ci          DEFAULT NULL,
  `process_codec_audio`        VARCHAR(255)
                               COLLATE utf8_general_ci          DEFAULT NULL,
  `process_frames`             VARCHAR(255)
                               COLLATE utf8_general_ci          DEFAULT NULL,
  `process_bitrate_video`      VARCHAR(255)
                               COLLATE utf8_general_ci          DEFAULT NULL,
  `process_hertz_audio`        VARCHAR(255)
                               COLLATE utf8_general_ci          DEFAULT NULL,
  `process_bitrate_audio`      VARCHAR(255)
                               COLLATE utf8_general_ci          DEFAULT NULL,
  `process_size_video`         VARCHAR(255)
                               COLLATE utf8_general_ci          DEFAULT NULL,
  `process_video_inicio`       INT(11)                 NOT NULL,
  `process_video_fim`          INT(11)                 NOT NULL,
  `process_shell`              TEXT,
  `process_data_cadastro`      TIMESTAMP               NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `process_pid`                INT(11)                 NULL,
  `process_user_agent`         VARCHAR(255)
                               COLLATE utf8_general_ci          DEFAULT NULL,
  `process_ip`                 VARCHAR(255)
                               COLLATE utf8_general_ci          DEFAULT NULL,
  PRIMARY KEY (`process_id`),
  KEY `process_aplicacao_id` (`process_aplicacao_id`),
  KEY `process_usuario_id` (`process_usuario_id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;

DROP TABLE IF EXISTS `tab_startpage`;
CREATE TABLE `tab_startpage` (
  `startpage_id`                INT(11)                 NOT NULL AUTO_INCREMENT,
  `startpage_aplicacao_id`      INT(11)                 NOT NULL,
  `startpage_name`              VARCHAR(255)
                                COLLATE utf8_general_ci NOT NULL,
  `startpage_description`       TEXT
                                COLLATE utf8_general_ci NOT NULL,
  `startpage_player_version`    VARCHAR(50)
                                COLLATE utf8_general_ci          DEFAULT NULL,
  `startpage_facebook`          VARCHAR(255)
                                COLLATE utf8_general_ci NOT NULL,
  `startpage_twitter`           VARCHAR(255)
                                COLLATE utf8_general_ci NOT NULL,
  `startpage_google_plus`       VARCHAR(255)
                                COLLATE utf8_general_ci NOT NULL,
  `startpage_date_update`       TIMESTAMP               NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `startpage_status`            TINYINT(4)              NOT NULL,
  `startpage_image`             VARCHAR(255)
                                COLLATE utf8_general_ci NOT NULL,
  `startpage_date_registration` DATETIME                NOT NULL,
  `startpage_playlist`          INT(11)                 NOT NULL,
  PRIMARY KEY (`startpage_id`),
  KEY `startpage_aplicacao_id` (`startpage_aplicacao_id`),
  CONSTRAINT `tab_startpage_ibfk_1` FOREIGN KEY (`startpage_aplicacao_id`) REFERENCES `tab_aplicacoes` (`aplicacoes_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;

-- --------------------------------------------------------
-- Structure for 'tab_aux_recurso_aplicacao'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `tab_aux_recurso_aplicacao`;
CREATE TABLE `tab_aux_recurso_aplicacao` (
  `aplicacao_recurso_id`           INT(11)                 NOT NULL AUTO_INCREMENT,
  `aplicacao_recurso_recurso_id`   INT(11)                 NOT NULL,
  `aplicacao_recurso_plugin_id`    INT(11)                 NOT NULL,
  `aplicacao_recurso_aplicacao_id` INT(11)                 NOT NULL,
  `aplicacao_recurso_status`       VARCHAR(5)
                                   COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`aplicacao_recurso_id`),
  KEY `aplicacao_recurso_recurso_id` (`aplicacao_recurso_recurso_id`),
  KEY `aplicacao_recurso_aplicacao_id` (`aplicacao_recurso_aplicacao_id`),
  KEY `aplicacao_recurso_plugin_id` (`aplicacao_recurso_plugin_id`),
  CONSTRAINT `tab_aux_recurso_aplicacao_ibfk_3` FOREIGN KEY (`aplicacao_recurso_plugin_id`) REFERENCES `tab_plugin` (`plugin_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `tab_aux_recurso_aplicacao_ibfk_1` FOREIGN KEY (`aplicacao_recurso_recurso_id`) REFERENCES `tab_recursos` (`recurso_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `tab_aux_recurso_aplicacao_ibfk_2` FOREIGN KEY (`aplicacao_recurso_aplicacao_id`) REFERENCES `tab_aplicacoes` (`aplicacoes_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;

-- --------------------------------------------------------
-- Structure for 'tab_aux_recurso_plugin'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `tab_aux_recurso_plugin`;
CREATE TABLE `tab_aux_recurso_plugin` (
  `recurso_plugin_id`         INT(11) NOT NULL AUTO_INCREMENT,
  `recurso_plugin_plugin_id`  INT(11) NOT NULL,
  `recurso_plugin_recurso_id` INT(11) NOT NULL,
  `recurso_plugin_status`     INT(1)  NOT NULL DEFAULT '1',
  PRIMARY KEY (`recurso_plugin_id`),
  KEY `recurso_plugin_plugin_id` (`recurso_plugin_plugin_id`),
  KEY `recurso_plugin_recurso_id` (`recurso_plugin_recurso_id`),
  CONSTRAINT `tab_aux_recurso_plugin_ibfk_1` FOREIGN KEY (`recurso_plugin_plugin_id`) REFERENCES `tab_plugin` (`plugin_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `tab_aux_recurso_plugin_ibfk_2` FOREIGN KEY (`recurso_plugin_recurso_id`) REFERENCES `tab_recursos` (`recurso_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;

-- --------------------------------------------------------
-- Structure for 'tab_recursos'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `tab_recursos`;
CREATE TABLE `tab_recursos` (
  `recurso_id`        INT(11)                 NOT NULL AUTO_INCREMENT,
  `recurso_nome`      VARCHAR(255)
                      COLLATE utf8_general_ci NOT NULL,
  `recurso_descricao` TEXT                    NOT NULL,
  `recurso_status`    TINYINT(1)              NOT NULL DEFAULT '0',
  PRIMARY KEY (`recurso_id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;

-- --------------------------------------------------------
-- Structure for 'tab_aux_recurso_plano'
-- --------------------------------------------------------

DROP TABLE IF EXISTS `tab_aux_recurso_plano`;
CREATE TABLE `tab_aux_recurso_plano` (
  `aux_recurso_plano_id`         INT(11) NOT NULL AUTO_INCREMENT,
  `aux_recurso_plano_plano_id`   INT(11) NOT NULL,
  `aux_recurso_plano_recurso_id` INT(11) NOT NULL,
  `aux_recurso_plano_plugin_id`  INT(11) NOT NULL,
  `aux_recurso_plano_pla_plu_id` INT(11) NOT NULL,
  `aux_recurso_plano_status`     INT(1)  NOT NULL DEFAULT '1',
  PRIMARY KEY (`aux_recurso_plano_id`),
  KEY `aux_recurso_plano_plano_id` (`aux_recurso_plano_plano_id`),
  KEY `aux_recurso_plano_recurso_id` (`aux_recurso_plano_recurso_id`),
  KEY `aux_recurso_plano_plugin_id` (`aux_recurso_plano_plugin_id`),
  KEY `aux_recurso_plano_pla_plu_id` (`aux_recurso_plano_pla_plu_id`),
  CONSTRAINT `tab_aux_recurso_plano_ibfk_1` FOREIGN KEY (`aux_recurso_plano_plano_id`) REFERENCES `tab_plano` (`plano_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `tab_aux_recurso_plano_ibfk_2` FOREIGN KEY (`aux_recurso_plano_recurso_id`) REFERENCES `tab_recursos` (`recurso_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `tab_aux_recurso_plano_ibfk_3` FOREIGN KEY (`aux_recurso_plano_plugin_id`) REFERENCES `tab_plugin` (`plugin_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `tab_aux_recurso_plano_ibfk_4` FOREIGN KEY (`aux_recurso_plano_pla_plu_id`) REFERENCES `tab_plano_plugins` (`pla_plu_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;

DROP TABLE IF EXISTS `tab_versao`;
CREATE TABLE `tab_versao` (
  `id`        INT(11)                 NOT NULL AUTO_INCREMENT,
  `versao`    VARCHAR(255)
              COLLATE utf8_general_ci NOT NULL,
  `data`      DATE                    NOT NULL,
  `descricao` VARCHAR(255)
              COLLATE utf8_general_ci NOT NULL,
  `tipo`      VARCHAR(255)
              COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;

CREATE TABLE `tab_integracoes` (
  `id`         INT(11)                 NOT NULL AUTO_INCREMENT,
  `nome`       VARCHAR(255)
               COLLATE utf8_general_ci NOT NULL,
  `image`      VARCHAR(255)
               COLLATE utf8_general_ci NOT NULL,
  `dta_insert` TIMESTAMP               NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `dta_update` TIMESTAMP               NOT NULL DEFAULT '0000-00-00 00:00:00',
  `status`     TINYINT(1)              NOT NULL,
  `descricao`  TEXT,
  `codigo`     TEXT,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COLLATE = utf8_general_ci;

CREATE TABLE `wse_accesslog` (
  `log_id`                     INT(11)                 NOT NULL AUTO_INCREMENT,
  `log_tipo`                   INT(11)                          DEFAULT '0',
  `log_descricao`              TEXT
                               COLLATE utf8_unicode_ci NOT NULL,
  `log_server_remote_addr`     TEXT
                               COLLATE utf8_unicode_ci NOT NULL,
  `log_server_http_user_agent` TEXT
                               COLLATE utf8_unicode_ci NOT NULL,
  `log_server_remote_port`     TEXT
                               COLLATE utf8_unicode_ci NOT NULL,
  `log_user`                   INT(11)                 NOT NULL,
  `log_data`                   TIMESTAMP               NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `log_typ`                    TEXT
                               COLLATE utf8_unicode_ci,
  `log_ua_family`              TEXT
                               COLLATE utf8_unicode_ci,
  `log_ua_name`                TEXT
                               COLLATE utf8_unicode_ci,
  `log_ua_version`             TEXT
                               COLLATE utf8_unicode_ci,
  `log_os_family`              TEXT
                               COLLATE utf8_unicode_ci,
  `log_os_name`                TEXT
                               COLLATE utf8_unicode_ci,
  PRIMARY KEY (`log_id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COLLATE = utf8_unicode_ci;

CREATE TABLE `wz_transcoder_encode` (
  `id`                                  INT(11)      NOT NULL AUTO_INCREMENT,
  `name`                                VARCHAR(255) NOT NULL,
  `stream_name`                         VARCHAR(255) NOT NULL,
  `video_codec`                         VARCHAR(10)  NOT NULL,
  `video_implementation`                VARCHAR(10)  NOT NULL,
  `video_gruid`                         VARCHAR(100) NOT NULL,
  `video_framesize_fitmode`             VARCHAR(20)  NOT NULL,
  `video_framesize_width`               INT(11)      NULL,
  `video_framesize_hegth`               INT(11)      NULL,
  `video_profile`                       VARCHAR(255) NOT NULL,
  `video_bitrate`                       INT(11)      NULL,
  `video_keyframeinterval_followsource` VARCHAR(10)  NOT NULL,
  `video_keyframeinterval_interval`     INT(11)      NOT NULL,
  `audio_codec`                         VARCHAR(10)  NULL,
  `audio_bitrate`                       INT(11)      NULL,
  `usuario_id`                          INT(11)      NOT NULL,
  `date_insert`                         DATETIME     NOT NULL,
  `date_update`                         DATETIME     NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `wz_transcoder_encode` FOREIGN KEY (`usuario_id`) REFERENCES `tab_usuarios` (`usuarios_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COLLATE = utf8_unicode_ci;

INSERT INTO `wz_transcoder_encode` (`id`, `name`, `stream_name`, `video_codec`, `video_implementation`, `video_gruid`, `video_framesize_fitmode`, `video_framesize_width`, `video_framesize_hegth`, `video_profile`, `video_bitrate`, `video_keyframeinterval_followsource`, `video_keyframeinterval_interval`, `audio_codec`, `audio_bitrate`, `usuario_id`, `date_insert`, `date_update`)
VALUES
  (1, "720p", "mp4:${SourceStreamName}_720p", "H.264", "default", "-1", "fit-height", "1280", "720", "main", "1300000",
   "false", "60", "AAC", "96000", "1", NOW(), NOW());
INSERT INTO `wz_transcoder_encode` (`id`, `name`, `stream_name`, `video_codec`, `video_implementation`, `video_gruid`, `video_framesize_fitmode`, `video_framesize_width`, `video_framesize_hegth`, `video_profile`, `video_bitrate`, `video_keyframeinterval_followsource`, `video_keyframeinterval_interval`, `audio_codec`, `audio_bitrate`, `usuario_id`, `date_insert`, `date_update`)
VALUES
  (2, "360p", "mp4:${SourceStreamName}_360p", "H.264", "default", "-1", "fit-height", "640", "360", "main", "850000",
   "false", "60", "AAC", "96000", "1", NOW(), NOW());
INSERT INTO `wz_transcoder_encode` (`id`, `name`, `stream_name`, `video_codec`, `video_implementation`, `video_gruid`, `video_framesize_fitmode`, `video_framesize_width`, `video_framesize_hegth`, `video_profile`, `video_bitrate`, `video_keyframeinterval_followsource`, `video_keyframeinterval_interval`, `audio_codec`, `audio_bitrate`, `usuario_id`, `date_insert`, `date_update`)
VALUES
  (3, "240p", "mp4:${SourceStreamName}_240p", "H.264", "default", "-1", "fit-height", "360", "240", "baseline",
   "350000", "false", "60", "AAC", "96000", "1", NOW(), NOW());
INSERT INTO `wz_transcoder_encode` (`id`, `name`, `stream_name`, `video_codec`, `video_implementation`, `video_gruid`, `video_framesize_fitmode`, `video_framesize_width`, `video_framesize_hegth`, `video_profile`, `video_bitrate`, `video_keyframeinterval_followsource`, `video_keyframeinterval_interval`, `audio_codec`, `audio_bitrate`, `usuario_id`, `date_insert`, `date_update`)
VALUES
  (4, "160p", "mp4:${SourceStreamName}_160p", "H.264", "default", "-1", "fit-height", "284", "160", "baseline",
   "200000", "false", "60", "AAC", "96000", "1", NOW(), NOW());
INSERT INTO `wz_transcoder_encode` (`id`, `name`, `stream_name`, `video_codec`, `video_implementation`, `video_gruid`, `video_framesize_fitmode`, `video_framesize_width`, `video_framesize_hegth`, `video_profile`, `video_bitrate`, `video_keyframeinterval_followsource`, `video_keyframeinterval_interval`, `audio_codec`, `audio_bitrate`, `usuario_id`, `date_insert`, `date_update`)
VALUES
  (5, "h263", "mp4:${SourceStreamName}_h264", "H.263", "default", "-1", "letterbox", "176", "144", "baseline", "150000",
   "false", "60", "AAC", "64000", "1", NOW(), NOW());

CREATE TABLE `wz_transcoder_encode_overlays` (
  `id`                   INT(11)      NOT NULL AUTO_INCREMENT,
  `enable`               VARCHAR(10)  NOT NULL,
  `name`                 VARCHAR(255) NOT NULL,
  `index`                INT(1)       NULL,
  `imagepath`            VARCHAR(255) NOT NULL,
  `checkforupdates`      VARCHAR(10)  NOT NULL,
  `opacity`              INT(100)     NOT NULL,
  `location_x`           INT(11)      NOT NULL,
  `location_y`           INT(11)      NOT NULL,
  `location_heigth`      VARCHAR(50)  NOT NULL,
  `location_align`       VARCHAR(30)  NOT NULL,
  `transcoder_encode_id` INT(11)      NOT NULL,
  `date_insert`          DATETIME     NOT NULL,
  `date_update`          DATETIME     NOT NULL,
  PRIMARY KEY (`id`),
  KEY `transcoder_encode_id` (`transcoder_encode_id`),
  CONSTRAINT `wz_transcoder_encode_overlays` FOREIGN KEY (`transcoder_encode_id`) REFERENCES `tab_usuarios` (`usuarios_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COLLATE = utf8_unicode_ci;

CREATE TABLE `wz_transcoder_smil` (
  `id`             INT(11)      NOT NULL AUTO_INCREMENT,
  `src`            VARCHAR(255) NOT NULL,
  `system_bitrate` INT(11)      NOT NULL,
  `width`          INT(11)      NULL,
  `height`         INT(11)      NULL,
  `audio_bitrate`  INT(11)      NULL,
  `video_bitrate`  INT(11)      NULL,
  `video_codec_id` VARCHAR(255) NULL,
  `audio_codec_id` VARCHAR(255) NULL,
  `aplicacao_id`   INT(11)      NOT NULL,
  `date_insert`    DATETIME     NOT NULL,
  `date_update`    DATETIME     NOT NULL,
  PRIMARY KEY (`id`),
  KEY `aplicacao_id` (`aplicacao_id`),
  CONSTRAINT `wz_transcoder_smil` FOREIGN KEY (`aplicacao_id`) REFERENCES `tab_aplicacoes` (`aplicacoes_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8
  COLLATE = utf8_unicode_ci;

INSERT INTO `tab_recursos` (`recurso_id`, `recurso_nome`, `recurso_descricao`, `recurso_status`)
VALUES
  (1, 'gravacao', '', 1),
  (2, 'transcoder', 'aviso_cobranca_transcoder', 1);

ALTER TABLE `tab_arquivos_video` ADD CONSTRAINT `tab_arquivos_video_ibfk_1` FOREIGN KEY (`video_aplicacao_id`) REFERENCES `tab_aplicacoes` (`aplicacoes_id`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION;
ALTER TABLE `tab_playlist_itens` ADD CONSTRAINT `tab_playlist_itens_ibfk_1` FOREIGN KEY (`playlist_id`) REFERENCES `tab_playlists` (`playlist_id`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION;
ALTER TABLE `tab_playlists` ADD CONSTRAINT `tab_playlists_ibfk_1` FOREIGN KEY (`aplicacao_id`) REFERENCES `tab_aplicacoes` (`aplicacoes_id`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION;
ALTER TABLE `tab_usuarios` ADD CONSTRAINT `tab_usuarios_ibfk_1` FOREIGN KEY (`usuarios_dono_id`) REFERENCES `tab_usuarios` (`usuarios_id`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION;
ALTER TABLE `tab_process` ADD CONSTRAINT `tab_process_ibfk_1` FOREIGN KEY (`process_aplicacao_id`) REFERENCES `tab_aplicacoes` (`aplicacoes_id`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION;
ALTER TABLE `tab_process` ADD CONSTRAINT `tab_process_ibfk_2` FOREIGN KEY (`process_usuario_id`) REFERENCES `tab_usuarios` (`usuarios_id`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION;