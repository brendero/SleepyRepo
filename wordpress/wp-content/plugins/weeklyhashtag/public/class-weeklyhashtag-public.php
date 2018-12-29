<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       brendero.github.io
 * @since      1.0.0
 *
 * @package    Weeklyhashtag
 * @subpackage Weeklyhashtag/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Weeklyhashtag
 * @subpackage Weeklyhashtag/public
 * @author     Brent De Roeck <brendero@student.arteveldehs.be>
 */
class Weeklyhashtag_Public {

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
		 * defined in Weeklyhashtag_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Weeklyhashtag_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/weeklyhashtag-public.css', array(), $this->version, 'all' );

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
		 * defined in Weeklyhashtag_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Weeklyhashtag_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/weeklyhashtag-public.js', array( 'jquery' ), $this->version, false );

	}

	
	function backend_register_weeklyhashtag() {
		$labels = array(
			'name' => __('WeeklyHashtag', 'backend'),
			'singular_name' => __('WeeklyHashtag', 'backend'),
			'add_new' => __('Add New WeeklyHashtag', 'backend'),
			'all_items' => __('All WeeklyHashtag', 'backend'),
			'add_new_items' => __('Add New WeeklyHashtag', 'backend'),
			'edit_item' => __('Edit WeeklyHashtag', 'backend'),
			'new_item' => __('New WeeklyHashtag', 'backend'),
			'view_item' => __('View WeeklyHashtag', 'backend'),
			'search_item' => __('Search WeeklyHashtag', 'backend'),
			'not_found' => __('WeeklyHashtag not found', 'backend'),
			'not_found_in_trash' => __('WeeklyHashtag not found in the trash', 'backend'),
			'parent_item_colon' => __('Parent WeeklyHashtag', 'backend'),
		);
		$args = array(
			'labels' => $labels,
			'public' => true,
			'exclude_from_search' => false,
			'has_archive' => true,
			'publicly_queryable' => true,
			'query_var' => true,
			'rewrite' => array('slug' => 'weeklyhashtag'),
			'capability_type' => 'post',
			'hierarchical' => false,
			'supports' => array(
				'editor',
				'thumbnail',
				'comments',
				'author'
			),
			'taxonomies' => array(
				'category'
			),
			'menu_position' => 5,
			'exclude_from_search' => false,
			'menu_icon' => 'dashicons-format-video',
			'show_in_rest' => true,
			'rest_base' => 'weeklyhashtag'
		);		
		register_post_type('weeklyhashtag', $args);
	}
}