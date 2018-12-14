<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       brendero.github.io
 * @since      1.0.0
 *
 * @package    Tools
 * @subpackage Tools/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Tools
 * @subpackage Tools/public
 * @author     Brent De Roeck <brendero@student.arteveldehs.be>
 */
class Tools_Public {

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
		 * defined in Tools_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Tools_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/tools-public.css', array(), $this->version, 'all' );

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
		 * defined in Tools_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Tools_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/tools-public.js', array( 'jquery' ), $this->version, false );

	}
	
	function backend_register_tools() {
		$labels = array(
			'name' => __('Tools', 'backend'),
			'singular_name' => __('Tool', 'backend'),
			'add_new' => __('Add New Tool', 'backend'),
			'all_items' => __('All Tools', 'backend'),
			'add_new_items' => __('Add New Tool', 'backend'),
			'edit_item' => __('Edit Tool', 'backend'),
			'new_item' => __('New Tool', 'backend'),
			'view_item' => __('View Tool', 'backend'),
			'search_item' => __('Search Tool', 'backend'),
			'not_found' => __('Tool not found', 'backend'),
			'not_found_in_trash' => __('Tool not found in the trash', 'backend'),
			'parent_item_colon' => __('Parent Tool', 'backend'),

		);
		$args = array(
			'labels' => $labels,
			'public' => true,
			'has_archive' => true,
			'publicly_queryable' => true,
			'query_var' => true,
			'capability_type' => 'post',
			'hierarchical' => false,
			'supports' => array(
				'title',
				'editor',
				'thumbnail'
			),
			'menu_position' => 6,
			'exclude_from_search' => false,
			'menu_icon' => 'dashicons-admin-appearance',
			'show_in_rest' => true,
			'rest_base' => 'rest_tools'
		);
    register_post_type('tools', $args);
	}


}
