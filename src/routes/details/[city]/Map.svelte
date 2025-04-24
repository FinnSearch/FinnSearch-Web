<script>
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { mode, theme } from 'mode-watcher';

	// Get props using $props()
	const props = $props();

	let unsubscribe;
	let map;
	let L;
	let tileLayer;

	function getTileUrl(theme) {
		return theme === 'light'
			? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
			: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
	}

	onMount(async() => {
		if (browser) {
			L = (await(import('leaflet')))
			if (props.latitude && props.longitude) {
				const icon1 = L.icon({
					iconUrl: '../pin_icon.png',
					iconSize: [20,20],
					iconAnchor: [20,20],
				})
				map = L.map(props.mapId || 'map', {attributionControl: false})
					.setView([props.latitude || 0, props.longitude || 0], props.zoom || 10);
				L.marker([props.latitude || 0, props.longitude || 0], {icon: icon1}).addTo(map);
			}


			unsubscribe = mode.subscribe((value) => {
				if (map && tileLayer) {
					map.removeLayer(tileLayer);
				}
				tileLayer = L.tileLayer(getTileUrl(value));
				tileLayer.addTo(map);
			});
		}
	});


	onDestroy(() => {
		if (map) {
			map.remove();
		}
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

<div id={props.mapId || 'map'} class="map-container h-64 w-full rounded-lg shadow-sm mb-6"></div>

<style>
    .map-container {
        min-height: 300px;
        z-index: 0;
        overflow: hidden;
    }
</style>