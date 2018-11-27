<?php
/*
Plugin Name: Sleepy Backend
description: A plugin to enable the custom post types and rest endpoints for sleepy
Version: 1.0
Author: Brent De Roeck
*/

//Fixing CORS Issues
add_action( 'rest_pre_serve_request', function() {
    header( 'Access-Control-Allow-Headers: Content-Disposition, Authorization, Content-Type' );
    header( 'Access-Control-Allow-Origin: *' );
});

function backend_register_wokeuplikethis() {
    $labels = array(
        'name' => __('wokeuplikethis', 'backend'),
        'singular_name' => __('WokeUpLikeThis', 'backend'),
        'add_new' => __('Add New WokeUpLikeThis', 'backend'),
        'all_items' => __('All wokeuplikethis', 'backend'),
        'add_new_items' => __('Add New WokeUpLikeThis', 'backend'),
        'edit_item' => __('Edit WokeUpLikeThis', 'backend'),
        'new_item' => __('New WokeUpLikeThis', 'backend'),
        'view_item' => __('View WokeUpLikeThis', 'backend'),
        'search_item' => __('Search WokeUpLikeThis', 'backend'),
        'not_found' => __('WokeUpLikeThis not found', 'backend'),
        'not_found_in_trash' => __('WokeUpLikeThis not found in the trash', 'backend'),
        'parent_item_colon' => __('Parent WokeUpLikeThis', 'backend'),

    );
    $args = array(
        'labels' => $labels,
        'public' => true,
        'has_archive' => true,
        'publicly_queryable' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'wokeuplikethis'),
        'capability_type' => 'post',
        'hierarchical' => false,
        'supports' => array(
            'editor',
            'thumbnail',
            'comments',
            'author'
        ),
        'menu_position' => 5,
        'exclude_from_search' => false,
        'menu_icon' => 'dashicons-format-video',
        'show_in_rest' => true,
        'rest_base' => 'wokeuplikethis'
    );

    register_post_type('wokeuplikethis', $args);
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

/**
 * Register Metas
 * */
register_meta('user', 'avatar', [
    'type' => 'string',
    'single' => true,
    'show_in_rest' => true,
]);
register_meta('user', 'slaapdoel', [
    'type' => 'number',
    'single' => true,
    'show_in_rest' => true,
]);

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

/*register custom endpoint*/
add_action( 'rest_api_init', function () {
	register_rest_route('wp/v2', 'users/register', array(
		'methods' => 'POST',
		'callback' => 'create_sleepy_user'
    ));
} );

add_action('init', 'backend_register_wokeuplikethis');
add_action('init', 'backend_register_tools');
?>