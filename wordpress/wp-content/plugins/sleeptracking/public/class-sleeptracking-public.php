<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       brendero.github.io
 * @since      1.0.0
 *
 * @package    Sleeptracking
 * @subpackage Sleeptracking/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Sleeptracking
 * @subpackage Sleeptracking/public
 * @author     Brent De Roeck <brendero@student.arteveldehs.be>
 */
class Sleeptracking_Public {

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
		 * defined in Sleeptracking_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Sleeptracking_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/sleeptracking-public.css', array(), $this->version, 'all' );

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
		 * defined in Sleeptracking_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Sleeptracking_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/sleeptracking-public.js', array( 'jquery' ), $this->version, false );

	}

	function backend_register_sleeptracking() {
		$labels = array(
			'name' => __('Sleep Tracking', 'backend'),
			'singular_name' => __('Sleep tracking', 'backend'),
			'add_new' => __('Add New Sleep Tracking', 'backend'),
			'all_items' => __('All Sleep Trackings', 'backend'),
			'add_new_items' => __('Add New Sleep Tracking', 'backend'),
			'edit_item' => __('Edit Sleep Tracking', 'backend'),
			'new_item' => __('New Sleep Tracking', 'backend'),
			'view_item' => __('View Sleep Tracking', 'backend'),
			'search_item' => __('Search Sleep Tracking', 'backend'),
			'not_found' => __('Sleep Tracking not found', 'backend'),
			'not_found_in_trash' => __('Sleep Tracking not found in the trash', 'backend'),
			'parent_item_colon' => __('Parent Sleep Tracking', 'backend'),
		);
		$args = array(
			'labels' => $labels,
			'public' => true,
			'has_archive' => true,
			'publicly_queryable' => true,
			'query_var' => true,
			'rewrite' => array('slug' => 'sleeptracking'),
			'capability_type' => 'post',
			'hierarchical' => false,
			'supports' => array(
				'author'
			),
			'menu_position' => 6,
			'exclude_from_search' => false,
			'menu_icon' => 'dashicons-backup',
			'show_in_rest' => true,
			'rest_base' => 'sleeptracking'
		);		
		register_post_type('sleeptracking', $args);
	}

	function meta_query() {
		register_rest_route('wp/v2', '/sleeptracking/datequery', array(
			'methods' => 'GET',
			'callback' => array($this, 'custom_date_query')
		));
	}

	function custom_date_query() {
		if (isset($_GET['startdate']) && isset($_GET['enddate'])) {
			$startDate = $_GET['startdate'];
			$endDate = $_GET['enddate'];
			$args = array(
				'post_type' => 'sleeptracking',
				'relation' => 'AND',
				'meta_query' => array(
					array(
						'key' => 'sleep_date',
						'value' => array($startDate, $endDate),
						'compare' => 'BETWEEN',
						'type' => 'DATE'
					),
				),
			);
			$meta_query = new WP_query($args);
			if($meta_query->have_posts()) {
				$data = array();
				$meta_keys = array('sleep_date','end_date', 'sleep_hour', 'wake_hour');
				
				while($meta_query->have_posts()) {
					$meta_query->the_post();
					$post = get_post();
					foreach($meta_keys as $meta) {
						$post->$meta = get_post_meta(get_post()->ID, $meta);
					}
					$data[] = $post;
				}
				return $data;
			}
			else {
				return 'no posts';
			}
		}
	}

}
