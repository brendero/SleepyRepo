<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       brendero.github.io
 * @since      1.0.0
 *
 * @package    Weeklyhashtag
 * @subpackage Weeklyhashtag/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Weeklyhashtag
 * @subpackage Weeklyhashtag/includes
 * @author     Brent De Roeck <brendero@student.arteveldehs.be>
 */
class Weeklyhashtag_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'weeklyhashtag',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
