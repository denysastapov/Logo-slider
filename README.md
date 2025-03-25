# Logo Slider for WordPress (Gutenberg Block Without a Plugin)

![logo slider back](https://github.com/user-attachments/assets/1c72a489-2546-4746-b10b-9d863bef8687)

![logo slider front](https://github.com/user-attachments/assets/318b3a95-55ae-43e3-828a-176b25f363a3)


## Project Overview
This project is a custom Gutenberg block for WordPress that displays a responsive logo slider using [Swiper](https://swiperjs.com/) and React. The slider supports clickable links for each logo and uses a separate CSS file for styling, allowing you to easily customize the design.

## Key Features
- **Swiper** – Can be included via external files or as local assets (as shown in this project).
- **Clickable Links** – Each logo can link to a specified URL.
- **Ease of Use** – Simple setup, plus a Gutenberg native block (no plugin required).
- **Customizable Styles** – Includes a separate CSS file so you can define your own design and layout.

## Usage
1. **Download/Clone** this repository and place it in your theme folder under `blocks/logo-slider`.
2. Make sure you have Swiper JS included—either via external CDNs or by the local files bundled in this project.
3. Edit the included CSS file to apply custom styling to the slider and logos.
4. In the WordPress admin, add the “Logo Slider” block in the Gutenberg editor. Each logo can have a link that takes users to an external or internal page.

## Installation
1. Place the `logo-slider` folder (from this repository) into your theme’s `blocks` folder.  
   **Example path:**  
wp-content/themes/your-theme/blocks/logo-slider

2. Add the following code to your theme’s `functions.php`:
```php
require_once get_stylesheet_directory() . '/blocks/logo-slider/render.php';

function logo_slider_register_dynamic_blocks() {
  register_block_type(
    get_stylesheet_directory() . '/blocks/logo-slider',
    array(
      'render_callback' => 'render_logo_slider_block',
    )
  );
}
add_action('init', 'logo_slider_register_dynamic_blocks');
php```
3. That’s it! You can now use the Logo Slider block in your Gutenberg editor without installing any additional plugins.

## License
This project is licensed under the MIT License: Copyright <2025>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so.
