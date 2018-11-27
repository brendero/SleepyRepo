<?php get_header(); ?>

<?php if( have_posts() ) : while( have_posts() ): the_post();?>

    <h1><?php the_title();?></h1>
    <a target="_blank" href="<?php echo get_post_meta(get_the_ID(), 'tweet_url', TRUE); ?>">Original tweet</a></p>

    <?php the_content()?>
    
<?php endwhile; ?>

<?php else: ?>

<?php endif; ?>

<?php get_footer(); ?>