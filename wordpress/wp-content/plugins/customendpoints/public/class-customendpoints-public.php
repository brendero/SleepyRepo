<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       brendero.github.io
 * @since      1.0.0
 *
 * @package    Customendpoints
 * @subpackage Customendpoints/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Customendpoints
 * @subpackage Customendpoints/public
 * @author     Brent De Roeck <brendero@student.arteveldehs.be>
 */
class Customendpoints_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Customendpoints_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Customendpoints_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/customendpoints-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Customendpoints_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Customendpoints_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/customendpoints-public.js', array( 'jquery' ), $this->version, false );

	}
	

	function create_sleepy_user( WP_REST_Request $request) {
		$params = $request->get_body_params();
		
		$user_data = array(
			'ID' => '',
			'user_pass' => $params["password"],
			'user_login' => $params["username"],
			'user_nicename' => $params["username"],
			'user_url' => '',
			'user_email' => $params["email"],
			'display_name' => $params["firstname"] . " " . $params["lastname"],
			'nickname' => $params["username"],
			'first_name' => $params["firstname"],
			'last_name' => $params["lastname"],
			'user_registered' => date('Y-m-d H:i:s'),
			'role' => 'subscriber'
			);
		$user_id = wp_insert_user($user_data);
		update_user_meta( $user_id, 'avatar', $params["avatar"]);
		return $user_id;
	}

	function register_route() {
		register_rest_route('wp/v2', 'users/register', array(
			'methods' => 'POST',
			'callback' => array($this, 'create_sleepy_user')
		));
	}

}
