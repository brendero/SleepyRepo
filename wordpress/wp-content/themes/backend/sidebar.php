<div class="sidebar">
    <h1>sidebar-menu</h1>
    <?php if( is_active_sidebar('sidebar-primary')): ?>

    <?php dynamic_sidebar('sidebar-primary') ?>

    <?php endif;?>
</div>
