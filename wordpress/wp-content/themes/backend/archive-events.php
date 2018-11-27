<?php
    /*
    template name: Event overzicht
    */
?>

<?php get_header(); ?>
    <?php $locationsArray = array(); ?>
    <div id="map" style="height:500px; width: 80%;"></div>
    <?php $mycustomquery = new WP_Query( array('post_type'=>'events','post_status'=>'publish'))?>
    <?php if($mycustomquery->have_posts()) : while($mycustomquery->have_posts()) : $mycustomquery->the_post() ?>
        <?php $location = get_post_meta(get_the_ID(), 'location', TRUE);?>
        <p> <?php $locationsArray[get_post_permalink()] = $location["lat"] . "," .$location["lng"]?> </p>     

    <?php endwhile;?>

    <?php else:?>

    <?php endif;?> 
    <?php get_sidebar();?>    
    
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"></script>
    <script type="text/javascript">
    const locations = <?php echo json_encode($locationsArray); ?>;
    const map = L.map('map', {
        center: [51.0852851, 3.6637481999999864],
        zoom: 13
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    
    for(var key in locations) {
        const res = locations[key].split(",");
        L.marker([parseFloat(res[0]),parseFloat(res[1])]).addTo(map)
        .on("click", function() {
            window.location = key;
        });
    }
    


    </script>
<?php get_footer(); ?>