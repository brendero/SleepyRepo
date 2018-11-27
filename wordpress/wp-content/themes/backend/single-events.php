<?php get_header(); ?>

<?php if( have_posts() ) : while( have_posts() ): the_post();?>

    <h1><?php the_title();?></h1>
    <p><?php echo get_post_meta(get_the_ID(), 'date', TRUE); ?></p>
    <?php $payment_options = get_post_meta(get_the_ID(), 'payment_options', TRUE); ?>
    <p>Payment options</p>
    <ul>
        <?php
            foreach($payment_options as $value){
                echo '<li>'. $value . '</li>';
            }
            
        ?>
    </ul>
    <?php $location = get_post_meta(get_the_ID(), 'location', TRUE); ?>
    <?php the_content()?>

    <div id="leafletmap" style="height:500px; width: 80%;"></div>

<?php endwhile; ?>

<?php else: ?>

<?php endif; ?>
<?php get_sidebar(); ?>


<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"></script>
    <script type="text/javascript">
    const coordinates= <?php echo json_encode($location); ?>;
    
    const map = L.map('leafletmap', {
        center: [parseFloat(coordinates["lat"]),parseFloat(coordinates["lng"])],
        zoom: 13
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
        L.marker([parseFloat(coordinates["lat"]),parseFloat(coordinates["lng"])]).addTo(map)
        .bindPopup(coordinates["address"])
        .openPopup();

    </script>
<?php get_footer(); ?>