<?php
    /*
    template name: homepage
    */
?>

<?php get_header(); ?>

    <?php $mycustomquery = new WP_Query( array('category_name'=>'algemeen','posts_per_page'=>2,'order'=>'DESC','orderby'=>'ID'))?>
    <?php if($mycustomquery->have_posts()) : while($mycustomquery->have_posts()) : $mycustomquery->the_post() ?>
        <h1><?php the_title()?></h1>

        <?php the_post_thumbnail(); ?>
        <?php the_content(); ?>

    <?php endwhile;?>

    <?php else:?>

    <?php endif;?>

  <?php $mycustomquery2 = new WP_Query( array('category_name' => 'weetjes', 'posts_per_page' =>2))?>
    <?php if($mycustomquery2->have_posts()): while($mycustomquery2->have_posts()): $mycustomquery2->the_post() ?>

        <h1><?php the_title();?></h1>
        <?php the_content() ?>

    <?php endwhile;?>
    
    <?php else:?>
    <?php endif;?>
    
    <?php get_sidebar();?>

<?php get_footer(); ?>