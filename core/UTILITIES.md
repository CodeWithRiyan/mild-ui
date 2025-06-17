# Mild UI Utilities Reference

Complete reference for all 1683 utility classes in the mild-ui design system.

## Overview

Mild UI provides a comprehensive set of utility classes with the `mild-` prefix to avoid conflicts with other CSS frameworks like Tailwind CSS. All utilities are generated from design tokens to ensure consistency.

## Quick Stats

- **1683** total utility classes
- **8** utility categories  
- **2** color palettes
- **13** spacing values
- **Dark mode support** with automatic theme switching
- **Zero conflicts** with Tailwind CSS or other frameworks

## Categories

- [Layout](#layout) (991 utilities)
- [Spacing](#spacing) (175 utilities)
- [Typography](#typography) (171 utilities)
- [Colors](#colors) (274 utilities)
- [Borders & Radius](#borders) (13 utilities)
- [Effects](#effects) (18 utilities)
- [Interactivity](#interactivity) (14 utilities)
- [Transforms & Transitions](#transforms) (27 utilities)

---

## Layout

Display, position, and layout utilities

| Class | CSS Properties |
|-------|----------------|
| `.mild-block` | `display: block` |
| `.mild-inline-block` | `display: inline-block` |
| `.mild-inline` | `display: inline` |
| `.mild-flex` | `display: flex` |
| `.mild-inline-flex` | `display: inline-flex` |
| `.mild-grid` | `display: grid` |
| `.mild-inline-grid` | `display: inline-grid` |
| `.mild-hidden` | `display: none` |
| `.mild-flex-row` | `flex-direction: row` |
| `.mild-flex-col` | `flex-direction: column` |
| `.mild-flex-wrap` | `flex-wrap: wrap` |
| `.mild-flex-nowrap` | `flex-wrap: nowrap` |
| `.mild-items-start` | `align-items: flex-start` |
| `.mild-items-end` | `align-items: flex-end` |
| `.mild-items-center` | `align-items: center` |
| `.mild-items-baseline` | `align-items: baseline` |
| `.mild-items-stretch` | `align-items: stretch` |
| `.mild-justify-start` | `justify-content: flex-start` |
| `.mild-justify-end` | `justify-content: flex-end` |
| `.mild-justify-center` | `justify-content: center` |
| `.mild-justify-between` | `justify-content: space-between` |
| `.mild-justify-around` | `justify-content: space-around` |
| `.mild-justify-evenly` | `justify-content: space-evenly` |
| `.mild-static` | `position: static` |
| `.mild-fixed` | `position: fixed` |
| `.mild-absolute` | `position: absolute` |
| `.mild-relative` | `position: relative` |
| `.mild-sticky` | `position: sticky` |
| `.mild-overflow-auto` | `overflow: auto` |
| `.mild-overflow-hidden` | `overflow: hidden` |
| `.mild-overflow-visible` | `overflow: visible` |
| `.mild-overflow-scroll` | `overflow: scroll` |
| `.mild-grid-cols-1` | `grid-template-columns: repeat(1, minmax(0, 1fr))` |
| `.mild-grid-rows-1` | `grid-template-rows: repeat(1, minmax(0, 1fr))` |
| `.mild-row-span-1` | `grid-row: span 1/span 1` |
| `.mild-col-span-1` | `grid-column: span 1/span 1` |
| `.mild-grid-cols-2` | `grid-template-columns: repeat(2, minmax(0, 1fr))` |
| `.mild-grid-rows-2` | `grid-template-rows: repeat(2, minmax(0, 1fr))` |
| `.mild-row-span-2` | `grid-row: span 2/span 2` |
| `.mild-col-span-2` | `grid-column: span 2/span 2` |
| `.mild-grid-cols-3` | `grid-template-columns: repeat(3, minmax(0, 1fr))` |
| `.mild-grid-rows-3` | `grid-template-rows: repeat(3, minmax(0, 1fr))` |
| `.mild-row-span-3` | `grid-row: span 3/span 3` |
| `.mild-col-span-3` | `grid-column: span 3/span 3` |
| `.mild-grid-cols-4` | `grid-template-columns: repeat(4, minmax(0, 1fr))` |
| `.mild-grid-rows-4` | `grid-template-rows: repeat(4, minmax(0, 1fr))` |
| `.mild-row-span-4` | `grid-row: span 4/span 4` |
| `.mild-col-span-4` | `grid-column: span 4/span 4` |
| `.mild-grid-cols-5` | `grid-template-columns: repeat(5, minmax(0, 1fr))` |
| `.mild-grid-rows-5` | `grid-template-rows: repeat(5, minmax(0, 1fr))` |
| `.mild-row-span-5` | `grid-row: span 5/span 5` |
| `.mild-col-span-5` | `grid-column: span 5/span 5` |
| `.mild-grid-cols-6` | `grid-template-columns: repeat(6, minmax(0, 1fr))` |
| `.mild-grid-rows-6` | `grid-template-rows: repeat(6, minmax(0, 1fr))` |
| `.mild-row-span-6` | `grid-row: span 6/span 6` |
| `.mild-col-span-6` | `grid-column: span 6/span 6` |
| `.mild-grid-cols-7` | `grid-template-columns: repeat(7, minmax(0, 1fr))` |
| `.mild-grid-rows-7` | `grid-template-rows: repeat(7, minmax(0, 1fr))` |
| `.mild-row-span-7` | `grid-row: span 7/span 7` |
| `.mild-col-span-7` | `grid-column: span 7/span 7` |
| `.mild-grid-cols-8` | `grid-template-columns: repeat(8, minmax(0, 1fr))` |
| `.mild-grid-rows-8` | `grid-template-rows: repeat(8, minmax(0, 1fr))` |
| `.mild-row-span-8` | `grid-row: span 8/span 8` |
| `.mild-col-span-8` | `grid-column: span 8/span 8` |
| `.mild-grid-cols-9` | `grid-template-columns: repeat(9, minmax(0, 1fr))` |
| `.mild-grid-rows-9` | `grid-template-rows: repeat(9, minmax(0, 1fr))` |
| `.mild-row-span-9` | `grid-row: span 9/span 9` |
| `.mild-col-span-9` | `grid-column: span 9/span 9` |
| `.mild-grid-cols-10` | `grid-template-columns: repeat(10, minmax(0, 1fr))` |
| `.mild-grid-rows-10` | `grid-template-rows: repeat(10, minmax(0, 1fr))` |
| `.mild-row-span-10` | `grid-row: span 10/span 10` |
| `.mild-col-span-10` | `grid-column: span 10/span 10` |
| `.mild-grid-cols-11` | `grid-template-columns: repeat(11, minmax(0, 1fr))` |
| `.mild-grid-rows-11` | `grid-template-rows: repeat(11, minmax(0, 1fr))` |
| `.mild-row-span-11` | `grid-row: span 11/span 11` |
| `.mild-col-span-11` | `grid-column: span 11/span 11` |
| `.mild-grid-cols-12` | `grid-template-columns: repeat(12, minmax(0, 1fr))` |
| `.mild-grid-rows-12` | `grid-template-rows: repeat(12, minmax(0, 1fr))` |
| `.mild-row-span-12` | `grid-row: span 12/span 12` |
| `.mild-col-span-12` | `grid-column: span 12/span 12` |
| `.mild-z-1` | `z-index: 1` |
| `.mild-z-2` | `z-index: 2` |
| `.mild-z-3` | `z-index: 3` |
| `.mild-z-4` | `z-index: 4` |
| `.mild-z-5` | `z-index: 5` |
| `.mild-z-10` | `z-index: 10` |
| `.mild-z-20` | `z-index: 20` |
| `.mild-z-30` | `z-index: 30` |
| `.mild-z-40` | `z-index: 40` |
| `.mild-z-50` | `z-index: 50` |
| `.mild-z-60` | `z-index: 60` |
| `.mild-z-70` | `z-index: 70` |
| `.mild-z-80` | `z-index: 80` |
| `.mild-z-90` | `z-index: 90` |
| `.mild-z-100` | `z-index: 100` |
| `.mild-w-full` | `width: 100%` |
| `.mild-h-full` | `height: 100%` |
| `.mild-min-w-full` | `min-width: 100%` |
| `.mild-min-h-full` | `min-height: 100%` |
| `.mild-max-w-full` | `max-width: 100%` |
| `.mild-max-h-full` | `max-height: 100%` |
| `.mild-w-1-2` | `width: 50%` |
| `.mild-h-1-2` | `height: 50%` |
| `.mild-min-w-1-2` | `min-width: 50%` |
| `.mild-min-h-1-2` | `min-height: 50%` |
| `.mild-max-w-1-2` | `max-width: 50%` |
| `.mild-max-h-1-2` | `max-height: 50%` |
| `.mild-w-1-3` | `width: 33.333333%` |
| `.mild-h-1-3` | `height: 33.333333%` |
| `.mild-min-w-1-3` | `min-width: 33.333333%` |
| `.mild-min-h-1-3` | `min-height: 33.333333%` |
| `.mild-max-w-1-3` | `max-width: 33.333333%` |
| `.mild-max-h-1-3` | `max-height: 33.333333%` |
| `.mild-w-2-3` | `width: 66.666667%` |
| `.mild-h-2-3` | `height: 66.666667%` |
| `.mild-min-w-2-3` | `min-width: 66.666667%` |
| `.mild-min-h-2-3` | `min-height: 66.666667%` |
| `.mild-max-w-2-3` | `max-width: 66.666667%` |
| `.mild-max-h-2-3` | `max-height: 66.666667%` |
| `.mild-w-1-4` | `width: 25%` |
| `.mild-h-1-4` | `height: 25%` |
| `.mild-min-w-1-4` | `min-width: 25%` |
| `.mild-min-h-1-4` | `min-height: 25%` |
| `.mild-max-w-1-4` | `max-width: 25%` |
| `.mild-max-h-1-4` | `max-height: 25%` |
| `.mild-w-3-4` | `width: 75%` |
| `.mild-h-3-4` | `height: 75%` |
| `.mild-min-w-3-4` | `min-width: 75%` |
| `.mild-min-h-3-4` | `min-height: 75%` |
| `.mild-max-w-3-4` | `max-width: 75%` |
| `.mild-max-h-3-4` | `max-height: 75%` |
| `.mild-w-1-5` | `width: 0.375rem` |
| `.mild-h-1-5` | `height: 0.375rem` |
| `.mild-min-w-1-5` | `min-width: 0.375rem` |
| `.mild-min-h-1-5` | `min-height: 0.375rem` |
| `.mild-max-w-1-5` | `max-width: 0.375rem` |
| `.mild-max-h-1-5` | `max-height: 0.375rem` |
| `.mild-w-2-5` | `width: 0.625rem` |
| `.mild-h-2-5` | `height: 0.625rem` |
| `.mild-min-w-2-5` | `min-width: 0.625rem` |
| `.mild-min-h-2-5` | `min-height: 0.625rem` |
| `.mild-max-w-2-5` | `max-width: 0.625rem` |
| `.mild-max-h-2-5` | `max-height: 0.625rem` |
| `.mild-w-3-5` | `width: 0.875rem` |
| `.mild-h-3-5` | `height: 0.875rem` |
| `.mild-min-w-3-5` | `min-width: 0.875rem` |
| `.mild-min-h-3-5` | `min-height: 0.875rem` |
| `.mild-max-w-3-5` | `max-width: 0.875rem` |
| `.mild-max-h-3-5` | `max-height: 0.875rem` |
| `.mild-w-4-5` | `width: 80%` |
| `.mild-h-4-5` | `height: 80%` |
| `.mild-min-w-4-5` | `min-width: 80%` |
| `.mild-min-h-4-5` | `min-height: 80%` |
| `.mild-max-w-4-5` | `max-width: 80%` |
| `.mild-max-h-4-5` | `max-height: 80%` |
| `.mild-w-1-6` | `width: 16.666667%` |
| `.mild-h-1-6` | `height: 16.666667%` |
| `.mild-min-w-1-6` | `min-width: 16.666667%` |
| `.mild-min-h-1-6` | `min-height: 16.666667%` |
| `.mild-max-w-1-6` | `max-width: 16.666667%` |
| `.mild-max-h-1-6` | `max-height: 16.666667%` |
| `.mild-w-5-6` | `width: 83.333333%` |
| `.mild-h-5-6` | `height: 83.333333%` |
| `.mild-min-w-5-6` | `min-width: 83.333333%` |
| `.mild-min-h-5-6` | `min-height: 83.333333%` |
| `.mild-max-w-5-6` | `max-width: 83.333333%` |
| `.mild-max-h-5-6` | `max-height: 83.333333%` |
| `.mild-w-1-7` | `width: 14.285714%` |
| `.mild-h-1-7` | `height: 14.285714%` |
| `.mild-min-w-1-7` | `min-width: 14.285714%` |
| `.mild-min-h-1-7` | `min-height: 14.285714%` |
| `.mild-max-w-1-7` | `max-width: 14.285714%` |
| `.mild-max-h-1-7` | `max-height: 14.285714%` |
| `.mild-w-2-7` | `width: 28.571429%` |
| `.mild-h-2-7` | `height: 28.571429%` |
| `.mild-min-w-2-7` | `min-width: 28.571429%` |
| `.mild-min-h-2-7` | `min-height: 28.571429%` |
| `.mild-max-w-2-7` | `max-width: 28.571429%` |
| `.mild-max-h-2-7` | `max-height: 28.571429%` |
| `.mild-w-3-7` | `width: 42.857143%` |
| `.mild-h-3-7` | `height: 42.857143%` |
| `.mild-min-w-3-7` | `min-width: 42.857143%` |
| `.mild-min-h-3-7` | `min-height: 42.857143%` |
| `.mild-max-w-3-7` | `max-width: 42.857143%` |
| `.mild-max-h-3-7` | `max-height: 42.857143%` |
| `.mild-w-4-7` | `width: 57.142857%` |
| `.mild-h-4-7` | `height: 57.142857%` |
| `.mild-min-w-4-7` | `min-width: 57.142857%` |
| `.mild-min-h-4-7` | `min-height: 57.142857%` |
| `.mild-max-w-4-7` | `max-width: 57.142857%` |
| `.mild-max-h-4-7` | `max-height: 57.142857%` |
| `.mild-w-5-7` | `width: 71.428571%` |
| `.mild-h-5-7` | `height: 71.428571%` |
| `.mild-min-w-5-7` | `min-width: 71.428571%` |
| `.mild-min-h-5-7` | `min-height: 71.428571%` |
| `.mild-max-w-5-7` | `max-width: 71.428571%` |
| `.mild-max-h-5-7` | `max-height: 71.428571%` |
| `.mild-w-6-7` | `width: 85.714286%` |
| `.mild-h-6-7` | `height: 85.714286%` |
| `.mild-min-w-6-7` | `min-width: 85.714286%` |
| `.mild-min-h-6-7` | `min-height: 85.714286%` |
| `.mild-max-w-6-7` | `max-width: 85.714286%` |
| `.mild-max-h-6-7` | `max-height: 85.714286%` |
| `.mild-w-1-8` | `width: 12.5%` |
| `.mild-h-1-8` | `height: 12.5%` |
| `.mild-min-w-1-8` | `min-width: 12.5%` |
| `.mild-min-h-1-8` | `min-height: 12.5%` |
| `.mild-max-w-1-8` | `max-width: 12.5%` |
| `.mild-max-h-1-8` | `max-height: 12.5%` |
| `.mild-w-3-8` | `width: 37.5%` |
| `.mild-h-3-8` | `height: 37.5%` |
| `.mild-min-w-3-8` | `min-width: 37.5%` |
| `.mild-min-h-3-8` | `min-height: 37.5%` |
| `.mild-max-w-3-8` | `max-width: 37.5%` |
| `.mild-max-h-3-8` | `max-height: 37.5%` |
| `.mild-w-5-8` | `width: 62.5%` |
| `.mild-h-5-8` | `height: 62.5%` |
| `.mild-min-w-5-8` | `min-width: 62.5%` |
| `.mild-min-h-5-8` | `min-height: 62.5%` |
| `.mild-max-w-5-8` | `max-width: 62.5%` |
| `.mild-max-h-5-8` | `max-height: 62.5%` |
| `.mild-w-7-8` | `width: 87.5%` |
| `.mild-h-7-8` | `height: 87.5%` |
| `.mild-min-w-7-8` | `min-width: 87.5%` |
| `.mild-min-h-7-8` | `min-height: 87.5%` |
| `.mild-max-w-7-8` | `max-width: 87.5%` |
| `.mild-max-h-7-8` | `max-height: 87.5%` |
| `.mild-w-1-9` | `width: 11.111111%` |
| `.mild-h-1-9` | `height: 11.111111%` |
| `.mild-min-w-1-9` | `min-width: 11.111111%` |
| `.mild-min-h-1-9` | `min-height: 11.111111%` |
| `.mild-max-w-1-9` | `max-width: 11.111111%` |
| `.mild-max-h-1-9` | `max-height: 11.111111%` |
| `.mild-w-2-9` | `width: 22.222222%` |
| `.mild-h-2-9` | `height: 22.222222%` |
| `.mild-min-w-2-9` | `min-width: 22.222222%` |
| `.mild-min-h-2-9` | `min-height: 22.222222%` |
| `.mild-max-w-2-9` | `max-width: 22.222222%` |
| `.mild-max-h-2-9` | `max-height: 22.222222%` |
| `.mild-w-4-9` | `width: 44.444444%` |
| `.mild-h-4-9` | `height: 44.444444%` |
| `.mild-min-w-4-9` | `min-width: 44.444444%` |
| `.mild-min-h-4-9` | `min-height: 44.444444%` |
| `.mild-max-w-4-9` | `max-width: 44.444444%` |
| `.mild-max-h-4-9` | `max-height: 44.444444%` |
| `.mild-w-5-9` | `width: 55.555556%` |
| `.mild-h-5-9` | `height: 55.555556%` |
| `.mild-min-w-5-9` | `min-width: 55.555556%` |
| `.mild-min-h-5-9` | `min-height: 55.555556%` |
| `.mild-max-w-5-9` | `max-width: 55.555556%` |
| `.mild-max-h-5-9` | `max-height: 55.555556%` |
| `.mild-w-7-9` | `width: 77.777778%` |
| `.mild-h-7-9` | `height: 77.777778%` |
| `.mild-min-w-7-9` | `min-width: 77.777778%` |
| `.mild-min-h-7-9` | `min-height: 77.777778%` |
| `.mild-max-w-7-9` | `max-width: 77.777778%` |
| `.mild-max-h-7-9` | `max-height: 77.777778%` |
| `.mild-w-8-9` | `width: 88.888889%` |
| `.mild-h-8-9` | `height: 88.888889%` |
| `.mild-min-w-8-9` | `min-width: 88.888889%` |
| `.mild-min-h-8-9` | `min-height: 88.888889%` |
| `.mild-max-w-8-9` | `max-width: 88.888889%` |
| `.mild-max-h-8-9` | `max-height: 88.888889%` |
| `.mild-w-1-10` | `width: 10%` |
| `.mild-h-1-10` | `height: 10%` |
| `.mild-min-w-1-10` | `min-width: 10%` |
| `.mild-min-h-1-10` | `min-height: 10%` |
| `.mild-max-w-1-10` | `max-width: 10%` |
| `.mild-max-h-1-10` | `max-height: 10%` |
| `.mild-w-3-10` | `width: 30%` |
| `.mild-h-3-10` | `height: 30%` |
| `.mild-min-w-3-10` | `min-width: 30%` |
| `.mild-min-h-3-10` | `min-height: 30%` |
| `.mild-max-w-3-10` | `max-width: 30%` |
| `.mild-max-h-3-10` | `max-height: 30%` |
| `.mild-w-7-10` | `width: 70%` |
| `.mild-h-7-10` | `height: 70%` |
| `.mild-min-w-7-10` | `min-width: 70%` |
| `.mild-min-h-7-10` | `min-height: 70%` |
| `.mild-max-w-7-10` | `max-width: 70%` |
| `.mild-max-h-7-10` | `max-height: 70%` |
| `.mild-w-9-10` | `width: 90%` |
| `.mild-h-9-10` | `height: 90%` |
| `.mild-min-w-9-10` | `min-width: 90%` |
| `.mild-min-h-9-10` | `min-height: 90%` |
| `.mild-max-w-9-10` | `max-width: 90%` |
| `.mild-max-h-9-10` | `max-height: 90%` |
| `.mild-w-1-11` | `width: 9.090909%` |
| `.mild-h-1-11` | `height: 9.090909%` |
| `.mild-min-w-1-11` | `min-width: 9.090909%` |
| `.mild-min-h-1-11` | `min-height: 9.090909%` |
| `.mild-max-w-1-11` | `max-width: 9.090909%` |
| `.mild-max-h-1-11` | `max-height: 9.090909%` |
| `.mild-w-2-11` | `width: 18.181818%` |
| `.mild-h-2-11` | `height: 18.181818%` |
| `.mild-min-w-2-11` | `min-width: 18.181818%` |
| `.mild-min-h-2-11` | `min-height: 18.181818%` |
| `.mild-max-w-2-11` | `max-width: 18.181818%` |
| `.mild-max-h-2-11` | `max-height: 18.181818%` |
| `.mild-w-3-11` | `width: 27.272727%` |
| `.mild-h-3-11` | `height: 27.272727%` |
| `.mild-min-w-3-11` | `min-width: 27.272727%` |
| `.mild-min-h-3-11` | `min-height: 27.272727%` |
| `.mild-max-w-3-11` | `max-width: 27.272727%` |
| `.mild-max-h-3-11` | `max-height: 27.272727%` |
| `.mild-w-4-11` | `width: 36.363636%` |
| `.mild-h-4-11` | `height: 36.363636%` |
| `.mild-min-w-4-11` | `min-width: 36.363636%` |
| `.mild-min-h-4-11` | `min-height: 36.363636%` |
| `.mild-max-w-4-11` | `max-width: 36.363636%` |
| `.mild-max-h-4-11` | `max-height: 36.363636%` |
| `.mild-w-5-11` | `width: 45.454545%` |
| `.mild-h-5-11` | `height: 45.454545%` |
| `.mild-min-w-5-11` | `min-width: 45.454545%` |
| `.mild-min-h-5-11` | `min-height: 45.454545%` |
| `.mild-max-w-5-11` | `max-width: 45.454545%` |
| `.mild-max-h-5-11` | `max-height: 45.454545%` |
| `.mild-w-6-11` | `width: 54.545455%` |
| `.mild-h-6-11` | `height: 54.545455%` |
| `.mild-min-w-6-11` | `min-width: 54.545455%` |
| `.mild-min-h-6-11` | `min-height: 54.545455%` |
| `.mild-max-w-6-11` | `max-width: 54.545455%` |
| `.mild-max-h-6-11` | `max-height: 54.545455%` |
| `.mild-w-7-11` | `width: 63.636364%` |
| `.mild-h-7-11` | `height: 63.636364%` |
| `.mild-min-w-7-11` | `min-width: 63.636364%` |
| `.mild-min-h-7-11` | `min-height: 63.636364%` |
| `.mild-max-w-7-11` | `max-width: 63.636364%` |
| `.mild-max-h-7-11` | `max-height: 63.636364%` |
| `.mild-w-8-11` | `width: 72.727273%` |
| `.mild-h-8-11` | `height: 72.727273%` |
| `.mild-min-w-8-11` | `min-width: 72.727273%` |
| `.mild-min-h-8-11` | `min-height: 72.727273%` |
| `.mild-max-w-8-11` | `max-width: 72.727273%` |
| `.mild-max-h-8-11` | `max-height: 72.727273%` |
| `.mild-w-9-11` | `width: 81.818182%` |
| `.mild-h-9-11` | `height: 81.818182%` |
| `.mild-min-w-9-11` | `min-width: 81.818182%` |
| `.mild-min-h-9-11` | `min-height: 81.818182%` |
| `.mild-max-w-9-11` | `max-width: 81.818182%` |
| `.mild-max-h-9-11` | `max-height: 81.818182%` |
| `.mild-w-10-11` | `width: 90.909091%` |
| `.mild-h-10-11` | `height: 90.909091%` |
| `.mild-min-w-10-11` | `min-width: 90.909091%` |
| `.mild-min-h-10-11` | `min-height: 90.909091%` |
| `.mild-max-w-10-11` | `max-width: 90.909091%` |
| `.mild-max-h-10-11` | `max-height: 90.909091%` |
| `.mild-w-1-12` | `width: 8.333333%` |
| `.mild-h-1-12` | `height: 8.333333%` |
| `.mild-min-w-1-12` | `min-width: 8.333333%` |
| `.mild-min-h-1-12` | `min-height: 8.333333%` |
| `.mild-max-w-1-12` | `max-width: 8.333333%` |
| `.mild-max-h-1-12` | `max-height: 8.333333%` |
| `.mild-w-5-12` | `width: 41.666667%` |
| `.mild-h-5-12` | `height: 41.666667%` |
| `.mild-min-w-5-12` | `min-width: 41.666667%` |
| `.mild-min-h-5-12` | `min-height: 41.666667%` |
| `.mild-max-w-5-12` | `max-width: 41.666667%` |
| `.mild-max-h-5-12` | `max-height: 41.666667%` |
| `.mild-w-7-12` | `width: 58.333333%` |
| `.mild-h-7-12` | `height: 58.333333%` |
| `.mild-min-w-7-12` | `min-width: 58.333333%` |
| `.mild-min-h-7-12` | `min-height: 58.333333%` |
| `.mild-max-w-7-12` | `max-width: 58.333333%` |
| `.mild-max-h-7-12` | `max-height: 58.333333%` |
| `.mild-w-11-12` | `width: 91.666667%` |
| `.mild-h-11-12` | `height: 91.666667%` |
| `.mild-min-w-11-12` | `min-width: 91.666667%` |
| `.mild-min-h-11-12` | `min-height: 91.666667%` |
| `.mild-max-w-11-12` | `max-width: 91.666667%` |
| `.mild-max-h-11-12` | `max-height: 91.666667%` |
| `.mild-w-0` | `width: 0px` |
| `.mild-h-0` | `height: 0px` |
| `.mild-min-w-0` | `min-width: 0px` |
| `.mild-min-h-0` | `min-height: 0px` |
| `.mild-max-w-0` | `max-width: 0px` |
| `.mild-max-h-0` | `max-height: 0px` |
| `.mild-w-px` | `width: 1px` |
| `.mild-h-px` | `height: 1px` |
| `.mild-min-w-px` | `min-width: 1px` |
| `.mild-min-h-px` | `min-height: 1px` |
| `.mild-max-w-px` | `max-width: 1px` |
| `.mild-max-h-px` | `max-height: 1px` |
| `.mild-w-0-5` | `width: 0.125rem` |
| `.mild-h-0-5` | `height: 0.125rem` |
| `.mild-min-w-0-5` | `min-width: 0.125rem` |
| `.mild-min-h-0-5` | `min-height: 0.125rem` |
| `.mild-max-w-0-5` | `max-width: 0.125rem` |
| `.mild-max-h-0-5` | `max-height: 0.125rem` |
| `.mild-w-1` | `width: 0.25rem` |
| `.mild-h-1` | `height: 0.25rem` |
| `.mild-min-w-1` | `min-width: 0.25rem` |
| `.mild-min-h-1` | `min-height: 0.25rem` |
| `.mild-max-w-1` | `max-width: 0.25rem` |
| `.mild-max-h-1` | `max-height: 0.25rem` |
| `.mild-w-2` | `width: 0.5rem` |
| `.mild-h-2` | `height: 0.5rem` |
| `.mild-min-w-2` | `min-width: 0.5rem` |
| `.mild-min-h-2` | `min-height: 0.5rem` |
| `.mild-max-w-2` | `max-width: 0.5rem` |
| `.mild-max-h-2` | `max-height: 0.5rem` |
| `.mild-w-3` | `width: 0.75rem` |
| `.mild-h-3` | `height: 0.75rem` |
| `.mild-min-w-3` | `min-width: 0.75rem` |
| `.mild-min-h-3` | `min-height: 0.75rem` |
| `.mild-max-w-3` | `max-width: 0.75rem` |
| `.mild-max-h-3` | `max-height: 0.75rem` |
| `.mild-w-4` | `width: 1rem` |
| `.mild-h-4` | `height: 1rem` |
| `.mild-min-w-4` | `min-width: 1rem` |
| `.mild-min-h-4` | `min-height: 1rem` |
| `.mild-max-w-4` | `max-width: 1rem` |
| `.mild-max-h-4` | `max-height: 1rem` |
| `.mild-w-5` | `width: 1.25rem` |
| `.mild-h-5` | `height: 1.25rem` |
| `.mild-min-w-5` | `min-width: 1.25rem` |
| `.mild-min-h-5` | `min-height: 1.25rem` |
| `.mild-max-w-5` | `max-width: 1.25rem` |
| `.mild-max-h-5` | `max-height: 1.25rem` |
| `.mild-w-6` | `width: 1.5rem` |
| `.mild-h-6` | `height: 1.5rem` |
| `.mild-min-w-6` | `min-width: 1.5rem` |
| `.mild-min-h-6` | `min-height: 1.5rem` |
| `.mild-max-w-6` | `max-width: 1.5rem` |
| `.mild-max-h-6` | `max-height: 1.5rem` |
| `.mild-w-7` | `width: 1.75rem` |
| `.mild-h-7` | `height: 1.75rem` |
| `.mild-min-w-7` | `min-width: 1.75rem` |
| `.mild-min-h-7` | `min-height: 1.75rem` |
| `.mild-max-w-7` | `max-width: 1.75rem` |
| `.mild-max-h-7` | `max-height: 1.75rem` |
| `.mild-w-8` | `width: 2rem` |
| `.mild-h-8` | `height: 2rem` |
| `.mild-min-w-8` | `min-width: 2rem` |
| `.mild-min-h-8` | `min-height: 2rem` |
| `.mild-max-w-8` | `max-width: 2rem` |
| `.mild-max-h-8` | `max-height: 2rem` |
| `.mild-w-9` | `width: 2.25rem` |
| `.mild-h-9` | `height: 2.25rem` |
| `.mild-min-w-9` | `min-width: 2.25rem` |
| `.mild-min-h-9` | `min-height: 2.25rem` |
| `.mild-max-w-9` | `max-width: 2.25rem` |
| `.mild-max-h-9` | `max-height: 2.25rem` |
| `.mild-w-10` | `width: 2.5rem` |
| `.mild-h-10` | `height: 2.5rem` |
| `.mild-min-w-10` | `min-width: 2.5rem` |
| `.mild-min-h-10` | `min-height: 2.5rem` |
| `.mild-max-w-10` | `max-width: 2.5rem` |
| `.mild-max-h-10` | `max-height: 2.5rem` |
| `.mild-w-11` | `width: 2.75rem` |
| `.mild-h-11` | `height: 2.75rem` |
| `.mild-min-w-11` | `min-width: 2.75rem` |
| `.mild-min-h-11` | `min-height: 2.75rem` |
| `.mild-max-w-11` | `max-width: 2.75rem` |
| `.mild-max-h-11` | `max-height: 2.75rem` |
| `.mild-w-12` | `width: 3rem` |
| `.mild-h-12` | `height: 3rem` |
| `.mild-min-w-12` | `min-width: 3rem` |
| `.mild-min-h-12` | `min-height: 3rem` |
| `.mild-max-w-12` | `max-width: 3rem` |
| `.mild-max-h-12` | `max-height: 3rem` |
| `.mild-w-14` | `width: 3.5rem` |
| `.mild-h-14` | `height: 3.5rem` |
| `.mild-min-w-14` | `min-width: 3.5rem` |
| `.mild-min-h-14` | `min-height: 3.5rem` |
| `.mild-max-w-14` | `max-width: 3.5rem` |
| `.mild-max-h-14` | `max-height: 3.5rem` |
| `.mild-w-16` | `width: 4rem` |
| `.mild-h-16` | `height: 4rem` |
| `.mild-min-w-16` | `min-width: 4rem` |
| `.mild-min-h-16` | `min-height: 4rem` |
| `.mild-max-w-16` | `max-width: 4rem` |
| `.mild-max-h-16` | `max-height: 4rem` |
| `.mild-w-20` | `width: 5rem` |
| `.mild-h-20` | `height: 5rem` |
| `.mild-min-w-20` | `min-width: 5rem` |
| `.mild-min-h-20` | `min-height: 5rem` |
| `.mild-max-w-20` | `max-width: 5rem` |
| `.mild-max-h-20` | `max-height: 5rem` |
| `.mild-w-24` | `width: 6rem` |
| `.mild-h-24` | `height: 6rem` |
| `.mild-min-w-24` | `min-width: 6rem` |
| `.mild-min-h-24` | `min-height: 6rem` |
| `.mild-max-w-24` | `max-width: 6rem` |
| `.mild-max-h-24` | `max-height: 6rem` |
| `.mild-w-28` | `width: 7rem` |
| `.mild-h-28` | `height: 7rem` |
| `.mild-min-w-28` | `min-width: 7rem` |
| `.mild-min-h-28` | `min-height: 7rem` |
| `.mild-max-w-28` | `max-width: 7rem` |
| `.mild-max-h-28` | `max-height: 7rem` |
| `.mild-w-32` | `width: 8rem` |
| `.mild-h-32` | `height: 8rem` |
| `.mild-min-w-32` | `min-width: 8rem` |
| `.mild-min-h-32` | `min-height: 8rem` |
| `.mild-max-w-32` | `max-width: 8rem` |
| `.mild-max-h-32` | `max-height: 8rem` |
| `.mild-w-36` | `width: 9rem` |
| `.mild-h-36` | `height: 9rem` |
| `.mild-min-w-36` | `min-width: 9rem` |
| `.mild-min-h-36` | `min-height: 9rem` |
| `.mild-max-w-36` | `max-width: 9rem` |
| `.mild-max-h-36` | `max-height: 9rem` |
| `.mild-w-40` | `width: 10rem` |
| `.mild-h-40` | `height: 10rem` |
| `.mild-min-w-40` | `min-width: 10rem` |
| `.mild-min-h-40` | `min-height: 10rem` |
| `.mild-max-w-40` | `max-width: 10rem` |
| `.mild-max-h-40` | `max-height: 10rem` |
| `.mild-w-44` | `width: 11rem` |
| `.mild-h-44` | `height: 11rem` |
| `.mild-min-w-44` | `min-width: 11rem` |
| `.mild-min-h-44` | `min-height: 11rem` |
| `.mild-max-w-44` | `max-width: 11rem` |
| `.mild-max-h-44` | `max-height: 11rem` |
| `.mild-w-48` | `width: 12rem` |
| `.mild-h-48` | `height: 12rem` |
| `.mild-min-w-48` | `min-width: 12rem` |
| `.mild-min-h-48` | `min-height: 12rem` |
| `.mild-max-w-48` | `max-width: 12rem` |
| `.mild-max-h-48` | `max-height: 12rem` |
| `.mild-w-52` | `width: 13rem` |
| `.mild-h-52` | `height: 13rem` |
| `.mild-min-w-52` | `min-width: 13rem` |
| `.mild-min-h-52` | `min-height: 13rem` |
| `.mild-max-w-52` | `max-width: 13rem` |
| `.mild-max-h-52` | `max-height: 13rem` |
| `.mild-w-56` | `width: 14rem` |
| `.mild-h-56` | `height: 14rem` |
| `.mild-min-w-56` | `min-width: 14rem` |
| `.mild-min-h-56` | `min-height: 14rem` |
| `.mild-max-w-56` | `max-width: 14rem` |
| `.mild-max-h-56` | `max-height: 14rem` |
| `.mild-w-60` | `width: 15rem` |
| `.mild-h-60` | `height: 15rem` |
| `.mild-min-w-60` | `min-width: 15rem` |
| `.mild-min-h-60` | `min-height: 15rem` |
| `.mild-max-w-60` | `max-width: 15rem` |
| `.mild-max-h-60` | `max-height: 15rem` |
| `.mild-w-64` | `width: 16rem` |
| `.mild-h-64` | `height: 16rem` |
| `.mild-min-w-64` | `min-width: 16rem` |
| `.mild-min-h-64` | `min-height: 16rem` |
| `.mild-max-w-64` | `max-width: 16rem` |
| `.mild-max-h-64` | `max-height: 16rem` |
| `.mild-w-72` | `width: 18rem` |
| `.mild-h-72` | `height: 18rem` |
| `.mild-min-w-72` | `min-width: 18rem` |
| `.mild-min-h-72` | `min-height: 18rem` |
| `.mild-max-w-72` | `max-width: 18rem` |
| `.mild-max-h-72` | `max-height: 18rem` |
| `.mild-w-80` | `width: 20rem` |
| `.mild-h-80` | `height: 20rem` |
| `.mild-min-w-80` | `min-width: 20rem` |
| `.mild-min-h-80` | `min-height: 20rem` |
| `.mild-max-w-80` | `max-width: 20rem` |
| `.mild-max-h-80` | `max-height: 20rem` |
| `.mild-w-96` | `width: 24rem` |
| `.mild-h-96` | `height: 24rem` |
| `.mild-min-w-96` | `min-width: 24rem` |
| `.mild-min-h-96` | `min-height: 24rem` |
| `.mild-max-w-96` | `max-width: 24rem` |
| `.mild-max-h-96` | `max-height: 24rem` |
| `.mild-mx-0` | `margin-left: 0px; margin-right: 0px` |
| `.mild-my-0` | `margin-top: 0px; margin-bottom: 0px` |
| `.mild-mt-0` | `margin-top: 0px` |
| `.mild-mr-0` | `margin-right: 0px` |
| `.mild-mb-0` | `margin-bottom: 0px` |
| `.mild-ml-0` | `margin-left: 0px` |
| `.mild-mx-px` | `margin-left: 1px; margin-right: 1px` |
| `.mild-my-px` | `margin-top: 1px; margin-bottom: 1px` |
| `.mild-mt-px` | `margin-top: 1px` |
| `.mild-mr-px` | `margin-right: 1px` |
| `.mild-mb-px` | `margin-bottom: 1px` |
| `.mild-ml-px` | `margin-left: 1px` |
| `.mild-mx-0-5` | `margin-left: 0.125rem; margin-right: 0.125rem` |
| `.mild-my-0-5` | `margin-top: 0.125rem; margin-bottom: 0.125rem` |
| `.mild-mt-0-5` | `margin-top: 0.125rem` |
| `.mild-mr-0-5` | `margin-right: 0.125rem` |
| `.mild-mb-0-5` | `margin-bottom: 0.125rem` |
| `.mild-ml-0-5` | `margin-left: 0.125rem` |
| `.mild-mx-1` | `margin-left: 0.25rem; margin-right: 0.25rem` |
| `.mild-my-1` | `margin-top: 0.25rem; margin-bottom: 0.25rem` |
| `.mild-mt-1` | `margin-top: 0.25rem` |
| `.mild-mr-1` | `margin-right: 0.25rem` |
| `.mild-mb-1` | `margin-bottom: 0.25rem` |
| `.mild-ml-1` | `margin-left: 0.25rem` |
| `.mild-mx-1-5` | `margin-left: 0.375rem; margin-right: 0.375rem` |
| `.mild-my-1-5` | `margin-top: 0.375rem; margin-bottom: 0.375rem` |
| `.mild-mt-1-5` | `margin-top: 0.375rem` |
| `.mild-mr-1-5` | `margin-right: 0.375rem` |
| `.mild-mb-1-5` | `margin-bottom: 0.375rem` |
| `.mild-ml-1-5` | `margin-left: 0.375rem` |
| `.mild-mx-2` | `margin-left: 0.5rem; margin-right: 0.5rem` |
| `.mild-my-2` | `margin-top: 0.5rem; margin-bottom: 0.5rem` |
| `.mild-mt-2` | `margin-top: 0.5rem` |
| `.mild-mr-2` | `margin-right: 0.5rem` |
| `.mild-mb-2` | `margin-bottom: 0.5rem` |
| `.mild-ml-2` | `margin-left: 0.5rem` |
| `.mild-mx-2-5` | `margin-left: 0.625rem; margin-right: 0.625rem` |
| `.mild-my-2-5` | `margin-top: 0.625rem; margin-bottom: 0.625rem` |
| `.mild-mt-2-5` | `margin-top: 0.625rem` |
| `.mild-mr-2-5` | `margin-right: 0.625rem` |
| `.mild-mb-2-5` | `margin-bottom: 0.625rem` |
| `.mild-ml-2-5` | `margin-left: 0.625rem` |
| `.mild-mx-3` | `margin-left: 0.75rem; margin-right: 0.75rem` |
| `.mild-my-3` | `margin-top: 0.75rem; margin-bottom: 0.75rem` |
| `.mild-mt-3` | `margin-top: 0.75rem` |
| `.mild-mr-3` | `margin-right: 0.75rem` |
| `.mild-mb-3` | `margin-bottom: 0.75rem` |
| `.mild-ml-3` | `margin-left: 0.75rem` |
| `.mild-mx-3-5` | `margin-left: 0.875rem; margin-right: 0.875rem` |
| `.mild-my-3-5` | `margin-top: 0.875rem; margin-bottom: 0.875rem` |
| `.mild-mt-3-5` | `margin-top: 0.875rem` |
| `.mild-mr-3-5` | `margin-right: 0.875rem` |
| `.mild-mb-3-5` | `margin-bottom: 0.875rem` |
| `.mild-ml-3-5` | `margin-left: 0.875rem` |
| `.mild-mx-4` | `margin-left: 1rem; margin-right: 1rem` |
| `.mild-my-4` | `margin-top: 1rem; margin-bottom: 1rem` |
| `.mild-mt-4` | `margin-top: 1rem` |
| `.mild-mr-4` | `margin-right: 1rem` |
| `.mild-mb-4` | `margin-bottom: 1rem` |
| `.mild-ml-4` | `margin-left: 1rem` |
| `.mild-mx-5` | `margin-left: 1.25rem; margin-right: 1.25rem` |
| `.mild-my-5` | `margin-top: 1.25rem; margin-bottom: 1.25rem` |
| `.mild-mt-5` | `margin-top: 1.25rem` |
| `.mild-mr-5` | `margin-right: 1.25rem` |
| `.mild-mb-5` | `margin-bottom: 1.25rem` |
| `.mild-ml-5` | `margin-left: 1.25rem` |
| `.mild-mx-6` | `margin-left: 1.5rem; margin-right: 1.5rem` |
| `.mild-my-6` | `margin-top: 1.5rem; margin-bottom: 1.5rem` |
| `.mild-mt-6` | `margin-top: 1.5rem` |
| `.mild-mr-6` | `margin-right: 1.5rem` |
| `.mild-mb-6` | `margin-bottom: 1.5rem` |
| `.mild-ml-6` | `margin-left: 1.5rem` |
| `.mild-mx-7` | `margin-left: 1.75rem; margin-right: 1.75rem` |
| `.mild-my-7` | `margin-top: 1.75rem; margin-bottom: 1.75rem` |
| `.mild-mt-7` | `margin-top: 1.75rem` |
| `.mild-mr-7` | `margin-right: 1.75rem` |
| `.mild-mb-7` | `margin-bottom: 1.75rem` |
| `.mild-ml-7` | `margin-left: 1.75rem` |
| `.mild-mx-8` | `margin-left: 2rem; margin-right: 2rem` |
| `.mild-my-8` | `margin-top: 2rem; margin-bottom: 2rem` |
| `.mild-mt-8` | `margin-top: 2rem` |
| `.mild-mr-8` | `margin-right: 2rem` |
| `.mild-mb-8` | `margin-bottom: 2rem` |
| `.mild-ml-8` | `margin-left: 2rem` |
| `.mild-mx-9` | `margin-left: 2.25rem; margin-right: 2.25rem` |
| `.mild-my-9` | `margin-top: 2.25rem; margin-bottom: 2.25rem` |
| `.mild-mt-9` | `margin-top: 2.25rem` |
| `.mild-mr-9` | `margin-right: 2.25rem` |
| `.mild-mb-9` | `margin-bottom: 2.25rem` |
| `.mild-ml-9` | `margin-left: 2.25rem` |
| `.mild-mx-10` | `margin-left: 2.5rem; margin-right: 2.5rem` |
| `.mild-my-10` | `margin-top: 2.5rem; margin-bottom: 2.5rem` |
| `.mild-mt-10` | `margin-top: 2.5rem` |
| `.mild-mr-10` | `margin-right: 2.5rem` |
| `.mild-mb-10` | `margin-bottom: 2.5rem` |
| `.mild-ml-10` | `margin-left: 2.5rem` |
| `.mild-mx-11` | `margin-left: 2.75rem; margin-right: 2.75rem` |
| `.mild-my-11` | `margin-top: 2.75rem; margin-bottom: 2.75rem` |
| `.mild-mt-11` | `margin-top: 2.75rem` |
| `.mild-mr-11` | `margin-right: 2.75rem` |
| `.mild-mb-11` | `margin-bottom: 2.75rem` |
| `.mild-ml-11` | `margin-left: 2.75rem` |
| `.mild-mx-12` | `margin-left: 3rem; margin-right: 3rem` |
| `.mild-my-12` | `margin-top: 3rem; margin-bottom: 3rem` |
| `.mild-mt-12` | `margin-top: 3rem` |
| `.mild-mr-12` | `margin-right: 3rem` |
| `.mild-mb-12` | `margin-bottom: 3rem` |
| `.mild-ml-12` | `margin-left: 3rem` |
| `.mild-mx-14` | `margin-left: 3.5rem; margin-right: 3.5rem` |
| `.mild-my-14` | `margin-top: 3.5rem; margin-bottom: 3.5rem` |
| `.mild-mt-14` | `margin-top: 3.5rem` |
| `.mild-mr-14` | `margin-right: 3.5rem` |
| `.mild-mb-14` | `margin-bottom: 3.5rem` |
| `.mild-ml-14` | `margin-left: 3.5rem` |
| `.mild-mx-16` | `margin-left: 4rem; margin-right: 4rem` |
| `.mild-my-16` | `margin-top: 4rem; margin-bottom: 4rem` |
| `.mild-mt-16` | `margin-top: 4rem` |
| `.mild-mr-16` | `margin-right: 4rem` |
| `.mild-mb-16` | `margin-bottom: 4rem` |
| `.mild-ml-16` | `margin-left: 4rem` |
| `.mild-mx-20` | `margin-left: 5rem; margin-right: 5rem` |
| `.mild-my-20` | `margin-top: 5rem; margin-bottom: 5rem` |
| `.mild-mt-20` | `margin-top: 5rem` |
| `.mild-mr-20` | `margin-right: 5rem` |
| `.mild-mb-20` | `margin-bottom: 5rem` |
| `.mild-ml-20` | `margin-left: 5rem` |
| `.mild-mx-24` | `margin-left: 6rem; margin-right: 6rem` |
| `.mild-my-24` | `margin-top: 6rem; margin-bottom: 6rem` |
| `.mild-mt-24` | `margin-top: 6rem` |
| `.mild-mr-24` | `margin-right: 6rem` |
| `.mild-mb-24` | `margin-bottom: 6rem` |
| `.mild-ml-24` | `margin-left: 6rem` |
| `.mild-mx-28` | `margin-left: 7rem; margin-right: 7rem` |
| `.mild-my-28` | `margin-top: 7rem; margin-bottom: 7rem` |
| `.mild-mt-28` | `margin-top: 7rem` |
| `.mild-mr-28` | `margin-right: 7rem` |
| `.mild-mb-28` | `margin-bottom: 7rem` |
| `.mild-ml-28` | `margin-left: 7rem` |
| `.mild-mx-32` | `margin-left: 8rem; margin-right: 8rem` |
| `.mild-my-32` | `margin-top: 8rem; margin-bottom: 8rem` |
| `.mild-mt-32` | `margin-top: 8rem` |
| `.mild-mr-32` | `margin-right: 8rem` |
| `.mild-mb-32` | `margin-bottom: 8rem` |
| `.mild-ml-32` | `margin-left: 8rem` |
| `.mild-mx-36` | `margin-left: 9rem; margin-right: 9rem` |
| `.mild-my-36` | `margin-top: 9rem; margin-bottom: 9rem` |
| `.mild-mt-36` | `margin-top: 9rem` |
| `.mild-mr-36` | `margin-right: 9rem` |
| `.mild-mb-36` | `margin-bottom: 9rem` |
| `.mild-ml-36` | `margin-left: 9rem` |
| `.mild-mx-40` | `margin-left: 10rem; margin-right: 10rem` |
| `.mild-my-40` | `margin-top: 10rem; margin-bottom: 10rem` |
| `.mild-mt-40` | `margin-top: 10rem` |
| `.mild-mr-40` | `margin-right: 10rem` |
| `.mild-mb-40` | `margin-bottom: 10rem` |
| `.mild-ml-40` | `margin-left: 10rem` |
| `.mild-mx-44` | `margin-left: 11rem; margin-right: 11rem` |
| `.mild-my-44` | `margin-top: 11rem; margin-bottom: 11rem` |
| `.mild-mt-44` | `margin-top: 11rem` |
| `.mild-mr-44` | `margin-right: 11rem` |
| `.mild-mb-44` | `margin-bottom: 11rem` |
| `.mild-ml-44` | `margin-left: 11rem` |
| `.mild-mx-48` | `margin-left: 12rem; margin-right: 12rem` |
| `.mild-my-48` | `margin-top: 12rem; margin-bottom: 12rem` |
| `.mild-mt-48` | `margin-top: 12rem` |
| `.mild-mr-48` | `margin-right: 12rem` |
| `.mild-mb-48` | `margin-bottom: 12rem` |
| `.mild-ml-48` | `margin-left: 12rem` |
| `.mild-mx-52` | `margin-left: 13rem; margin-right: 13rem` |
| `.mild-my-52` | `margin-top: 13rem; margin-bottom: 13rem` |
| `.mild-mt-52` | `margin-top: 13rem` |
| `.mild-mr-52` | `margin-right: 13rem` |
| `.mild-mb-52` | `margin-bottom: 13rem` |
| `.mild-ml-52` | `margin-left: 13rem` |
| `.mild-mx-56` | `margin-left: 14rem; margin-right: 14rem` |
| `.mild-my-56` | `margin-top: 14rem; margin-bottom: 14rem` |
| `.mild-mt-56` | `margin-top: 14rem` |
| `.mild-mr-56` | `margin-right: 14rem` |
| `.mild-mb-56` | `margin-bottom: 14rem` |
| `.mild-ml-56` | `margin-left: 14rem` |
| `.mild-mx-60` | `margin-left: 15rem; margin-right: 15rem` |
| `.mild-my-60` | `margin-top: 15rem; margin-bottom: 15rem` |
| `.mild-mt-60` | `margin-top: 15rem` |
| `.mild-mr-60` | `margin-right: 15rem` |
| `.mild-mb-60` | `margin-bottom: 15rem` |
| `.mild-ml-60` | `margin-left: 15rem` |
| `.mild-mx-64` | `margin-left: 16rem; margin-right: 16rem` |
| `.mild-my-64` | `margin-top: 16rem; margin-bottom: 16rem` |
| `.mild-mt-64` | `margin-top: 16rem` |
| `.mild-mr-64` | `margin-right: 16rem` |
| `.mild-mb-64` | `margin-bottom: 16rem` |
| `.mild-ml-64` | `margin-left: 16rem` |
| `.mild-mx-72` | `margin-left: 18rem; margin-right: 18rem` |
| `.mild-my-72` | `margin-top: 18rem; margin-bottom: 18rem` |
| `.mild-mt-72` | `margin-top: 18rem` |
| `.mild-mr-72` | `margin-right: 18rem` |
| `.mild-mb-72` | `margin-bottom: 18rem` |
| `.mild-ml-72` | `margin-left: 18rem` |
| `.mild-mx-80` | `margin-left: 20rem; margin-right: 20rem` |
| `.mild-my-80` | `margin-top: 20rem; margin-bottom: 20rem` |
| `.mild-mt-80` | `margin-top: 20rem` |
| `.mild-mr-80` | `margin-right: 20rem` |
| `.mild-mb-80` | `margin-bottom: 20rem` |
| `.mild-ml-80` | `margin-left: 20rem` |
| `.mild-mx-96` | `margin-left: 24rem; margin-right: 24rem` |
| `.mild-my-96` | `margin-top: 24rem; margin-bottom: 24rem` |
| `.mild-mt-96` | `margin-top: 24rem` |
| `.mild-mr-96` | `margin-right: 24rem` |
| `.mild-mb-96` | `margin-bottom: 24rem` |
| `.mild-ml-96` | `margin-left: 24rem` |
| `.mild-px-0` | `padding-left: 0px; padding-right: 0px` |
| `.mild-py-0` | `padding-top: 0px; padding-bottom: 0px` |
| `.mild-pt-0` | `padding-top: 0px` |
| `.mild-pr-0` | `padding-right: 0px` |
| `.mild-pb-0` | `padding-bottom: 0px` |
| `.mild-pl-0` | `padding-left: 0px` |
| `.mild-px-px` | `padding-left: 1px; padding-right: 1px` |
| `.mild-py-px` | `padding-top: 1px; padding-bottom: 1px` |
| `.mild-pt-px` | `padding-top: 1px` |
| `.mild-pr-px` | `padding-right: 1px` |
| `.mild-pb-px` | `padding-bottom: 1px` |
| `.mild-pl-px` | `padding-left: 1px` |
| `.mild-px-0-5` | `padding-left: 0.125rem; padding-right: 0.125rem` |
| `.mild-py-0-5` | `padding-top: 0.125rem; padding-bottom: 0.125rem` |
| `.mild-pt-0-5` | `padding-top: 0.125rem` |
| `.mild-pr-0-5` | `padding-right: 0.125rem` |
| `.mild-pb-0-5` | `padding-bottom: 0.125rem` |
| `.mild-pl-0-5` | `padding-left: 0.125rem` |
| `.mild-px-1` | `padding-left: 0.25rem; padding-right: 0.25rem` |
| `.mild-py-1` | `padding-top: 0.25rem; padding-bottom: 0.25rem` |
| `.mild-pt-1` | `padding-top: 0.25rem` |
| `.mild-pr-1` | `padding-right: 0.25rem` |
| `.mild-pb-1` | `padding-bottom: 0.25rem` |
| `.mild-pl-1` | `padding-left: 0.25rem` |
| `.mild-px-1-5` | `padding-left: 0.375rem; padding-right: 0.375rem` |
| `.mild-py-1-5` | `padding-top: 0.375rem; padding-bottom: 0.375rem` |
| `.mild-pt-1-5` | `padding-top: 0.375rem` |
| `.mild-pr-1-5` | `padding-right: 0.375rem` |
| `.mild-pb-1-5` | `padding-bottom: 0.375rem` |
| `.mild-pl-1-5` | `padding-left: 0.375rem` |
| `.mild-px-2` | `padding-left: 0.5rem; padding-right: 0.5rem` |
| `.mild-py-2` | `padding-top: 0.5rem; padding-bottom: 0.5rem` |
| `.mild-pt-2` | `padding-top: 0.5rem` |
| `.mild-pr-2` | `padding-right: 0.5rem` |
| `.mild-pb-2` | `padding-bottom: 0.5rem` |
| `.mild-pl-2` | `padding-left: 0.5rem` |
| `.mild-px-2-5` | `padding-left: 0.625rem; padding-right: 0.625rem` |
| `.mild-py-2-5` | `padding-top: 0.625rem; padding-bottom: 0.625rem` |
| `.mild-pt-2-5` | `padding-top: 0.625rem` |
| `.mild-pr-2-5` | `padding-right: 0.625rem` |
| `.mild-pb-2-5` | `padding-bottom: 0.625rem` |
| `.mild-pl-2-5` | `padding-left: 0.625rem` |
| `.mild-px-3` | `padding-left: 0.75rem; padding-right: 0.75rem` |
| `.mild-py-3` | `padding-top: 0.75rem; padding-bottom: 0.75rem` |
| `.mild-pt-3` | `padding-top: 0.75rem` |
| `.mild-pr-3` | `padding-right: 0.75rem` |
| `.mild-pb-3` | `padding-bottom: 0.75rem` |
| `.mild-pl-3` | `padding-left: 0.75rem` |
| `.mild-px-3-5` | `padding-left: 0.875rem; padding-right: 0.875rem` |
| `.mild-py-3-5` | `padding-top: 0.875rem; padding-bottom: 0.875rem` |
| `.mild-pt-3-5` | `padding-top: 0.875rem` |
| `.mild-pr-3-5` | `padding-right: 0.875rem` |
| `.mild-pb-3-5` | `padding-bottom: 0.875rem` |
| `.mild-pl-3-5` | `padding-left: 0.875rem` |
| `.mild-px-4` | `padding-left: 1rem; padding-right: 1rem` |
| `.mild-py-4` | `padding-top: 1rem; padding-bottom: 1rem` |
| `.mild-pt-4` | `padding-top: 1rem` |
| `.mild-pr-4` | `padding-right: 1rem` |
| `.mild-pb-4` | `padding-bottom: 1rem` |
| `.mild-pl-4` | `padding-left: 1rem` |
| `.mild-px-5` | `padding-left: 1.25rem; padding-right: 1.25rem` |
| `.mild-py-5` | `padding-top: 1.25rem; padding-bottom: 1.25rem` |
| `.mild-pt-5` | `padding-top: 1.25rem` |
| `.mild-pr-5` | `padding-right: 1.25rem` |
| `.mild-pb-5` | `padding-bottom: 1.25rem` |
| `.mild-pl-5` | `padding-left: 1.25rem` |
| `.mild-px-6` | `padding-left: 1.5rem; padding-right: 1.5rem` |
| `.mild-py-6` | `padding-top: 1.5rem; padding-bottom: 1.5rem` |
| `.mild-pt-6` | `padding-top: 1.5rem` |
| `.mild-pr-6` | `padding-right: 1.5rem` |
| `.mild-pb-6` | `padding-bottom: 1.5rem` |
| `.mild-pl-6` | `padding-left: 1.5rem` |
| `.mild-px-7` | `padding-left: 1.75rem; padding-right: 1.75rem` |
| `.mild-py-7` | `padding-top: 1.75rem; padding-bottom: 1.75rem` |
| `.mild-pt-7` | `padding-top: 1.75rem` |
| `.mild-pr-7` | `padding-right: 1.75rem` |
| `.mild-pb-7` | `padding-bottom: 1.75rem` |
| `.mild-pl-7` | `padding-left: 1.75rem` |
| `.mild-px-8` | `padding-left: 2rem; padding-right: 2rem` |
| `.mild-py-8` | `padding-top: 2rem; padding-bottom: 2rem` |
| `.mild-pt-8` | `padding-top: 2rem` |
| `.mild-pr-8` | `padding-right: 2rem` |
| `.mild-pb-8` | `padding-bottom: 2rem` |
| `.mild-pl-8` | `padding-left: 2rem` |
| `.mild-px-9` | `padding-left: 2.25rem; padding-right: 2.25rem` |
| `.mild-py-9` | `padding-top: 2.25rem; padding-bottom: 2.25rem` |
| `.mild-pt-9` | `padding-top: 2.25rem` |
| `.mild-pr-9` | `padding-right: 2.25rem` |
| `.mild-pb-9` | `padding-bottom: 2.25rem` |
| `.mild-pl-9` | `padding-left: 2.25rem` |
| `.mild-px-10` | `padding-left: 2.5rem; padding-right: 2.5rem` |
| `.mild-py-10` | `padding-top: 2.5rem; padding-bottom: 2.5rem` |
| `.mild-pt-10` | `padding-top: 2.5rem` |
| `.mild-pr-10` | `padding-right: 2.5rem` |
| `.mild-pb-10` | `padding-bottom: 2.5rem` |
| `.mild-pl-10` | `padding-left: 2.5rem` |
| `.mild-px-11` | `padding-left: 2.75rem; padding-right: 2.75rem` |
| `.mild-py-11` | `padding-top: 2.75rem; padding-bottom: 2.75rem` |
| `.mild-pt-11` | `padding-top: 2.75rem` |
| `.mild-pr-11` | `padding-right: 2.75rem` |
| `.mild-pb-11` | `padding-bottom: 2.75rem` |
| `.mild-pl-11` | `padding-left: 2.75rem` |
| `.mild-px-12` | `padding-left: 3rem; padding-right: 3rem` |
| `.mild-py-12` | `padding-top: 3rem; padding-bottom: 3rem` |
| `.mild-pt-12` | `padding-top: 3rem` |
| `.mild-pr-12` | `padding-right: 3rem` |
| `.mild-pb-12` | `padding-bottom: 3rem` |
| `.mild-pl-12` | `padding-left: 3rem` |
| `.mild-px-14` | `padding-left: 3.5rem; padding-right: 3.5rem` |
| `.mild-py-14` | `padding-top: 3.5rem; padding-bottom: 3.5rem` |
| `.mild-pt-14` | `padding-top: 3.5rem` |
| `.mild-pr-14` | `padding-right: 3.5rem` |
| `.mild-pb-14` | `padding-bottom: 3.5rem` |
| `.mild-pl-14` | `padding-left: 3.5rem` |
| `.mild-px-16` | `padding-left: 4rem; padding-right: 4rem` |
| `.mild-py-16` | `padding-top: 4rem; padding-bottom: 4rem` |
| `.mild-pt-16` | `padding-top: 4rem` |
| `.mild-pr-16` | `padding-right: 4rem` |
| `.mild-pb-16` | `padding-bottom: 4rem` |
| `.mild-pl-16` | `padding-left: 4rem` |
| `.mild-px-20` | `padding-left: 5rem; padding-right: 5rem` |
| `.mild-py-20` | `padding-top: 5rem; padding-bottom: 5rem` |
| `.mild-pt-20` | `padding-top: 5rem` |
| `.mild-pr-20` | `padding-right: 5rem` |
| `.mild-pb-20` | `padding-bottom: 5rem` |
| `.mild-pl-20` | `padding-left: 5rem` |
| `.mild-px-24` | `padding-left: 6rem; padding-right: 6rem` |
| `.mild-py-24` | `padding-top: 6rem; padding-bottom: 6rem` |
| `.mild-pt-24` | `padding-top: 6rem` |
| `.mild-pr-24` | `padding-right: 6rem` |
| `.mild-pb-24` | `padding-bottom: 6rem` |
| `.mild-pl-24` | `padding-left: 6rem` |
| `.mild-px-28` | `padding-left: 7rem; padding-right: 7rem` |
| `.mild-py-28` | `padding-top: 7rem; padding-bottom: 7rem` |
| `.mild-pt-28` | `padding-top: 7rem` |
| `.mild-pr-28` | `padding-right: 7rem` |
| `.mild-pb-28` | `padding-bottom: 7rem` |
| `.mild-pl-28` | `padding-left: 7rem` |
| `.mild-px-32` | `padding-left: 8rem; padding-right: 8rem` |
| `.mild-py-32` | `padding-top: 8rem; padding-bottom: 8rem` |
| `.mild-pt-32` | `padding-top: 8rem` |
| `.mild-pr-32` | `padding-right: 8rem` |
| `.mild-pb-32` | `padding-bottom: 8rem` |
| `.mild-pl-32` | `padding-left: 8rem` |
| `.mild-px-36` | `padding-left: 9rem; padding-right: 9rem` |
| `.mild-py-36` | `padding-top: 9rem; padding-bottom: 9rem` |
| `.mild-pt-36` | `padding-top: 9rem` |
| `.mild-pr-36` | `padding-right: 9rem` |
| `.mild-pb-36` | `padding-bottom: 9rem` |
| `.mild-pl-36` | `padding-left: 9rem` |
| `.mild-px-40` | `padding-left: 10rem; padding-right: 10rem` |
| `.mild-py-40` | `padding-top: 10rem; padding-bottom: 10rem` |
| `.mild-pt-40` | `padding-top: 10rem` |
| `.mild-pr-40` | `padding-right: 10rem` |
| `.mild-pb-40` | `padding-bottom: 10rem` |
| `.mild-pl-40` | `padding-left: 10rem` |
| `.mild-px-44` | `padding-left: 11rem; padding-right: 11rem` |
| `.mild-py-44` | `padding-top: 11rem; padding-bottom: 11rem` |
| `.mild-pt-44` | `padding-top: 11rem` |
| `.mild-pr-44` | `padding-right: 11rem` |
| `.mild-pb-44` | `padding-bottom: 11rem` |
| `.mild-pl-44` | `padding-left: 11rem` |
| `.mild-px-48` | `padding-left: 12rem; padding-right: 12rem` |
| `.mild-py-48` | `padding-top: 12rem; padding-bottom: 12rem` |
| `.mild-pt-48` | `padding-top: 12rem` |
| `.mild-pr-48` | `padding-right: 12rem` |
| `.mild-pb-48` | `padding-bottom: 12rem` |
| `.mild-pl-48` | `padding-left: 12rem` |
| `.mild-px-52` | `padding-left: 13rem; padding-right: 13rem` |
| `.mild-py-52` | `padding-top: 13rem; padding-bottom: 13rem` |
| `.mild-pt-52` | `padding-top: 13rem` |
| `.mild-pr-52` | `padding-right: 13rem` |
| `.mild-pb-52` | `padding-bottom: 13rem` |
| `.mild-pl-52` | `padding-left: 13rem` |
| `.mild-px-56` | `padding-left: 14rem; padding-right: 14rem` |
| `.mild-py-56` | `padding-top: 14rem; padding-bottom: 14rem` |
| `.mild-pt-56` | `padding-top: 14rem` |
| `.mild-pr-56` | `padding-right: 14rem` |
| `.mild-pb-56` | `padding-bottom: 14rem` |
| `.mild-pl-56` | `padding-left: 14rem` |
| `.mild-px-60` | `padding-left: 15rem; padding-right: 15rem` |
| `.mild-py-60` | `padding-top: 15rem; padding-bottom: 15rem` |
| `.mild-pt-60` | `padding-top: 15rem` |
| `.mild-pr-60` | `padding-right: 15rem` |
| `.mild-pb-60` | `padding-bottom: 15rem` |
| `.mild-pl-60` | `padding-left: 15rem` |
| `.mild-px-64` | `padding-left: 16rem; padding-right: 16rem` |
| `.mild-py-64` | `padding-top: 16rem; padding-bottom: 16rem` |
| `.mild-pt-64` | `padding-top: 16rem` |
| `.mild-pr-64` | `padding-right: 16rem` |
| `.mild-pb-64` | `padding-bottom: 16rem` |
| `.mild-pl-64` | `padding-left: 16rem` |
| `.mild-px-72` | `padding-left: 18rem; padding-right: 18rem` |
| `.mild-py-72` | `padding-top: 18rem; padding-bottom: 18rem` |
| `.mild-pt-72` | `padding-top: 18rem` |
| `.mild-pr-72` | `padding-right: 18rem` |
| `.mild-pb-72` | `padding-bottom: 18rem` |
| `.mild-pl-72` | `padding-left: 18rem` |
| `.mild-px-80` | `padding-left: 20rem; padding-right: 20rem` |
| `.mild-py-80` | `padding-top: 20rem; padding-bottom: 20rem` |
| `.mild-pt-80` | `padding-top: 20rem` |
| `.mild-pr-80` | `padding-right: 20rem` |
| `.mild-pb-80` | `padding-bottom: 20rem` |
| `.mild-pl-80` | `padding-left: 20rem` |
| `.mild-px-96` | `padding-left: 24rem; padding-right: 24rem` |
| `.mild-py-96` | `padding-top: 24rem; padding-bottom: 24rem` |
| `.mild-pt-96` | `padding-top: 24rem` |
| `.mild-pr-96` | `padding-right: 24rem` |
| `.mild-pb-96` | `padding-bottom: 24rem` |
| `.mild-pl-96` | `padding-left: 24rem` |
| `.mild-fill-current` | `fill: currentColor` |
| `.mild-visible` | `visibility: visible` |
| `.mild-invisible` | `visibility: hidden` |
| `.mild-outline-none` | `outline: none` |
| `.mild-outline` | `outline: 2px solid transparent; outline-offset: 2px` |
| `.mild-outline-dashed` | `outline: 2px dashed transparent; outline-offset: 2px` |
| `.mild-outline-dotted` | `outline: 2px dotted transparent; outline-offset: 2px` |
| `.mild-container` | `max-width: 1536px` |

## Spacing

Margin, padding, and gap utilities

| Class | CSS Properties |
|-------|----------------|
| `.mild-m-0` | `margin: 0px` |
| `.mild-m-px` | `margin: 1px` |
| `.mild-m-0-5` | `margin: 0.125rem` |
| `.mild-m-1` | `margin: 0.25rem` |
| `.mild-m-1-5` | `margin: 0.375rem` |
| `.mild-m-2` | `margin: 0.5rem` |
| `.mild-m-2-5` | `margin: 0.625rem` |
| `.mild-m-3` | `margin: 0.75rem` |
| `.mild-m-3-5` | `margin: 0.875rem` |
| `.mild-m-4` | `margin: 1rem` |
| `.mild-m-5` | `margin: 1.25rem` |
| `.mild-m-6` | `margin: 1.5rem` |
| `.mild-m-7` | `margin: 1.75rem` |
| `.mild-m-8` | `margin: 2rem` |
| `.mild-m-9` | `margin: 2.25rem` |
| `.mild-m-10` | `margin: 2.5rem` |
| `.mild-m-11` | `margin: 2.75rem` |
| `.mild-m-12` | `margin: 3rem` |
| `.mild-m-14` | `margin: 3.5rem` |
| `.mild-m-16` | `margin: 4rem` |
| `.mild-m-20` | `margin: 5rem` |
| `.mild-m-24` | `margin: 6rem` |
| `.mild-m-28` | `margin: 7rem` |
| `.mild-m-32` | `margin: 8rem` |
| `.mild-m-36` | `margin: 9rem` |
| `.mild-m-40` | `margin: 10rem` |
| `.mild-m-44` | `margin: 11rem` |
| `.mild-m-48` | `margin: 12rem` |
| `.mild-m-52` | `margin: 13rem` |
| `.mild-m-56` | `margin: 14rem` |
| `.mild-m-60` | `margin: 15rem` |
| `.mild-m-64` | `margin: 16rem` |
| `.mild-m-72` | `margin: 18rem` |
| `.mild-m-80` | `margin: 20rem` |
| `.mild-m-96` | `margin: 24rem` |
| `.mild-p-0` | `padding: 0px` |
| `.mild-p-px` | `padding: 1px` |
| `.mild-p-0-5` | `padding: 0.125rem` |
| `.mild-p-1` | `padding: 0.25rem` |
| `.mild-p-1-5` | `padding: 0.375rem` |
| `.mild-p-2` | `padding: 0.5rem` |
| `.mild-p-2-5` | `padding: 0.625rem` |
| `.mild-p-3` | `padding: 0.75rem` |
| `.mild-p-3-5` | `padding: 0.875rem` |
| `.mild-p-4` | `padding: 1rem` |
| `.mild-p-5` | `padding: 1.25rem` |
| `.mild-p-6` | `padding: 1.5rem` |
| `.mild-p-7` | `padding: 1.75rem` |
| `.mild-p-8` | `padding: 2rem` |
| `.mild-p-9` | `padding: 2.25rem` |
| `.mild-p-10` | `padding: 2.5rem` |
| `.mild-p-11` | `padding: 2.75rem` |
| `.mild-p-12` | `padding: 3rem` |
| `.mild-p-14` | `padding: 3.5rem` |
| `.mild-p-16` | `padding: 4rem` |
| `.mild-p-20` | `padding: 5rem` |
| `.mild-p-24` | `padding: 6rem` |
| `.mild-p-28` | `padding: 7rem` |
| `.mild-p-32` | `padding: 8rem` |
| `.mild-p-36` | `padding: 9rem` |
| `.mild-p-40` | `padding: 10rem` |
| `.mild-p-44` | `padding: 11rem` |
| `.mild-p-48` | `padding: 12rem` |
| `.mild-p-52` | `padding: 13rem` |
| `.mild-p-56` | `padding: 14rem` |
| `.mild-p-60` | `padding: 15rem` |
| `.mild-p-64` | `padding: 16rem` |
| `.mild-p-72` | `padding: 18rem` |
| `.mild-p-80` | `padding: 20rem` |
| `.mild-p-96` | `padding: 24rem` |
| `.mild-gap-0` | `gap: 0px` |
| `.mild-gap-x-0` | `column-gap: 0px` |
| `.mild-gap-y-0` | `row-gap: 0px` |
| `.mild-gap-px` | `gap: 1px` |
| `.mild-gap-x-px` | `column-gap: 1px` |
| `.mild-gap-y-px` | `row-gap: 1px` |
| `.mild-gap-0-5` | `gap: 0.125rem` |
| `.mild-gap-x-0-5` | `column-gap: 0.125rem` |
| `.mild-gap-y-0-5` | `row-gap: 0.125rem` |
| `.mild-gap-1` | `gap: 0.25rem` |
| `.mild-gap-x-1` | `column-gap: 0.25rem` |
| `.mild-gap-y-1` | `row-gap: 0.25rem` |
| `.mild-gap-1-5` | `gap: 0.375rem` |
| `.mild-gap-x-1-5` | `column-gap: 0.375rem` |
| `.mild-gap-y-1-5` | `row-gap: 0.375rem` |
| `.mild-gap-2` | `gap: 0.5rem` |
| `.mild-gap-x-2` | `column-gap: 0.5rem` |
| `.mild-gap-y-2` | `row-gap: 0.5rem` |
| `.mild-gap-2-5` | `gap: 0.625rem` |
| `.mild-gap-x-2-5` | `column-gap: 0.625rem` |
| `.mild-gap-y-2-5` | `row-gap: 0.625rem` |
| `.mild-gap-3` | `gap: 0.75rem` |
| `.mild-gap-x-3` | `column-gap: 0.75rem` |
| `.mild-gap-y-3` | `row-gap: 0.75rem` |
| `.mild-gap-3-5` | `gap: 0.875rem` |
| `.mild-gap-x-3-5` | `column-gap: 0.875rem` |
| `.mild-gap-y-3-5` | `row-gap: 0.875rem` |
| `.mild-gap-4` | `gap: 1rem` |
| `.mild-gap-x-4` | `column-gap: 1rem` |
| `.mild-gap-y-4` | `row-gap: 1rem` |
| `.mild-gap-5` | `gap: 1.25rem` |
| `.mild-gap-x-5` | `column-gap: 1.25rem` |
| `.mild-gap-y-5` | `row-gap: 1.25rem` |
| `.mild-gap-6` | `gap: 1.5rem` |
| `.mild-gap-x-6` | `column-gap: 1.5rem` |
| `.mild-gap-y-6` | `row-gap: 1.5rem` |
| `.mild-gap-7` | `gap: 1.75rem` |
| `.mild-gap-x-7` | `column-gap: 1.75rem` |
| `.mild-gap-y-7` | `row-gap: 1.75rem` |
| `.mild-gap-8` | `gap: 2rem` |
| `.mild-gap-x-8` | `column-gap: 2rem` |
| `.mild-gap-y-8` | `row-gap: 2rem` |
| `.mild-gap-9` | `gap: 2.25rem` |
| `.mild-gap-x-9` | `column-gap: 2.25rem` |
| `.mild-gap-y-9` | `row-gap: 2.25rem` |
| `.mild-gap-10` | `gap: 2.5rem` |
| `.mild-gap-x-10` | `column-gap: 2.5rem` |
| `.mild-gap-y-10` | `row-gap: 2.5rem` |
| `.mild-gap-11` | `gap: 2.75rem` |
| `.mild-gap-x-11` | `column-gap: 2.75rem` |
| `.mild-gap-y-11` | `row-gap: 2.75rem` |
| `.mild-gap-12` | `gap: 3rem` |
| `.mild-gap-x-12` | `column-gap: 3rem` |
| `.mild-gap-y-12` | `row-gap: 3rem` |
| `.mild-gap-14` | `gap: 3.5rem` |
| `.mild-gap-x-14` | `column-gap: 3.5rem` |
| `.mild-gap-y-14` | `row-gap: 3.5rem` |
| `.mild-gap-16` | `gap: 4rem` |
| `.mild-gap-x-16` | `column-gap: 4rem` |
| `.mild-gap-y-16` | `row-gap: 4rem` |
| `.mild-gap-20` | `gap: 5rem` |
| `.mild-gap-x-20` | `column-gap: 5rem` |
| `.mild-gap-y-20` | `row-gap: 5rem` |
| `.mild-gap-24` | `gap: 6rem` |
| `.mild-gap-x-24` | `column-gap: 6rem` |
| `.mild-gap-y-24` | `row-gap: 6rem` |
| `.mild-gap-28` | `gap: 7rem` |
| `.mild-gap-x-28` | `column-gap: 7rem` |
| `.mild-gap-y-28` | `row-gap: 7rem` |
| `.mild-gap-32` | `gap: 8rem` |
| `.mild-gap-x-32` | `column-gap: 8rem` |
| `.mild-gap-y-32` | `row-gap: 8rem` |
| `.mild-gap-36` | `gap: 9rem` |
| `.mild-gap-x-36` | `column-gap: 9rem` |
| `.mild-gap-y-36` | `row-gap: 9rem` |
| `.mild-gap-40` | `gap: 10rem` |
| `.mild-gap-x-40` | `column-gap: 10rem` |
| `.mild-gap-y-40` | `row-gap: 10rem` |
| `.mild-gap-44` | `gap: 11rem` |
| `.mild-gap-x-44` | `column-gap: 11rem` |
| `.mild-gap-y-44` | `row-gap: 11rem` |
| `.mild-gap-48` | `gap: 12rem` |
| `.mild-gap-x-48` | `column-gap: 12rem` |
| `.mild-gap-y-48` | `row-gap: 12rem` |
| `.mild-gap-52` | `gap: 13rem` |
| `.mild-gap-x-52` | `column-gap: 13rem` |
| `.mild-gap-y-52` | `row-gap: 13rem` |
| `.mild-gap-56` | `gap: 14rem` |
| `.mild-gap-x-56` | `column-gap: 14rem` |
| `.mild-gap-y-56` | `row-gap: 14rem` |
| `.mild-gap-60` | `gap: 15rem` |
| `.mild-gap-x-60` | `column-gap: 15rem` |
| `.mild-gap-y-60` | `row-gap: 15rem` |
| `.mild-gap-64` | `gap: 16rem` |
| `.mild-gap-x-64` | `column-gap: 16rem` |
| `.mild-gap-y-64` | `row-gap: 16rem` |
| `.mild-gap-72` | `gap: 18rem` |
| `.mild-gap-x-72` | `column-gap: 18rem` |
| `.mild-gap-y-72` | `row-gap: 18rem` |
| `.mild-gap-80` | `gap: 20rem` |
| `.mild-gap-x-80` | `column-gap: 20rem` |
| `.mild-gap-y-80` | `row-gap: 20rem` |
| `.mild-gap-96` | `gap: 24rem` |
| `.mild-gap-x-96` | `column-gap: 24rem` |
| `.mild-gap-y-96` | `row-gap: 24rem` |

## Typography

Font size, weight, and text utilities

| Class | CSS Properties |
|-------|----------------|
| `.mild-text-xs` | `font-size: 0.75rem` |
| `.mild-text-sm` | `font-size: 0.875rem` |
| `.mild-text-base` | `font-size: 1rem` |
| `.mild-text-lg` | `font-size: 1.125rem` |
| `.mild-text-xl` | `font-size: 1.25rem` |
| `.mild-text-2xl` | `font-size: 1.5rem` |
| `.mild-text-3xl` | `font-size: 1.875rem` |
| `.mild-text-4xl` | `font-size: 2.25rem` |
| `.mild-text-5xl` | `font-size: 3rem` |
| `.mild-text-6xl` | `font-size: 3.75rem` |
| `.mild-text-7xl` | `font-size: 4.5rem` |
| `.mild-text-8xl` | `font-size: 6rem` |
| `.mild-text-9xl` | `font-size: 8rem` |
| `.mild-font-thin` | `font-weight: 100` |
| `.mild-font-extralight` | `font-weight: 200` |
| `.mild-font-light` | `font-weight: 300` |
| `.mild-font-normal` | `font-weight: 400` |
| `.mild-font-medium` | `font-weight: 500` |
| `.mild-font-semibold` | `font-weight: 600` |
| `.mild-font-bold` | `font-weight: 700` |
| `.mild-font-extrabold` | `font-weight: 800` |
| `.mild-font-black` | `font-weight: 900` |
| `.mild-font-sans` | `font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji` |
| `.mild-font-serif` | `font-family: Georgia, Cambria, Times New Roman, Times, serif` |
| `.mild-font-mono` | `font-family: JetBrains Mono, SF Mono, Monaco, Inconsolata, Roboto Mono, source-code-pro, Menlo, Consolas, DejaVu Sans Mono, monospace` |
| `.mild-text-left` | `text-align: left` |
| `.mild-text-center` | `text-align: center` |
| `.mild-text-right` | `text-align: right` |
| `.mild-text-justify` | `text-align: justify` |
| `.mild-text-uppercase` | `text-transform: uppercase` |
| `.mild-text-lowercase` | `text-transform: lowercase` |
| `.mild-text-capitalize` | `text-transform: capitalize` |
| `.mild-text-underline` | `text-decoration: underline` |
| `.mild-text-line-through` | `text-decoration: line-through` |
| `.mild-text-no-underline` | `text-decoration: none` |
| `.mild-leading-none` | `line-height: 1` |
| `.mild-leading-tight` | `line-height: 1.25` |
| `.mild-leading-snug` | `line-height: 1.375` |
| `.mild-leading-normal` | `line-height: 1.5` |
| `.mild-leading-relaxed` | `line-height: 1.625` |
| `.mild-leading-loose` | `line-height: 2` |
| `.mild-tracking-tighter` | `letter-spacing: -0.05em` |
| `.mild-tracking-tight` | `letter-spacing: -0.025em` |
| `.mild-tracking-normal` | `letter-spacing: 0em` |
| `.mild-tracking-wide` | `letter-spacing: 0.025em` |
| `.mild-tracking-wider` | `letter-spacing: 0.05em` |
| `.mild-tracking-widest` | `letter-spacing: 0.1em` |
| `.mild-text-blue-50` | `color: var(--mild-color-blue-50)` |
| `.mild-text-blue-100` | `color: var(--mild-color-blue-100)` |
| `.mild-text-blue-200` | `color: var(--mild-color-blue-200)` |
| `.mild-text-blue-300` | `color: var(--mild-color-blue-300)` |
| `.mild-text-blue-400` | `color: var(--mild-color-blue-400)` |
| `.mild-text-blue-500` | `color: var(--mild-color-blue-500)` |
| `.mild-text-blue-600` | `color: var(--mild-color-blue-600)` |
| `.mild-text-blue-700` | `color: var(--mild-color-blue-700)` |
| `.mild-text-blue-800` | `color: var(--mild-color-blue-800)` |
| `.mild-text-blue-900` | `color: var(--mild-color-blue-900)` |
| `.mild-text-blue-950` | `color: var(--mild-color-blue-950)` |
| `.mild-text-gray-50` | `color: var(--mild-color-gray-50)` |
| `.mild-text-gray-100` | `color: var(--mild-color-gray-100)` |
| `.mild-text-gray-200` | `color: var(--mild-color-gray-200)` |
| `.mild-text-gray-300` | `color: var(--mild-color-gray-300)` |
| `.mild-text-gray-400` | `color: var(--mild-color-gray-400)` |
| `.mild-text-gray-500` | `color: var(--mild-color-gray-500)` |
| `.mild-text-gray-600` | `color: var(--mild-color-gray-600)` |
| `.mild-text-gray-700` | `color: var(--mild-color-gray-700)` |
| `.mild-text-gray-800` | `color: var(--mild-color-gray-800)` |
| `.mild-text-gray-900` | `color: var(--mild-color-gray-900)` |
| `.mild-text-gray-950` | `color: var(--mild-color-gray-950)` |
| `.mild-text-red-50` | `color: var(--mild-color-red-50)` |
| `.mild-text-red-100` | `color: var(--mild-color-red-100)` |
| `.mild-text-red-200` | `color: var(--mild-color-red-200)` |
| `.mild-text-red-300` | `color: var(--mild-color-red-300)` |
| `.mild-text-red-400` | `color: var(--mild-color-red-400)` |
| `.mild-text-red-500` | `color: var(--mild-color-red-500)` |
| `.mild-text-red-600` | `color: var(--mild-color-red-600)` |
| `.mild-text-red-700` | `color: var(--mild-color-red-700)` |
| `.mild-text-red-800` | `color: var(--mild-color-red-800)` |
| `.mild-text-red-900` | `color: var(--mild-color-red-900)` |
| `.mild-text-red-950` | `color: var(--mild-color-red-950)` |
| `.mild-text-green-50` | `color: var(--mild-color-green-50)` |
| `.mild-text-green-100` | `color: var(--mild-color-green-100)` |
| `.mild-text-green-200` | `color: var(--mild-color-green-200)` |
| `.mild-text-green-300` | `color: var(--mild-color-green-300)` |
| `.mild-text-green-400` | `color: var(--mild-color-green-400)` |
| `.mild-text-green-500` | `color: var(--mild-color-green-500)` |
| `.mild-text-green-600` | `color: var(--mild-color-green-600)` |
| `.mild-text-green-700` | `color: var(--mild-color-green-700)` |
| `.mild-text-green-800` | `color: var(--mild-color-green-800)` |
| `.mild-text-green-900` | `color: var(--mild-color-green-900)` |
| `.mild-text-green-950` | `color: var(--mild-color-green-950)` |
| `.mild-text-yellow-50` | `color: var(--mild-color-yellow-50)` |
| `.mild-text-yellow-100` | `color: var(--mild-color-yellow-100)` |
| `.mild-text-yellow-200` | `color: var(--mild-color-yellow-200)` |
| `.mild-text-yellow-300` | `color: var(--mild-color-yellow-300)` |
| `.mild-text-yellow-400` | `color: var(--mild-color-yellow-400)` |
| `.mild-text-yellow-500` | `color: var(--mild-color-yellow-500)` |
| `.mild-text-yellow-600` | `color: var(--mild-color-yellow-600)` |
| `.mild-text-yellow-700` | `color: var(--mild-color-yellow-700)` |
| `.mild-text-yellow-800` | `color: var(--mild-color-yellow-800)` |
| `.mild-text-yellow-900` | `color: var(--mild-color-yellow-900)` |
| `.mild-text-yellow-950` | `color: var(--mild-color-yellow-950)` |
| `.mild-text-primary-50` | `color: var(--mild-color-primary-50)` |
| `.mild-text-primary-100` | `color: var(--mild-color-primary-100)` |
| `.mild-text-primary-200` | `color: var(--mild-color-primary-200)` |
| `.mild-text-primary-300` | `color: var(--mild-color-primary-300)` |
| `.mild-text-primary-400` | `color: var(--mild-color-primary-400)` |
| `.mild-text-primary-500` | `color: var(--mild-color-primary-500)` |
| `.mild-text-primary-600` | `color: var(--mild-color-primary-600)` |
| `.mild-text-primary-700` | `color: var(--mild-color-primary-700)` |
| `.mild-text-primary-800` | `color: var(--mild-color-primary-800)` |
| `.mild-text-primary-900` | `color: var(--mild-color-primary-900)` |
| `.mild-text-primary-950` | `color: var(--mild-color-primary-950)` |
| `.mild-text-secondary-50` | `color: var(--mild-color-secondary-50)` |
| `.mild-text-secondary-100` | `color: var(--mild-color-secondary-100)` |
| `.mild-text-secondary-200` | `color: var(--mild-color-secondary-200)` |
| `.mild-text-secondary-300` | `color: var(--mild-color-secondary-300)` |
| `.mild-text-secondary-400` | `color: var(--mild-color-secondary-400)` |
| `.mild-text-secondary-500` | `color: var(--mild-color-secondary-500)` |
| `.mild-text-secondary-600` | `color: var(--mild-color-secondary-600)` |
| `.mild-text-secondary-700` | `color: var(--mild-color-secondary-700)` |
| `.mild-text-secondary-800` | `color: var(--mild-color-secondary-800)` |
| `.mild-text-secondary-900` | `color: var(--mild-color-secondary-900)` |
| `.mild-text-secondary-950` | `color: var(--mild-color-secondary-950)` |
| `.mild-text-success-50` | `color: var(--mild-color-success-50)` |
| `.mild-text-success-100` | `color: var(--mild-color-success-100)` |
| `.mild-text-success-200` | `color: var(--mild-color-success-200)` |
| `.mild-text-success-300` | `color: var(--mild-color-success-300)` |
| `.mild-text-success-400` | `color: var(--mild-color-success-400)` |
| `.mild-text-success-500` | `color: var(--mild-color-success-500)` |
| `.mild-text-success-600` | `color: var(--mild-color-success-600)` |
| `.mild-text-success-700` | `color: var(--mild-color-success-700)` |
| `.mild-text-success-800` | `color: var(--mild-color-success-800)` |
| `.mild-text-success-900` | `color: var(--mild-color-success-900)` |
| `.mild-text-success-950` | `color: var(--mild-color-success-950)` |
| `.mild-text-warning-50` | `color: var(--mild-color-warning-50)` |
| `.mild-text-warning-100` | `color: var(--mild-color-warning-100)` |
| `.mild-text-warning-200` | `color: var(--mild-color-warning-200)` |
| `.mild-text-warning-300` | `color: var(--mild-color-warning-300)` |
| `.mild-text-warning-400` | `color: var(--mild-color-warning-400)` |
| `.mild-text-warning-500` | `color: var(--mild-color-warning-500)` |
| `.mild-text-warning-600` | `color: var(--mild-color-warning-600)` |
| `.mild-text-warning-700` | `color: var(--mild-color-warning-700)` |
| `.mild-text-warning-800` | `color: var(--mild-color-warning-800)` |
| `.mild-text-warning-900` | `color: var(--mild-color-warning-900)` |
| `.mild-text-warning-950` | `color: var(--mild-color-warning-950)` |
| `.mild-text-danger-50` | `color: var(--mild-color-danger-50)` |
| `.mild-text-danger-100` | `color: var(--mild-color-danger-100)` |
| `.mild-text-danger-200` | `color: var(--mild-color-danger-200)` |
| `.mild-text-danger-300` | `color: var(--mild-color-danger-300)` |
| `.mild-text-danger-400` | `color: var(--mild-color-danger-400)` |
| `.mild-text-danger-500` | `color: var(--mild-color-danger-500)` |
| `.mild-text-danger-600` | `color: var(--mild-color-danger-600)` |
| `.mild-text-danger-700` | `color: var(--mild-color-danger-700)` |
| `.mild-text-danger-800` | `color: var(--mild-color-danger-800)` |
| `.mild-text-danger-900` | `color: var(--mild-color-danger-900)` |
| `.mild-text-danger-950` | `color: var(--mild-color-danger-950)` |
| `.mild-text-error-50` | `color: var(--mild-color-error-50)` |
| `.mild-text-error-100` | `color: var(--mild-color-error-100)` |
| `.mild-text-error-200` | `color: var(--mild-color-error-200)` |
| `.mild-text-error-300` | `color: var(--mild-color-error-300)` |
| `.mild-text-error-400` | `color: var(--mild-color-error-400)` |
| `.mild-text-error-500` | `color: var(--mild-color-error-500)` |
| `.mild-text-error-600` | `color: var(--mild-color-error-600)` |
| `.mild-text-error-700` | `color: var(--mild-color-error-700)` |
| `.mild-text-error-800` | `color: var(--mild-color-error-800)` |
| `.mild-text-error-900` | `color: var(--mild-color-error-900)` |
| `.mild-text-error-950` | `color: var(--mild-color-error-950)` |
| `.mild-text-muted` | `color: var(--mild-muted-foreground)` |
| `.mild-text-emphasis` | `color: var(--mild-foreground)` |
| `.mild-text-current` | `color: currentColor` |

## Colors

Text, background, and border color utilities

| Class | CSS Properties |
|-------|----------------|
| `.mild-bg-blue-50` | `background-color: var(--mild-color-blue-50)` |
| `.mild-bg-blue-100` | `background-color: var(--mild-color-blue-100)` |
| `.mild-bg-blue-200` | `background-color: var(--mild-color-blue-200)` |
| `.mild-bg-blue-300` | `background-color: var(--mild-color-blue-300)` |
| `.mild-bg-blue-400` | `background-color: var(--mild-color-blue-400)` |
| `.mild-bg-blue-500` | `background-color: var(--mild-color-blue-500)` |
| `.mild-bg-blue-600` | `background-color: var(--mild-color-blue-600)` |
| `.mild-bg-blue-700` | `background-color: var(--mild-color-blue-700)` |
| `.mild-bg-blue-800` | `background-color: var(--mild-color-blue-800)` |
| `.mild-bg-blue-900` | `background-color: var(--mild-color-blue-900)` |
| `.mild-bg-blue-950` | `background-color: var(--mild-color-blue-950)` |
| `.mild-bg-gray-50` | `background-color: var(--mild-color-gray-50)` |
| `.mild-bg-gray-100` | `background-color: var(--mild-color-gray-100)` |
| `.mild-bg-gray-200` | `background-color: var(--mild-color-gray-200)` |
| `.mild-bg-gray-300` | `background-color: var(--mild-color-gray-300)` |
| `.mild-bg-gray-400` | `background-color: var(--mild-color-gray-400)` |
| `.mild-bg-gray-500` | `background-color: var(--mild-color-gray-500)` |
| `.mild-bg-gray-600` | `background-color: var(--mild-color-gray-600)` |
| `.mild-bg-gray-700` | `background-color: var(--mild-color-gray-700)` |
| `.mild-bg-gray-800` | `background-color: var(--mild-color-gray-800)` |
| `.mild-bg-gray-900` | `background-color: var(--mild-color-gray-900)` |
| `.mild-bg-gray-950` | `background-color: var(--mild-color-gray-950)` |
| `.mild-bg-red-50` | `background-color: var(--mild-color-red-50)` |
| `.mild-bg-red-100` | `background-color: var(--mild-color-red-100)` |
| `.mild-bg-red-200` | `background-color: var(--mild-color-red-200)` |
| `.mild-bg-red-300` | `background-color: var(--mild-color-red-300)` |
| `.mild-bg-red-400` | `background-color: var(--mild-color-red-400)` |
| `.mild-bg-red-500` | `background-color: var(--mild-color-red-500)` |
| `.mild-bg-red-600` | `background-color: var(--mild-color-red-600)` |
| `.mild-bg-red-700` | `background-color: var(--mild-color-red-700)` |
| `.mild-bg-red-800` | `background-color: var(--mild-color-red-800)` |
| `.mild-bg-red-900` | `background-color: var(--mild-color-red-900)` |
| `.mild-bg-red-950` | `background-color: var(--mild-color-red-950)` |
| `.mild-bg-green-50` | `background-color: var(--mild-color-green-50)` |
| `.mild-bg-green-100` | `background-color: var(--mild-color-green-100)` |
| `.mild-bg-green-200` | `background-color: var(--mild-color-green-200)` |
| `.mild-bg-green-300` | `background-color: var(--mild-color-green-300)` |
| `.mild-bg-green-400` | `background-color: var(--mild-color-green-400)` |
| `.mild-bg-green-500` | `background-color: var(--mild-color-green-500)` |
| `.mild-bg-green-600` | `background-color: var(--mild-color-green-600)` |
| `.mild-bg-green-700` | `background-color: var(--mild-color-green-700)` |
| `.mild-bg-green-800` | `background-color: var(--mild-color-green-800)` |
| `.mild-bg-green-900` | `background-color: var(--mild-color-green-900)` |
| `.mild-bg-green-950` | `background-color: var(--mild-color-green-950)` |
| `.mild-bg-yellow-50` | `background-color: var(--mild-color-yellow-50)` |
| `.mild-bg-yellow-100` | `background-color: var(--mild-color-yellow-100)` |
| `.mild-bg-yellow-200` | `background-color: var(--mild-color-yellow-200)` |
| `.mild-bg-yellow-300` | `background-color: var(--mild-color-yellow-300)` |
| `.mild-bg-yellow-400` | `background-color: var(--mild-color-yellow-400)` |
| `.mild-bg-yellow-500` | `background-color: var(--mild-color-yellow-500)` |
| `.mild-bg-yellow-600` | `background-color: var(--mild-color-yellow-600)` |
| `.mild-bg-yellow-700` | `background-color: var(--mild-color-yellow-700)` |
| `.mild-bg-yellow-800` | `background-color: var(--mild-color-yellow-800)` |
| `.mild-bg-yellow-900` | `background-color: var(--mild-color-yellow-900)` |
| `.mild-bg-yellow-950` | `background-color: var(--mild-color-yellow-950)` |
| `.mild-bg-primary-50` | `background-color: var(--mild-color-primary-50)` |
| `.mild-bg-primary-100` | `background-color: var(--mild-color-primary-100)` |
| `.mild-bg-primary-200` | `background-color: var(--mild-color-primary-200)` |
| `.mild-bg-primary-300` | `background-color: var(--mild-color-primary-300)` |
| `.mild-bg-primary-400` | `background-color: var(--mild-color-primary-400)` |
| `.mild-bg-primary-500` | `background-color: var(--mild-color-primary-500)` |
| `.mild-bg-primary-600` | `background-color: var(--mild-color-primary-600)` |
| `.mild-bg-primary-700` | `background-color: var(--mild-color-primary-700)` |
| `.mild-bg-primary-800` | `background-color: var(--mild-color-primary-800)` |
| `.mild-bg-primary-900` | `background-color: var(--mild-color-primary-900)` |
| `.mild-bg-primary-950` | `background-color: var(--mild-color-primary-950)` |
| `.mild-bg-secondary-50` | `background-color: var(--mild-color-secondary-50)` |
| `.mild-bg-secondary-100` | `background-color: var(--mild-color-secondary-100)` |
| `.mild-bg-secondary-200` | `background-color: var(--mild-color-secondary-200)` |
| `.mild-bg-secondary-300` | `background-color: var(--mild-color-secondary-300)` |
| `.mild-bg-secondary-400` | `background-color: var(--mild-color-secondary-400)` |
| `.mild-bg-secondary-500` | `background-color: var(--mild-color-secondary-500)` |
| `.mild-bg-secondary-600` | `background-color: var(--mild-color-secondary-600)` |
| `.mild-bg-secondary-700` | `background-color: var(--mild-color-secondary-700)` |
| `.mild-bg-secondary-800` | `background-color: var(--mild-color-secondary-800)` |
| `.mild-bg-secondary-900` | `background-color: var(--mild-color-secondary-900)` |
| `.mild-bg-secondary-950` | `background-color: var(--mild-color-secondary-950)` |
| `.mild-bg-success-50` | `background-color: var(--mild-color-success-50)` |
| `.mild-bg-success-100` | `background-color: var(--mild-color-success-100)` |
| `.mild-bg-success-200` | `background-color: var(--mild-color-success-200)` |
| `.mild-bg-success-300` | `background-color: var(--mild-color-success-300)` |
| `.mild-bg-success-400` | `background-color: var(--mild-color-success-400)` |
| `.mild-bg-success-500` | `background-color: var(--mild-color-success-500)` |
| `.mild-bg-success-600` | `background-color: var(--mild-color-success-600)` |
| `.mild-bg-success-700` | `background-color: var(--mild-color-success-700)` |
| `.mild-bg-success-800` | `background-color: var(--mild-color-success-800)` |
| `.mild-bg-success-900` | `background-color: var(--mild-color-success-900)` |
| `.mild-bg-success-950` | `background-color: var(--mild-color-success-950)` |
| `.mild-bg-warning-50` | `background-color: var(--mild-color-warning-50)` |
| `.mild-bg-warning-100` | `background-color: var(--mild-color-warning-100)` |
| `.mild-bg-warning-200` | `background-color: var(--mild-color-warning-200)` |
| `.mild-bg-warning-300` | `background-color: var(--mild-color-warning-300)` |
| `.mild-bg-warning-400` | `background-color: var(--mild-color-warning-400)` |
| `.mild-bg-warning-500` | `background-color: var(--mild-color-warning-500)` |
| `.mild-bg-warning-600` | `background-color: var(--mild-color-warning-600)` |
| `.mild-bg-warning-700` | `background-color: var(--mild-color-warning-700)` |
| `.mild-bg-warning-800` | `background-color: var(--mild-color-warning-800)` |
| `.mild-bg-warning-900` | `background-color: var(--mild-color-warning-900)` |
| `.mild-bg-warning-950` | `background-color: var(--mild-color-warning-950)` |
| `.mild-bg-danger-50` | `background-color: var(--mild-color-danger-50)` |
| `.mild-bg-danger-100` | `background-color: var(--mild-color-danger-100)` |
| `.mild-bg-danger-200` | `background-color: var(--mild-color-danger-200)` |
| `.mild-bg-danger-300` | `background-color: var(--mild-color-danger-300)` |
| `.mild-bg-danger-400` | `background-color: var(--mild-color-danger-400)` |
| `.mild-bg-danger-500` | `background-color: var(--mild-color-danger-500)` |
| `.mild-bg-danger-600` | `background-color: var(--mild-color-danger-600)` |
| `.mild-bg-danger-700` | `background-color: var(--mild-color-danger-700)` |
| `.mild-bg-danger-800` | `background-color: var(--mild-color-danger-800)` |
| `.mild-bg-danger-900` | `background-color: var(--mild-color-danger-900)` |
| `.mild-bg-danger-950` | `background-color: var(--mild-color-danger-950)` |
| `.mild-bg-error-50` | `background-color: var(--mild-color-error-50)` |
| `.mild-bg-error-100` | `background-color: var(--mild-color-error-100)` |
| `.mild-bg-error-200` | `background-color: var(--mild-color-error-200)` |
| `.mild-bg-error-300` | `background-color: var(--mild-color-error-300)` |
| `.mild-bg-error-400` | `background-color: var(--mild-color-error-400)` |
| `.mild-bg-error-500` | `background-color: var(--mild-color-error-500)` |
| `.mild-bg-error-600` | `background-color: var(--mild-color-error-600)` |
| `.mild-bg-error-700` | `background-color: var(--mild-color-error-700)` |
| `.mild-bg-error-800` | `background-color: var(--mild-color-error-800)` |
| `.mild-bg-error-900` | `background-color: var(--mild-color-error-900)` |
| `.mild-bg-error-950` | `background-color: var(--mild-color-error-950)` |
| `.mild-border-blue-50` | `border-color: var(--mild-color-blue-50)` |
| `.mild-border-blue-100` | `border-color: var(--mild-color-blue-100)` |
| `.mild-border-blue-200` | `border-color: var(--mild-color-blue-200)` |
| `.mild-border-blue-300` | `border-color: var(--mild-color-blue-300)` |
| `.mild-border-blue-400` | `border-color: var(--mild-color-blue-400)` |
| `.mild-border-blue-500` | `border-color: var(--mild-color-blue-500)` |
| `.mild-border-blue-600` | `border-color: var(--mild-color-blue-600)` |
| `.mild-border-blue-700` | `border-color: var(--mild-color-blue-700)` |
| `.mild-border-blue-800` | `border-color: var(--mild-color-blue-800)` |
| `.mild-border-blue-900` | `border-color: var(--mild-color-blue-900)` |
| `.mild-border-blue-950` | `border-color: var(--mild-color-blue-950)` |
| `.mild-border-gray-50` | `border-color: var(--mild-color-gray-50)` |
| `.mild-border-gray-100` | `border-color: var(--mild-color-gray-100)` |
| `.mild-border-gray-200` | `border-color: var(--mild-color-gray-200)` |
| `.mild-border-gray-300` | `border-color: var(--mild-color-gray-300)` |
| `.mild-border-gray-400` | `border-color: var(--mild-color-gray-400)` |
| `.mild-border-gray-500` | `border-color: var(--mild-color-gray-500)` |
| `.mild-border-gray-600` | `border-color: var(--mild-color-gray-600)` |
| `.mild-border-gray-700` | `border-color: var(--mild-color-gray-700)` |
| `.mild-border-gray-800` | `border-color: var(--mild-color-gray-800)` |
| `.mild-border-gray-900` | `border-color: var(--mild-color-gray-900)` |
| `.mild-border-gray-950` | `border-color: var(--mild-color-gray-950)` |
| `.mild-border-red-50` | `border-color: var(--mild-color-red-50)` |
| `.mild-border-red-100` | `border-color: var(--mild-color-red-100)` |
| `.mild-border-red-200` | `border-color: var(--mild-color-red-200)` |
| `.mild-border-red-300` | `border-color: var(--mild-color-red-300)` |
| `.mild-border-red-400` | `border-color: var(--mild-color-red-400)` |
| `.mild-border-red-500` | `border-color: var(--mild-color-red-500)` |
| `.mild-border-red-600` | `border-color: var(--mild-color-red-600)` |
| `.mild-border-red-700` | `border-color: var(--mild-color-red-700)` |
| `.mild-border-red-800` | `border-color: var(--mild-color-red-800)` |
| `.mild-border-red-900` | `border-color: var(--mild-color-red-900)` |
| `.mild-border-red-950` | `border-color: var(--mild-color-red-950)` |
| `.mild-border-green-50` | `border-color: var(--mild-color-green-50)` |
| `.mild-border-green-100` | `border-color: var(--mild-color-green-100)` |
| `.mild-border-green-200` | `border-color: var(--mild-color-green-200)` |
| `.mild-border-green-300` | `border-color: var(--mild-color-green-300)` |
| `.mild-border-green-400` | `border-color: var(--mild-color-green-400)` |
| `.mild-border-green-500` | `border-color: var(--mild-color-green-500)` |
| `.mild-border-green-600` | `border-color: var(--mild-color-green-600)` |
| `.mild-border-green-700` | `border-color: var(--mild-color-green-700)` |
| `.mild-border-green-800` | `border-color: var(--mild-color-green-800)` |
| `.mild-border-green-900` | `border-color: var(--mild-color-green-900)` |
| `.mild-border-green-950` | `border-color: var(--mild-color-green-950)` |
| `.mild-border-yellow-50` | `border-color: var(--mild-color-yellow-50)` |
| `.mild-border-yellow-100` | `border-color: var(--mild-color-yellow-100)` |
| `.mild-border-yellow-200` | `border-color: var(--mild-color-yellow-200)` |
| `.mild-border-yellow-300` | `border-color: var(--mild-color-yellow-300)` |
| `.mild-border-yellow-400` | `border-color: var(--mild-color-yellow-400)` |
| `.mild-border-yellow-500` | `border-color: var(--mild-color-yellow-500)` |
| `.mild-border-yellow-600` | `border-color: var(--mild-color-yellow-600)` |
| `.mild-border-yellow-700` | `border-color: var(--mild-color-yellow-700)` |
| `.mild-border-yellow-800` | `border-color: var(--mild-color-yellow-800)` |
| `.mild-border-yellow-900` | `border-color: var(--mild-color-yellow-900)` |
| `.mild-border-yellow-950` | `border-color: var(--mild-color-yellow-950)` |
| `.mild-border-primary-50` | `border-color: var(--mild-color-primary-50)` |
| `.mild-border-primary-100` | `border-color: var(--mild-color-primary-100)` |
| `.mild-border-primary-200` | `border-color: var(--mild-color-primary-200)` |
| `.mild-border-primary-300` | `border-color: var(--mild-color-primary-300)` |
| `.mild-border-primary-400` | `border-color: var(--mild-color-primary-400)` |
| `.mild-border-primary-500` | `border-color: var(--mild-color-primary-500)` |
| `.mild-border-primary-600` | `border-color: var(--mild-color-primary-600)` |
| `.mild-border-primary-700` | `border-color: var(--mild-color-primary-700)` |
| `.mild-border-primary-800` | `border-color: var(--mild-color-primary-800)` |
| `.mild-border-primary-900` | `border-color: var(--mild-color-primary-900)` |
| `.mild-border-primary-950` | `border-color: var(--mild-color-primary-950)` |
| `.mild-border-secondary-50` | `border-color: var(--mild-color-secondary-50)` |
| `.mild-border-secondary-100` | `border-color: var(--mild-color-secondary-100)` |
| `.mild-border-secondary-200` | `border-color: var(--mild-color-secondary-200)` |
| `.mild-border-secondary-300` | `border-color: var(--mild-color-secondary-300)` |
| `.mild-border-secondary-400` | `border-color: var(--mild-color-secondary-400)` |
| `.mild-border-secondary-500` | `border-color: var(--mild-color-secondary-500)` |
| `.mild-border-secondary-600` | `border-color: var(--mild-color-secondary-600)` |
| `.mild-border-secondary-700` | `border-color: var(--mild-color-secondary-700)` |
| `.mild-border-secondary-800` | `border-color: var(--mild-color-secondary-800)` |
| `.mild-border-secondary-900` | `border-color: var(--mild-color-secondary-900)` |
| `.mild-border-secondary-950` | `border-color: var(--mild-color-secondary-950)` |
| `.mild-border-success-50` | `border-color: var(--mild-color-success-50)` |
| `.mild-border-success-100` | `border-color: var(--mild-color-success-100)` |
| `.mild-border-success-200` | `border-color: var(--mild-color-success-200)` |
| `.mild-border-success-300` | `border-color: var(--mild-color-success-300)` |
| `.mild-border-success-400` | `border-color: var(--mild-color-success-400)` |
| `.mild-border-success-500` | `border-color: var(--mild-color-success-500)` |
| `.mild-border-success-600` | `border-color: var(--mild-color-success-600)` |
| `.mild-border-success-700` | `border-color: var(--mild-color-success-700)` |
| `.mild-border-success-800` | `border-color: var(--mild-color-success-800)` |
| `.mild-border-success-900` | `border-color: var(--mild-color-success-900)` |
| `.mild-border-success-950` | `border-color: var(--mild-color-success-950)` |
| `.mild-border-warning-50` | `border-color: var(--mild-color-warning-50)` |
| `.mild-border-warning-100` | `border-color: var(--mild-color-warning-100)` |
| `.mild-border-warning-200` | `border-color: var(--mild-color-warning-200)` |
| `.mild-border-warning-300` | `border-color: var(--mild-color-warning-300)` |
| `.mild-border-warning-400` | `border-color: var(--mild-color-warning-400)` |
| `.mild-border-warning-500` | `border-color: var(--mild-color-warning-500)` |
| `.mild-border-warning-600` | `border-color: var(--mild-color-warning-600)` |
| `.mild-border-warning-700` | `border-color: var(--mild-color-warning-700)` |
| `.mild-border-warning-800` | `border-color: var(--mild-color-warning-800)` |
| `.mild-border-warning-900` | `border-color: var(--mild-color-warning-900)` |
| `.mild-border-warning-950` | `border-color: var(--mild-color-warning-950)` |
| `.mild-border-danger-50` | `border-color: var(--mild-color-danger-50)` |
| `.mild-border-danger-100` | `border-color: var(--mild-color-danger-100)` |
| `.mild-border-danger-200` | `border-color: var(--mild-color-danger-200)` |
| `.mild-border-danger-300` | `border-color: var(--mild-color-danger-300)` |
| `.mild-border-danger-400` | `border-color: var(--mild-color-danger-400)` |
| `.mild-border-danger-500` | `border-color: var(--mild-color-danger-500)` |
| `.mild-border-danger-600` | `border-color: var(--mild-color-danger-600)` |
| `.mild-border-danger-700` | `border-color: var(--mild-color-danger-700)` |
| `.mild-border-danger-800` | `border-color: var(--mild-color-danger-800)` |
| `.mild-border-danger-900` | `border-color: var(--mild-color-danger-900)` |
| `.mild-border-danger-950` | `border-color: var(--mild-color-danger-950)` |
| `.mild-border-error-50` | `border-color: var(--mild-color-error-50)` |
| `.mild-border-error-100` | `border-color: var(--mild-color-error-100)` |
| `.mild-border-error-200` | `border-color: var(--mild-color-error-200)` |
| `.mild-border-error-300` | `border-color: var(--mild-color-error-300)` |
| `.mild-border-error-400` | `border-color: var(--mild-color-error-400)` |
| `.mild-border-error-500` | `border-color: var(--mild-color-error-500)` |
| `.mild-border-error-600` | `border-color: var(--mild-color-error-600)` |
| `.mild-border-error-700` | `border-color: var(--mild-color-error-700)` |
| `.mild-border-error-800` | `border-color: var(--mild-color-error-800)` |
| `.mild-border-error-900` | `border-color: var(--mild-color-error-900)` |
| `.mild-border-error-950` | `border-color: var(--mild-color-error-950)` |
| `.mild-bg-background` | `background-color: var(--mild-background)` |
| `.mild-bg-muted` | `background-color: var(--mild-muted)` |
| `.mild-border-default` | `border-color: var(--mild-border)` |
| `.mild-border-x-0` | `border-left-width: 0px; border-right-width: 0px` |
| `.mild-border-x-2` | `border-left-width: 2px; border-right-width: 2px` |
| `.mild-border-x-4` | `border-left-width: 4px; border-right-width: 4px` |
| `.mild-border-x-8` | `border-left-width: 8px; border-right-width: 8px` |
| `.mild-border-y-0` | `border-top-width: 0px; border-bottom-width: 0px` |
| `.mild-border-y-2` | `border-top-width: 2px; border-bottom-width: 2px` |
| `.mild-border-y-4` | `border-top-width: 4px; border-bottom-width: 4px` |
| `.mild-border-y-8` | `border-top-width: 8px; border-bottom-width: 8px` |
| `.mild-border-t-0` | `border-top-width: 0px` |
| `.mild-border-t-2` | `border-top-width: 2px` |
| `.mild-border-t-4` | `border-top-width: 4px` |
| `.mild-border-t-8` | `border-top-width: 8px` |
| `.mild-border-r-0` | `border-right-width: 0px` |
| `.mild-border-r-2` | `border-right-width: 2px` |
| `.mild-border-r-4` | `border-right-width: 4px` |
| `.mild-border-r-8` | `border-right-width: 8px` |
| `.mild-border-b-0` | `border-bottom-width: 0px` |
| `.mild-border-b-2` | `border-bottom-width: 2px` |
| `.mild-border-b-4` | `border-bottom-width: 4px` |
| `.mild-border-b-8` | `border-bottom-width: 8px` |
| `.mild-border-l-0` | `border-left-width: 0px` |
| `.mild-border-l-2` | `border-left-width: 2px` |
| `.mild-border-l-4` | `border-left-width: 4px` |
| `.mild-border-l-8` | `border-left-width: 8px` |
| `.mild-border-solid` | `border-style: solid` |
| `.mild-border-dashed` | `border-style: dashed` |
| `.mild-border-dotted` | `border-style: dotted` |
| `.mild-border-double` | `border-style: double` |
| `.mild-border-none` | `border-style: none` |

## Borders & Radius

Border and border radius utilities

| Class | CSS Properties |
|-------|----------------|
| `.mild-border--0` | `border-width: 0px` |
| `.mild-border--2` | `border-width: 2px` |
| `.mild-border--4` | `border-width: 4px` |
| `.mild-border--8` | `border-width: 8px` |
| `.mild-radius-none` | `border-radius: 0px` |
| `.mild-radius-sm` | `border-radius: 0.125rem` |
| `.mild-radius-base` | `border-radius: 0.25rem` |
| `.mild-radius-md` | `border-radius: 0.375rem` |
| `.mild-radius-lg` | `border-radius: 0.5rem` |
| `.mild-radius-xl` | `border-radius: 0.75rem` |
| `.mild-radius-2xl` | `border-radius: 1rem` |
| `.mild-radius-3xl` | `border-radius: 1.5rem` |
| `.mild-radius-full` | `border-radius: 9999px` |

## Effects

Shadow, opacity, and visual effect utilities

| Class | CSS Properties |
|-------|----------------|
| `.mild-opacity-0` | `opacity: 0` |
| `.mild-opacity-25` | `opacity: 0.25` |
| `.mild-opacity-50` | `opacity: 0.5` |
| `.mild-opacity-75` | `opacity: 0.75` |
| `.mild-opacity-100` | `opacity: 1` |
| `.mild-shadow-none` | `box-shadow: none` |
| `.mild-shadow-sm` | `box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)` |
| `.mild-shadow` | `box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)` |
| `.mild-shadow-md` | `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)` |
| `.mild-shadow-lg` | `box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)` |
| `.mild-shadow-xl` | `box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)` |
| `.mild-shadow-2xl` | `box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25)` |
| `.mild-shadow-inner` | `box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)` |
| `.mild-ring-0` | `--mild-ring-offset-shadow: var(--mild-ring-inset) 0 0 0 var(--mild-ring-offset-width) var(--mild-ring-offset-color); --mild-ring-shadow: var(--mild-ring-inset) 0 0 0 calc(0px + var(--mild-ring-offset-width)) var(--mild-ring-color); box-shadow: var(--mild-ring-offset-shadow), var(--mild-ring-shadow), var(--mild-shadow, 0 0 rgba(0, 0, 0, 0))` |
| `.mild-ring-1` | `--mild-ring-offset-shadow: var(--mild-ring-inset) 0 0 0 var(--mild-ring-offset-width) var(--mild-ring-offset-color); --mild-ring-shadow: var(--mild-ring-inset) 0 0 0 calc(1px + var(--mild-ring-offset-width)) var(--mild-ring-color); box-shadow: var(--mild-ring-offset-shadow), var(--mild-ring-shadow), var(--mild-shadow, 0 0 rgba(0, 0, 0, 0))` |
| `.mild-ring-2` | `--mild-ring-offset-shadow: var(--mild-ring-inset) 0 0 0 var(--mild-ring-offset-width) var(--mild-ring-offset-color); --mild-ring-shadow: var(--mild-ring-inset) 0 0 0 calc(2px + var(--mild-ring-offset-width)) var(--mild-ring-color); box-shadow: var(--mild-ring-offset-shadow), var(--mild-ring-shadow), var(--mild-shadow, 0 0 rgba(0, 0, 0, 0))` |
| `.mild-ring-4` | `--mild-ring-offset-shadow: var(--mild-ring-inset) 0 0 0 var(--mild-ring-offset-width) var(--mild-ring-offset-color); --mild-ring-shadow: var(--mild-ring-inset) 0 0 0 calc(4px + var(--mild-ring-offset-width)) var(--mild-ring-color); box-shadow: var(--mild-ring-offset-shadow), var(--mild-ring-shadow), var(--mild-shadow, 0 0 rgba(0, 0, 0, 0))` |
| `.mild-ring-8` | `--mild-ring-offset-shadow: var(--mild-ring-inset) 0 0 0 var(--mild-ring-offset-width) var(--mild-ring-offset-color); --mild-ring-shadow: var(--mild-ring-inset) 0 0 0 calc(8px + var(--mild-ring-offset-width)) var(--mild-ring-color); box-shadow: var(--mild-ring-offset-shadow), var(--mild-ring-shadow), var(--mild-shadow, 0 0 rgba(0, 0, 0, 0))` |

## Interactivity

Cursor, pointer events, and interaction utilities

| Class | CSS Properties |
|-------|----------------|
| `.mild-cursor-auto` | `cursor: auto` |
| `.mild-cursor-default` | `cursor: default` |
| `.mild-cursor-pointer` | `cursor: pointer` |
| `.mild-cursor-wait` | `cursor: wait` |
| `.mild-cursor-text` | `cursor: text` |
| `.mild-cursor-move` | `cursor: move` |
| `.mild-cursor-help` | `cursor: help` |
| `.mild-cursor-not-allowed` | `cursor: not-allowed` |
| `.mild-pointer-events-none` | `pointer-events: none` |
| `.mild-pointer-events-auto` | `pointer-events: auto` |
| `.mild-select-none` | `user-select: none` |
| `.mild-select-text` | `user-select: text` |
| `.mild-select-all` | `user-select: all` |
| `.mild-select-auto` | `user-select: auto` |

## Transforms & Transitions

Transform, scale, rotate, and transition utilities

| Class | CSS Properties |
|-------|----------------|
| `.mild-transition-none` | `transition: none` |
| `.mild-transition-all` | `transition: all 150ms ease-in-out` |
| `.mild-transition-colors` | `transition: background-color, border-color, color, fill, stroke 150ms ease-in-out` |
| `.mild-transition-opacity` | `transition: opacity 150ms ease-in-out` |
| `.mild-transition-shadow` | `transition: box-shadow 150ms ease-in-out` |
| `.mild-transition-transform` | `transition: transform 150ms ease-in-out` |
| `.mild-transform` | `transform: translateX(var(--mild-translate-x, 0)) translateY(var(--mild-translate-y, 0)) rotate(var(--mild-rotate, 0)) skewX(var(--mild-skew-x, 0)) skewY(var(--mild-skew-y, 0)) scaleX(var(--mild-scale-x, 1)) scaleY(var(--mild-scale-y, 1))` |
| `.mild-transform-none` | `transform: none` |
| `.mild-scale-0` | `--mild-scale-x: 0; --mild-scale-y: 0` |
| `.mild-scale-50` | `--mild-scale-x: 0.5; --mild-scale-y: 0.5` |
| `.mild-scale-75` | `--mild-scale-x: 0.75; --mild-scale-y: 0.75` |
| `.mild-scale-90` | `--mild-scale-x: 0.9; --mild-scale-y: 0.9` |
| `.mild-scale-95` | `--mild-scale-x: 0.95; --mild-scale-y: 0.95` |
| `.mild-scale-100` | `--mild-scale-x: 1; --mild-scale-y: 1` |
| `.mild-scale-105` | `--mild-scale-x: 1.05; --mild-scale-y: 1.05` |
| `.mild-scale-110` | `--mild-scale-x: 1.1; --mild-scale-y: 1.1` |
| `.mild-scale-125` | `--mild-scale-x: 1.25; --mild-scale-y: 1.25` |
| `.mild-scale-150` | `--mild-scale-x: 1.5; --mild-scale-y: 1.5` |
| `.mild-rotate-0` | `--mild-rotate: 0deg` |
| `.mild-rotate-1` | `--mild-rotate: 1deg` |
| `.mild-rotate-2` | `--mild-rotate: 2deg` |
| `.mild-rotate-3` | `--mild-rotate: 3deg` |
| `.mild-rotate-6` | `--mild-rotate: 6deg` |
| `.mild-rotate-12` | `--mild-rotate: 12deg` |
| `.mild-rotate-45` | `--mild-rotate: 45deg` |
| `.mild-rotate-90` | `--mild-rotate: 90deg` |
| `.mild-rotate-180` | `--mild-rotate: 180deg` |

## Design Tokens

### Color Palettes
- **primary**: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
- **gray**: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900

### Spacing Scale
- **0**: 0px
- **1**: 0.25rem
- **2**: 0.5rem
- **3**: 0.75rem
- **4**: 1rem
- **5**: 1.25rem
- **6**: 1.5rem
- **8**: 2rem
- **10**: 2.5rem
- **12**: 3rem
- **16**: 4rem
- **20**: 5rem
- **24**: 6rem

### Typography Scale  
- **xs**: 0.75rem
- **sm**: 0.875rem
- **base**: 1rem
- **lg**: 1.125rem
- **xl**: 1.25rem
- **2xl**: 1.5rem
- **3xl**: 1.875rem
- **4xl**: 2.25rem

---

*Generated automatically from source code • 6/17/2025*
