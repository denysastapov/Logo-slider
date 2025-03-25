<?php
if (! function_exists('render_logo_slider_block')) {
  function render_logo_slider_block($attributes)
  {
    $slidesPerView = isset($attributes['slidesPerView']) ? intval($attributes['slidesPerView']) : 4;
    $gap           = isset($attributes['gap']) ? intval($attributes['gap']) : 20;
    $sliderSpeed   = isset($attributes['sliderSpeed']) ? intval($attributes['sliderSpeed']) : 5000;
    $autoplay      = (isset($attributes['autoplay']) && $attributes['autoplay']) ? 'true' : 'false';
    ob_start();
?>
    <div class="logo-slider-wrapper">
      <div class="logo-slider-container">
        <div class="swiper-container"
          data-slides-per-view="<?php echo $slidesPerView; ?>"
          data-gap="<?php echo $gap; ?>"
          data-slider-speed="<?php echo $sliderSpeed; ?>"
          data-autoplay="<?php echo $autoplay; ?>">
          <div class="swiper-wrapper">
            <?php if (! empty($attributes['items']) && is_array($attributes['items'])) : ?>
              <?php foreach ($attributes['items'] as $item) :
                $img_url = isset($item['url']) ? esc_url($item['url']) : '';
                $link    = isset($item['link']) ? esc_url($item['link']) : '#';
              ?>
                <div class="swiper-slide">
                  <?php if ($img_url) : ?>
                    <a href="<?php echo $link; ?>">
                      <img src="<?php echo $img_url; ?>" alt="">
                    </a>
                  <?php endif; ?>
                </div>
              <?php endforeach; ?>
            <?php else : ?>
              <p>No logos added yet.</p>
            <?php endif; ?>
          </div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
<?php
    wp_enqueue_style('swiper-css', 'https://unpkg.com/swiper/swiper-bundle.min.css', array(), '6.8.4');
    wp_enqueue_script('swiper-js', 'https://unpkg.com/swiper/swiper-bundle.min.js', array(), '6.8.4', true);
    wp_enqueue_script('logo-slider-init', get_stylesheet_directory_uri() . '/blocks/logo-slider/build/sliderInit.bundle.js', array('swiper-js'), '1.0', true);

    return ob_get_clean();
  }
}
