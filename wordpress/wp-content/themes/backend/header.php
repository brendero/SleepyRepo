<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?php bloginfo('name')?></title>
    <?php wp_head(); ?>
</head>
<body <?php echo body_class(); ?>>

<nav class="main-menu">
    <?php 
    wp_nav_menu( array(
        'theme_location' => 'primary-menu',
        '   ' => ''
    ) );
    ?>
</nav>

<main class="main-division">