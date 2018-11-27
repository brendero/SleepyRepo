<?php
    /*
    template name: Tweets overzicht
    */
?>

<?php get_header(); ?>

    <?php $mycustomquery = new WP_Query( array('post_type'=>'tweets','post_status'=>'publish'))?>
    <?php if($mycustomquery->have_posts()) : while($mycustomquery->have_posts()) : $mycustomquery->the_post() ?>
        <div class="Tweets-wrapper">
        <?php echo '<a href="'.get_post_permalink() .'"">' ?>
                <img src="<?php the_post_thumbnail_url();?>" style="width: 100%;">    
                <h1>
                    <?php the_title(); ?>
                </h1>
            </a>
                                    
                <?php the_content(); ?>
                <a target="_blank" href="<?php echo get_post_meta(get_the_ID(), 'tweet_url', TRUE); ?>">Original tweet</a></p>

            </a>
        </div>

    <?php endwhile;?>

    <?php else:?>

    <?php endif;?>
    
    <?php get_sidebar();?>

<?php get_footer(); ?>