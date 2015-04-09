-- Wse SQL Dump
-- Server version: 5.5.38-0ubuntu0.12.04.1
-- Generated: 2014-09-15 04:24:37
-- Current PHP version: 5.5.15-1+deb.sury.org~precise+1
-- Host: localhost
-- Database: wsemanag

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

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


SET FOREIGN_KEY_CHECKS = 1;
