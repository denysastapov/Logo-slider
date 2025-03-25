import { __ } from "@wordpress/i18n";
import { Fragment, useEffect, useRef } from "@wordpress/element";
import {
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  useBlockProps,
} from "@wordpress/block-editor";
import {
  Button,
  PanelBody,
  RangeControl,
  ToggleControl,
  TextControl,
} from "@wordpress/components";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

const { registerBlockType } = wp.blocks;

registerBlockType("custom/logo-slider", {
  title: __("Logo Slider", "text-domain"),
  icon: "images-alt2",
  category: "common",
  attributes: {
    items: {
      type: "array",
      default: [],
    },
    slidesPerView: {
      type: "number",
      default: 4,
    },
    sliderSpeed: {
      type: "number",
      default: 5000,
    },
    gap: {
      type: "number",
      default: 20,
    },
    autoplay: {
      type: "boolean",
      default: true,
    },
  },
  edit: (props) => {
    const { attributes, setAttributes } = props;
    const { items, slidesPerView, sliderSpeed, gap, autoplay } = attributes;
    const sliderRef = useRef(null);

    const blockProps = useBlockProps({
      className: "logo-slider-editor",
    });

    useEffect(() => {
      if (sliderRef.current) {
        if (sliderRef.current.swiper) {
          sliderRef.current.swiper.destroy(true, true);
        }
        new Swiper(sliderRef.current, {
          slidesPerView: slidesPerView,
          spaceBetween: gap,
          loop: true,
          autoplay: autoplay
            ? {
                delay: sliderSpeed,
              }
            : false,
          navigation: {
            nextEl: sliderRef.current.querySelector(".swiper-button-next"),
            prevEl: sliderRef.current.querySelector(".swiper-button-prev"),
          },
          pagination: {
            el: sliderRef.current.querySelector(".swiper-pagination"),
            clickable: true,
          },
        });
      }
    }, [items, slidesPerView, sliderSpeed, gap, autoplay]);

    const onSelectImages = (selectedImages) => {
      const newItems = selectedImages.map((img) => ({
        id: img.id,
        url: img.url,
        link: "",
      }));
      setAttributes({ items: newItems });
    };

    const updateItemLink = (index, newLink) => {
      const newItems = items.map((item, i) =>
        i === index ? { ...item, link: newLink } : item
      );
      setAttributes({ items: newItems });
    };

    const removeItem = (index) => {
      const newItems = [...items];
      newItems.splice(index, 1);
      setAttributes({ items: newItems });
    };

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody
            title={__("Slider Settings", "text-domain")}
            initialOpen={true}
          >
            <RangeControl
              label={__("Slides Per View", "text-domain")}
              value={slidesPerView}
              onChange={(value) => setAttributes({ slidesPerView: value })}
              min={1}
              max={5}
            />
            <ToggleControl
              label={__("Enable Autoplay", "text-domain")}
              checked={autoplay}
              onChange={(value) => setAttributes({ autoplay: value })}
            />
          </PanelBody>
          <PanelBody
            title={__("Advanced Settings", "text-domain")}
            initialOpen={false}
          >
            <RangeControl
              label={__("Slide Speed (ms)", "text-domain")}
              value={sliderSpeed}
              onChange={(value) => setAttributes({ sliderSpeed: value })}
              min={500}
              max={10000}
              step={100}
            />
            <RangeControl
              label={__("Gap between slides (px)", "text-domain")}
              value={gap}
              onChange={(value) => setAttributes({ gap: value })}
              min={0}
              max={50}
            />
          </PanelBody>
          <PanelBody
            title={__("Logo Links", "text-domain")}
            initialOpen={false}
          >
            {items.length > 0 ? (
              items.map((item, index) => (
                <div key={index} className="logo-slider-link-item">
                  <div className="logo-slider-link-thumb">
                    <img src={item.url} alt="Logo thumbnail" />
                  </div>
                  <TextControl
                    label={__("Link URL", "text-domain")}
                    value={item.link}
                    onChange={(value) => updateItemLink(index, value)}
                  />
                  <Button isDestructive onClick={() => removeItem(index)}>
                    {__("Remove", "text-domain")}
                  </Button>
                </div>
              ))
            ) : (
              <p>{__("No logos added.", "text-domain")}</p>
            )}
          </PanelBody>
        </InspectorControls>
        <div {...blockProps}>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={onSelectImages}
              allowedTypes={["image"]}
              multiple
              gallery
              value={items.map((item) => item.id)}
              render={({ open }) => (
                <Button onClick={open} isSecondary>
                  {__("Add Logos", "text-domain")}
                </Button>
              )}
            />
          </MediaUploadCheck>
          {items.length > 0 ? (
            <div className="logo-slider-preview">
              <div className="swiper-container" ref={sliderRef}>
                <div className="swiper-wrapper">
                  {items.map((item, index) => (
                    <div className="swiper-slide" key={index}>
                      <img src={item.url} alt="" />
                    </div>
                  ))}
                </div>
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-pagination"></div>
              </div>
            </div>
          ) : (
            <p>{__("No logos added yet. Please add logos.", "text-domain")}</p>
          )}
        </div>
      </Fragment>
    );
  },
  save: () => {
    return null;
  },
});
