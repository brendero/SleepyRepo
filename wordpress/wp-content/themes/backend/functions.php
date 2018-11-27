<?php
function register_menu_locations() {
    register_nav_menus(
      array(
        'primary-menu' => __( 'Primary Menu' ),
        'footer-menu' => __( 'Footer Menu' ),
      )
    );
}

function backend_enqueue_scripts() {
    wp_enqueue_style('style', get_stylesheet_uri());
    wp_enqueue_style( 'main', get_template_directory_uri() . '/css/main.css', array(), '1.1', 'all');
    wp_enqueue_style( 'bootstrap', get_template_directory_uri() . '/css/bootstrap.css', array(), '1.1', 'all');
    wp_enqueue_script('script' , get_template_directory_uri() . '/js/main.js',array(), '1.1',true); 
}

add_theme_support('post-thumbnails');

add_action('wp_enqueue_scripts', 'backend_enqueue_scripts');

add_action( 'init', 'register_menu_locations' );
?>