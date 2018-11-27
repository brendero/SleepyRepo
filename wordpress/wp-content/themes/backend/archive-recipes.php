<?php
    /*
    template name: Recipes overzicht
    */
?>

<?php get_header(); ?>
    <div class="container">
    <div class="row">

        <?php $mycustomquery = new WP_Query( array('post_type'=>'recipes','post_status'=>'publish'))?>
        <?php if($mycustomquery->have_posts()) : while($mycustomquery->have_posts()) : $mycustomquery->the_post() ?>
        <div class="col-sm-3 recipe-wrapper">
                
            <?php echo '<a href="'.get_post_permalink() .'"">' ?>
                <img src="<?php the_post_thumbnail_url();?>" style="width: 100%;">    
                <p>
                    <?php the_title(); ?>
                </p>
            </a>
                    
                <p><?php echo get_post_meta(get_the_ID(), 'introtext', TRUE); ?></p>
                <p><?php echo get_post_meta(get_the_ID(), '_recipe_subtitle', TRUE); ?></p>
                <p><?php echo get_the_term_list(get_the_ID(), 'moeilijkheid', 'Difficulty: ', '', '') ?></p>

                
            </a>
        </div>
        
        <?php endwhile;?>
        
        <?php else:?>
        
        <?php endif;?>
    </div>
    </div>
    <?php get_sidebar();?>

<?php get_footer(); ?>