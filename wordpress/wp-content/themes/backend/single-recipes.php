<?php get_header(); ?>

<?php if( have_posts() ) : while( have_posts() ): the_post();?>

    <h1><?php the_title();?></h1>

    <img src="<?php the_post_thumbnail_url();?>">
    <p><?php echo get_post_meta(get_the_ID(), 'introtext', TRUE); ?></p>
    <p><?php echo get_post_meta(get_the_ID(), '_recipe_subtitle', TRUE); ?></p>
    <p><?php echo get_post_meta(get_the_ID(), '_recipe_ingredients', TRUE); ?></p>
    <p><?php echo get_the_term_list(get_the_ID(), 'moeilijkheid', 'Difficulty: ', '', '') ?></p>
    <p><?php echo get_the_term_list(get_the_ID(), 'allergenen', 'Alergenen: ', ', ', '') ?></p>
    <p><?php echo get_post_meta(get_the_ID(), 'Samenvatting', TRUE);?></p>
    
    <?php the_content()?>

    <h4>Extra tip: <?php echo get_post_meta(get_the_ID(), 'extra_tips', TRUE);?></h4>
    
<?php endwhile; ?>

<?php else: ?>

<?php endif; ?>
<?php get_sidebar();?>
<?php get_footer(); ?>