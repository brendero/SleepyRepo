<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'sleepy_backend');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'secret');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '6-RDkjU|LvU4E<iN)u)Qdz$zsCYH`~kqGP4-.NF~jJ^{J7rPsi&)G,p~=*5|Ez_H');
define('SECURE_AUTH_KEY',  'FJ!xCpmvBfo5%~GtT,e`oS-MLt85S61V>(GD;F*ULXv*UqD}~Ow=mIxy[/k<Zyw7');
define('LOGGED_IN_KEY',    '1V_$O[#~v0WZ,cGk_3u{Tj$H[_1(C+t[H>,[Q.h`Q<yVExn71JD|#RL e%$?u#GY');
define('NONCE_KEY',        'wIkN>,_(r${[8_+btm+HL?Vi_|PO1Q^6zI%dqGLwo@`NBm !R/WxjJ#K^:rW3nn ');
define('AUTH_SALT',        'e3NZu~a2h{I$EK-MY^-L-9-vFw;HdwH*?Z ]-Cr:`/*1wM+I)1xxB7A)oJMv+d@d');
define('SECURE_AUTH_SALT', '&}Y2Eaqryl8*Iu1q=NzbP[uvG%)|Y=V)Q5|mjmiUGFkAAZ%60Z>n;CvViEtw3nF8');
define('LOGGED_IN_SALT',   'VT|-)<IElL5tHD0pf<<S{D^#h:DdAN4N/xiGP7@a#?*|>4qdxINLCamLUuCwoY$>');
define('NONCE_SALT',       '[Kf1<`I9zqvm0fNZE[ 1|p&h.y1B)irryF,GGtz@zecN1!hqD(bgfVKkY=WN^o9o');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'sleepy_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);
/*
* API stuff
*/
define('JWT_AUTH_SECRET_KEY', 'jv-4@bO?=BER+~yA<|1]y/cWb5APU-~[BG=yP+0QgQmgC$XS$~(P(*f~Vz>Y}8#l');
define('JWT_AUTH_CORS_ENABLE', true);


/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

