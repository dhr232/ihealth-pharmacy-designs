---
version: alpha
name: iHealth Pharmacy
description: Clinical warmth for a neighbourhood pharmacy — brand red as the single interaction driver, Inter for clarity, soft neutral surfaces.
colors:
  primary: "#1F2328"
  secondary: "#5A6270"
  tertiary: "#C01D16"
  neutral: "#F6F7F9"
  surface: "#FFFFFF"
  border: "#D8DCE2"
  accent-soft: "#FDF2F2"
  success: "#15803D"
typography:
  menu-item:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.4
  menu-item-title:
    fontFamily: Inter
    fontSize: 0.9375rem
    fontWeight: 600
    lineHeight: 1.3
  menu-item-desc:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.4
  menu-heading:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  sm: 8px
  md: 12px
  lg: 16px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
components:
  menu-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: 16px
  menu-panel-border:
    backgroundColor: "{colors.border}"
    textColor: "{colors.primary}"
    size: 1px
  menu-status-success:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.success}"
    typography: "{typography.menu-item-desc}"
    padding: 0px
  menu-heading:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    typography: "{typography.menu-heading}"
    padding: 8px
  menu-item:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: 12px
  menu-item-desc:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    typography: "{typography.menu-item-desc}"
    padding: 0px
  menu-item-hover:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.tertiary}"
    rounded: "{rounded.sm}"
    padding: 12px
  menu-item-icon:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.tertiary}"
    rounded: "{rounded.sm}"
    size: 36px
  menu-cta:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.tertiary}"
    rounded: "{rounded.md}"
    padding: 12px
---

## Overview

iHealth Pharmacy's interface pairs a confident clinical red with soft neutral
surfaces. Menus are content-first: every item leads with a clear title, supported
by a one-line description and a small icon in a soft red tile. The brand red is
reserved for interaction — hover states, icons, and CTAs — never for large fills.

## Colors

- **Primary (#1F2328):** Ink for menu titles and body text.
- **Secondary (#5A6270):** Descriptions, headings labels, muted metadata.
- **Tertiary (#C01D16):** Brand red — icons, hover text, CTA accents. The only
  interactive color.
- **Neutral (#F6F7F9):** Hover surface for menu items; page section background.
- **Accent Soft (#FDF2F2):** Icon tiles and CTA background — a 8% tint of brand red.
- **Border (#D8DCE2):** Hairline panel borders and dividers.

## Typography

Inter throughout. Menu items use 15px/600 titles with 12px/400 descriptions.
Section headings are 11px all-caps with +8% letter spacing — quiet labels,
never shouty.

## Layout

Menus are grid-based: two columns for service lists, single column for action
lists. Panel padding 16px, item padding 12px, 4px gaps inside items. Panels
drop 8px from the trigger with a 200ms ease.

## Elevation & Depth

One shadow level for menus: a soft, wide drop shadow (`0 12px 32px rgba(31,35,40,0.12)`)
plus a 1px border. No nested elevation inside the panel.

## Shapes

8px radius on items, 16px on panels, 12px on CTA footers. Icon tiles are 36px
squares with 8px radius.

## Components

`menu-panel` is the dropdown container. Items are full-width rows: icon tile,
title + description stack, optional trailing arrow on hover. `menu-item-hover`
swaps the surface to neutral and tints the title brand red. `menu-cta` is an
optional footer strip for one highlighted action.

## Do's and Don'ts

- Do keep one red accent per item (icon tile or hover text — hover wins).
- Don't use more than two columns in a dropdown panel.
- Don't mix anchors and page links in the same group — separate by a heading.
- Don't add dividers between items; whitespace and hover surface are enough.
