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
/**
 * Show all users in API
 * */
class UserFields {

    function __construct() {
     add_filter('rest_user_query', [$this, 'show_all_users']);
    }
   
   function show_all_users($prepared_args) {
       unset($prepared_args['has_published_posts']);

       return $prepared_args;
     }
   }

new UserFields();


// Enable the option edit in rest
add_filter( 'acf/rest_api/field_settings/edit_in_rest', '__return_true' );

?>