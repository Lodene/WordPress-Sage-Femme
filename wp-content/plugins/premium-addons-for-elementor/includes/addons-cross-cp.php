<?php

namespace PremiumAddons\Includes;

use Elementor\Utils;
use Elementor\Controls_Stack;

if ( ! defined( 'WPINC' ) ) {
	die;
}

/*
 * Premium Cross Domain Copy Paste Feature
 */
if ( ! class_exists( 'Addons_Cross_CP' ) ) {

	/**
	 * Define Addons_Cross_CP class
	 */
	class Addons_Cross_CP {

		/**
		 * Class instance
		 *
		 * @var instance
		 */
		private static $instance = null;

		/**
		 * Initalize integration hooks
		 *
		 * @return void
		 */
		public function __construct() {
			add_action( 'wp_ajax_premium_cross_cp_import', array( $this, 'cross_cp_fetch_content_data' ) );
		}

		/**
		 * Cross copy paste fetch data.
		 *
		 * @since  3.21.1
		 */
		public static function cross_cp_fetch_content_data() {

			check_ajax_referer( 'premium_cross_cp_import', 'nonce' );

			if ( ! current_user_can( 'edit_posts' ) ) {
				wp_send_json_error(
					__( 'Not a valid user', 'premium-addons-for-elementor' ),
					403
				);
			}

			$media_import = isset( $_POST['copy_content'] ) ? wp_unslash( $_POST['copy_content'] ) : '';

			if ( empty( $media_import ) ) {
				wp_send_json_error( __( 'Empty Content.', 'premium-addons-for-elementor' ) );
			}

			$media_import = array( json_decode( $media_import, true ) );
			$media_import = self::cross_cp_import_elements_ids( $media_import );
			$media_import = self::cross_cp_import_copy_content( $media_import );

			wp_send_json_success( $media_import );
		}

		/**
		 * Replace media element id with random id.
		 *
		 * @since  3.21.1
		 *
		 * @param object $media_import media to import.
		 */
		protected static function cross_cp_import_elements_ids( $media_import ) {

			return \Elementor\Plugin::instance()->db->iterate_data(
				$media_import,
				function( $element ) {
					$element['id'] = Utils::generate_random_string();
					return $element;
				}
			);

		}

		/**
		 * Media import copy content.
		 *
		 * @since  3.21.1
		 *
		 * @param object $media_import media to import.
		 */
		protected static function cross_cp_import_copy_content( $media_import ) {

			return \Elementor\Plugin::instance()->db->iterate_data(
				$media_import,
				function( $element_data ) {
					$element = \Elementor\Plugin::instance()->elements_manager->create_element_instance( $element_data );

					if ( ! $element ) {
						return null;
					}

					return self::cross_cp_import_element( $element );
				}
			);

		}

		/**
		 * Start element copy content for media import.
		 *
		 * @since  3.21.1
		 *
		 * @param Controls_Stack $element element to import.
		 */
		protected static function cross_cp_import_element( Controls_Stack $element ) {
			$element_data = $element->get_data();
			$method       = 'on_import';

			if ( method_exists( $element, $method ) ) {
				// TODO: Use the internal element data without parameters.
				$element_data = $element->{$method}( $element_data );
			}

			foreach ( $element->get_controls() as $control ) {
				$control_class = \Elementor\Plugin::instance()->controls_manager->get_control( $control['type'] );

				// If the control isn't exist, like a plugin that creates the control but deactivated.
				if ( ! $control_class ) {
					return $element_data;
				}

				if ( method_exists( $control_class, $method ) ) {
					$element_data['settings'][ $control['name'] ] = $control_class->{$method}( $element->get_settings( $control['name'] ), $control );
				}
			}

			return $element_data;
		}

		/**
		 * Returns the instance.
		 *
		 * @since  3.21.1
		 * @return object
		 *
		 * @param array $shortcodes shortcodes.
		 */
		public static function get_instance( $shortcodes = array() ) {

			if ( ! isset( self::$instance ) ) {

				self::$instance = new self( $shortcodes );
			}

			return self::$instance;
		}
	}
}
