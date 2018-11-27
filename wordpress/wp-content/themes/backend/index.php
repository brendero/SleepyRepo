<?php get_header(); ?>

<?php if( have_posts() ) : while( have_posts() ): the_post();?>

    <h1><?php the_title()?></h1>

    <?php the_post_thumbnail(); ?>

    <div>
        <?php the_content(); ?>
    </div>

<?php endwhile; ?>
<?php else : ?>

<?php endif;?>
<?php wp_reset_postdata(); ?>

<?php get_sidebar(); ?>

<?php get_footer(); ?>

